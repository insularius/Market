import React, { useState } from "react";

import { useAuth } from "../../context/Auth";

import "react-toastify/dist/ReactToastify.css";
import styles from "../emailPage/EmailPage.module.scss";

import MyInput from "../../components/ui/input/MyInput";
import { Link } from "react-router-dom";
const EmailPage: React.FC = () => {
  const [email, setEmail] = useState("");
  // const [isRedirectAllowed, setIsRedirectAllowed] = useState<boolean>(false);
  // const { sid, setSid } = useAuth();
  // const navigate = useNavigate();
  const { signup } = useAuth();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // useEffect(() => {
  //   if (isRedirectAllowed) {
  //     toast.success("Email verification passed!");
  //     navigate(PASSWORD_PAGE);
  //   }
  // }, [isRedirectAllowed, navigate]);

  // async function signup(username: string) {
  //   let url = BASE_GRIFFON_URL + GRIFFON_SIGNUP_URL;

  //   const params = new URLSearchParams();
  //   // params.append("client_id", GRIFFON_TOKEN);
  //   // params.append("client_secret", GRIFFON_SECRET);
  //   params.append("client_id", GRIFFON_MY_CLIENT);
  //   params.append("client_secret", GRIFFON_MY_SECRET);
  //   params.append("username", username);
  //   // const res = await axios
  //   //   .post<SignUpResponse>(url, params)
  //   //   .then((res) => res.data);
  //   // setSid(res.sid);
  //   // // const otpResponse = await sendOtp(code, res.sid);
  //   // await sendOtp(code, res.sid);
  //   try {
  //     const res = await axios.post<SignUpResponse>(url, params);
  //     if (res.status !== 200 && res.status !== 201) {
  //       throw new Error(`Unexpected response status: ${res.status}`);
  //     }
  //     setSid(res.data.sid);
  //     await sendOtp(code, res.data.sid);
  //     setIsRedirectAllowed(true);
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response?.status === 409) {
  //       toast.error("User already exists. Please, try with a different email.");
  //       // setIsRedirectAllowed(false);
  //       // console.log(isRedirectAllowed);
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // }

  // async function singup(email: string) {
  //   let url = BASE_GRIFFON_URL + GRIFFON_SIGNUP_URL;
  //   const params = new URLSearchParams();
  //   params.append("client_id", GRIFFON_TOKEN);
  //   params.append("client_secret", GRIFFON_SECRET);
  //   // params.append("client_id", client_id);
  //   // params.append("client_secret", client_secret);
  //   params.append("username", email);
  //   // const res = await axios
  //   //   .post<SignUpResponse>(url, params)
  //   //   .then((res) => res.data);
  //   // setSid(res.sid);
  //   // // const otpResponse = await sendOtp(code, res.sid);
  //   // await sendOtp(code, res.sid);
  // }

  // async function sendOtp(code: string, sid?: string) {
  //   let url = BASE_GRIFFON_URL + GRIFFON_VERIFY_URL;
  //   return axios
  //     .post<SendOtpResponse>(
  //       url,
  //       {
  //         code,
  //       },
  //       {
  //         params: {
  //           sid,
  //         },
  //       }
  //     )
  //     .then((res) => res.data);
  // }

  // const checkIfUserExists = async (username: string) => {
  //   let url = BASE_GRIFFON_URL + GRIFFON_CHECK_URL;
  //   return axios.post<any>(url, {
  //     username,
  //     bucket: GRIFFON_BUCKET_ID,
  //   });
  // };

  // const handleSubmit = async (event: React.FormEvent) => {
  // event.preventDefault();
  // // await signup(email);
  // // toast.success("Верификация по электронной почте успешно отправлена!");
  // // navigate(PASSWORD_PAGE);
  // try {
  //   await signup(email);
  //   toast.success("Email verification passed!");
  //   navigate(PASSWORD_PAGE);
  // } catch (error) {
  //   toast.error("Email verification error!");
  // }
  // };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     const userExists = await checkIfUserExists(email);
  //     if (userExists) {
  //       toast.error("User already exists. Please, try with a different email.");
  //     } else {
  //       await signup(email);
  //       toast.success("Email verification passed!");
  //       navigate(PASSWORD_PAGE);
  //     }
  //   } catch (error) {
  //     toast.error(
  //       "Error occurred during signup or email check. Please, try again later."
  //     );
  //   }
  // };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signup(email);
    } catch (error) {
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
          <h2 style={{ marginTop: "0px" }}>Register</h2>
          <p>Use your Email or Phone to register</p>
        </div>
        <form className={styles.form}>
          <MyInput
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={"Enter email or phone"}
          />
          <button
            className={styles.button}
            type="submit"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </form>

        <div className={styles.signup}>
          <p>Do you already have an account?</p>
          <a href="/signin">Sign in!</a>
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
//asassaAs_1
// sdsadasd@gmail.com
// addds@gmail.com
