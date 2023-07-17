import React, { useEffect, useState } from "react";
import axios from "axios";

// const clientId =
//   "1005989398408-m1nq4urrg3iv5dnjluuu1e3nbklk3s6d.apps.googleusercontent.com";
// const clientSecret = "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";
// const redirectUri = "http://localhost:3000/";

//client_id: griffon
const siteClientID = "griffon";
const siteClientSecret =
  "$2a$10$qC9dtMHqvgbA/Rn10UV49OY4Lp6yETBsNKPTAdp4mnQcVL/.bDbQS";

//client_id: 52394688-6caa-4c77-9949-d3ecb0b63413
// bucket_id: 34d7d39d-7956-4c0a-86e2-5a97ad749b98
// client_secret: uQbR7YEtR9cm5byYlfp02JBpL0J1xrJ7I1EwIeoqpL25HG2hRGnfYNRrRdLLqpKD
// griffonApiRoot: https://griffon.dar-qa.zone/api/v1
//Регистрация:
// - signup
// - verifyOtp
// - register
// - createProfile
//griffon.dar-qa.zone/api/v1/signup
// https: //griffon.dar-qa.zone/api/v1/verifyOtp
// https: //griffon.dar-qa.zone/api/v1/register
// https: //griffon.dar-qa.zone/api/v1/createProfile

https: type Tokens = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  id_token?: string;
};

const grifonURL = "https://griffon.dar-qa.zone/api/v1";

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

function AuthComponent() {
  const [tokens, setTokens] = useState<Tokens>({});

  //registration
  async function signup(username: string) {
    let url = grifonURL + "/oauth/signup";
    const params = new URLSearchParams();
    params.append("client_id", siteClientID);
    params.append("client_secret", siteClientSecret);
    params.append("username", username);
    return axios.post<SignUpResponse>(url, params).then((res) => res.data);
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

  // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20openid%20profile`;

  // async function exchangeCodeForTokens(code: string) {
  //   const response = await axios.post(
  //     "https://oauth2.googleapis.com/token",
  //     `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
  //     { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  //   );

  //   setTokens(response.data);
  //   console.log(response.data);
  // }

  // async function refreshTokens() {
  //   const response = await axios.post(
  //     "https://oauth2.googleapis.com/token",
  //     `refresh_token=${tokens.refresh_token}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`,
  //     { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  //   );

  //   setTokens((prevTokens) => ({ ...prevTokens, ...response.data }));
  // }

  // useEffect(() => {
  //   console.log("Tokens:", tokens);
  // }, [tokens]);

  // useEffect(() => {
  //   const url = window.location.href;
  //   const hasCode = url.includes("?code=");

  //   if (hasCode) {
  //     const newUrl = new URL(url);
  //     const code = newUrl.searchParams.get("code");

  //     if (code) {
  //       exchangeCodeForTokens(code);
  //     }
  //   }

  //   function base64UrlDecode(base64Url: string) {
  //     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //     const decodedBytes = Buffer.from(base64, "base64");
  //     return decodedBytes.toString("utf-8");
  //   }

  //   if (tokens.expires_in) {
  //     const timeoutId = setTimeout(
  //       refreshTokens,
  //       (tokens.expires_in - 60) * 1000
  //     );

  //     return () => clearTimeout(timeoutId);
  //   }

  //   if (tokens.id_token) {
  //     const payload = base64UrlDecode(tokens.id_token);
  //     console.log("Decoded Payload:", payload);
  //   }
  // }, [tokens]);

  // return (
  //   <button onClick={() => (window.location.href = authUrl)}>
  //     Войти через Google
  //   </button>
  // );
}

export default AuthComponent;
