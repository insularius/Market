import React, { useState } from "react";
import axios from "axios";

interface SignUpResponse {
  sid: string;
  add_info: {
    cool_down: string;
    cool_down_ending_date_time: string;
  };
}

export interface SendOtpResponse {
  redirect_uri: string;
  sid: string;
  add_info: { cool_down_ending_date_time: string };
}
export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
  sid: string;
  add_info: {
    cool_down: string;
    cool_down_ending_date_time: string;
  };
}

const code = "000000";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sid, setSid] = useState<String>("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Здесь можно добавить логику для отправки данных на сервер или выполнения других действий при регистрации пользователя
    // Сбросить значения полей после отправки данных
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const grifonURL = "https://griffon.dar-qa.zone/api/v1";
  const siteClientID = "griffon";
  const siteClientSecret =
    "$2a$10$qC9dtMHqvgbA/Rn10UV49OY4Lp6yETBsNKPTAdp4mnQcVL/.bDbQS";

  async function signup(username: string) {
    let url = grifonURL + "/oauth/signup";
    const params = new URLSearchParams();
    params.append("client_id", siteClientID);
    params.append("client_secret", siteClientSecret);
    params.append("username", username);
    const res = await axios
      .post<SignUpResponse>(url, params)
      .then((res) => res.data);

    setSid(res.sid);
    const otpResponse = await sendOtp(code, res.sid);
  }

  async function sendOtp(code: string, sid?: string) {
    let url = grifonURL + "/oauth/signup/verify";
    return axios
      .post<SendOtpResponse>(
        url,
        {
          code,
        },
        {
          params: {
            sid,
          },
        }
      )
      .then((res) => res.data);
  }

  async function register(sid: string, password: string) {
    let url = grifonURL + "/oauth/register";
    return axios
      .post<RegisterResponse>(
        url,
        {
          password,
        },
        {
          params: {
            sid,
          },
        }
      )
      .then((res) => res.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <button type="submit" onClick={() => signup(email)}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegistrationForm;
