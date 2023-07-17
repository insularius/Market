import React, { useState } from "react";
import { useAuth } from "../../context/Auth";
import "react-toastify/dist/ReactToastify.css";
import styles from "../emailPage/EmailPage.module.scss";
import { useNavigate } from "react-router-dom";
import MyInput from "../../components/ui/input/MyInput";
import { toast } from "react-toastify";
import {
  BASE_GRIFFON_URL,
  CODE,
  DASHBOARD_PAGE,
  GRIFFON_MY_CLIENT,
  GRIFFON_MY_SECRET,
  TOKEN_STORAGE_KEY,
} from "../../constants/Constants";
import axios from "axios";
import { RegisterResponse, SignUpResponse } from "../../types/griffon";
import { checkIfUserExists } from "../../types/authProvide";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserExists, setIsUserExist] = useState<boolean>(false);
  const [isUserNotFound, setIsUserNotFound] = useState<boolean>(false);
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);
  // const [isRedirectAllowed, setIsRedirectAllowed] = useState<boolean>(false);
  // const { sid, setSid } = useAuth();
  const navigate = useNavigate();
  const {
    setSid,
    sid,
    // sendOtp,
    setIsAuthorized,
    persistProfile,
    getProfile,
    // checkIfUserExists,
  } = useAuth();
  //   const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsUserNotFound(false);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsWrongPassword(false);
  };

  //   async function signin(username: string) {
  //     let url = BASE_GRIFFON_URL + `/oauth/helpers/signin_type?sid=`;
  //     const params = new URLSearchParams();
  //     params.append("client_id", GRIFFON_MY_CLIENT);
  //     params.append("username", username);
  //     try {
  //       const res = await axios.post<SignUpResponse>(url, params);
  //       setSid(res.data.sid);
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error(`Unexpected response status: ${res.status}`);
  //       } else {
  //         console.log("user");
  //       }
  //       const userExist = await checkIfUserExists(email);
  //       setIsUserExist(userExist);
  //       //   await sendOtp(CODE, res.data.sid);
  //     } catch (e) {
  //       if (axios.isAxiosError(e) && e.response?.status === 404) {
  //         setIsUserExist(false);
  //         toast.error("User not found");
  //         return;
  //       } else {
  //         console.error(e);
  //       }
  //     }
  //   }
  async function signin(username: string) {
    let url = BASE_GRIFFON_URL + `/oauth/helpers/signin_type?sid=`;
    const params = new URLSearchParams();
    params.append("client_id", GRIFFON_MY_CLIENT);
    params.append("username", username);
    try {
      const res = await axios.post<SignUpResponse>(url, params);
      setSid(res.data.sid);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
      const userExist = await checkIfUserExists(email);
      setIsUserExist(userExist);
      console.log(userExist);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        setIsUserNotFound(true);
        setIsUserExist(false);
        toast.error("User not found");
        return;
      } else {
        console.error(e);
      }
    }
  }

  // const signinPass = async (
  //   username: string,
  //   password: string
  // ): Promise<RegisterResponse> => {
  //   let url = BASE_GRIFFON_URL + "/oauth/token?saml=false";
  //   const params = new URLSearchParams();
  //   params.append("client_id", GRIFFON_MY_CLIENT);
  //   params.append("client_secret", GRIFFON_MY_SECRET);
  //   params.append("grant_type", "password");
  //   params.append("username", username);
  //   params.append("password", password);
  //   params.append("scope", "web app");
  //   try {
  //     const res = await axios.post<RegisterResponse>(url, params);
  //     if (res.status !== 200 && res.status !== 201) {
  //       throw new Error(`Unexpected response status: ${res.status}`);
  //     }
  //     setSid(res.data.sid);
  //     navigate(DASHBOARD_PAGE);
  //     return res.data;
  //   } catch (e) {
  //     if (axios.isAxiosError(e) && e.response?.status === 400) {
  //       setIsWrongPassword(true);
  //       toast.error("Wrong password");
  //     }
  //     throw e;
  //   }
  // };
  const signinPass = async (
    username: string,
    password: string
  ): Promise<RegisterResponse> => {
    let url = BASE_GRIFFON_URL + "/oauth/token";
    const params = new URLSearchParams();
    params.append("client_id", GRIFFON_MY_CLIENT);
    params.append("client_secret", GRIFFON_MY_SECRET);
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);
    try {
      const res = await axios.post<RegisterResponse>(url, params);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
      setSid(res.data.sid);
      navigate(DASHBOARD_PAGE);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        setIsWrongPassword(true);
        toast.error("Wrong password");
      }
      throw e;
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      //   await signup(email);
      await signin(email);
      //   setIsUserExist(true);
    } catch (error) {
      console.error(error);
    }
  };
  //   const handleSubmit = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     try {
  //       const isSignInSuccessful = await signin(email);

  //       // Только изменяем состояние, если авторизация прошла успешно
  //       if (isSignInSuccessful) {
  //         setIsUserExist(true);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //    const uploadProductImage = async (image: File) => {
  //     const formData = new FormData();
  //     formData.append("files", image);
  //     const imageResponse = await axios.post(`${API_ROOT}/upload`, formData);
  //     return imageResponse.data[0].id;
  //   };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await signinPass(email, password);
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(res));
      setIsAuthorized(true);
      const profileData = await getProfile();
      persistProfile(profileData);
      toast.success("U're logged in, have fun!");
      navigate(DASHBOARD_PAGE);
    } catch (error) {
      //   toast.error("Wrong password!");
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.registerForm} style={{ marginBottom: "0px" }}>
        <div className={styles.info}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="/images/TLOU.png" alt="" />
          </div>
          <h2 style={{ marginTop: "0px" }}>Log in</h2>
          <p>Use your Email or Phone to get access your cabinet</p>
        </div>
        <form className={styles.form}>
          <MyInput
            className={`${styles.input} ${isUserNotFound ? styles.error : ""}`}
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={"Enter email or phone"}
          />
          {isUserExists && (
            <MyInput
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              className={`${styles.input} ${
                isWrongPassword ? styles.error : ""
              }`}
            />
          )}
          {isUserExists ? (
            <button
              className={styles.button}
              type="submit"
              onClick={handlePasswordSubmit}
            >
              Continue
            </button>
          ) : (
            <button
              className={styles.button}
              type="submit"
              onClick={handleSubmit}
            >
              Continue
            </button>
          )}
        </form>

        <div className={styles.signup}>
          <p>Don't have an account?</p>
          <p>asassaAs_1</p>
          <a href="/signup">Sign up now!</a>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
//asassaAs_1
// addds@gmail.com
