import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { RegisterResponse } from "../../types/griffon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
import styles from "../passwordPage/PasswordPage.module.scss";
import { PROFILE_PAGE, TOKEN_STORAGE_KEY } from "../../constants/Constants";
import MyInput from "../../components/ui/input/MyInput";

const PasswordPage = () => {
  //toast
  const navigate = useNavigate();
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const { sid, setSid } = useAuth();
  const { register } = useAuth();
  const handlePasswordChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword1(event.target.value);
  };
  const handlePasswordChange2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword2(event.target.value);
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const registerResponse = await register(sid, password1);
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(registerResponse));
      toast.success("Register success!");
      navigate(PROFILE_PAGE);
    } catch (error) {
      toast.error("Register error!");
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
          <p>Password must contain: </p>
        </div>
        <form className={styles.form}>
          <MyInput
            type="password"
            id="password1"
            value={password1}
            onChange={handlePasswordChange1}
            placeholder="Enter password"
            className={styles.input}
          />
          <MyInput
            type="password"
            id="password2"
            value={password2}
            onChange={handlePasswordChange2}
            placeholder="Re-enter password"
            className={styles.input}
          />
          <button
            className={styles.button}
            type="submit"
            onClick={handlePasswordSubmit}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPage;
