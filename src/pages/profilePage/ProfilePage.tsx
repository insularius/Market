import React, { useState } from "react";
import styles from "../profilePage/ProfilePage.module.scss";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PAGE, PROFILE_STORAGE_KEY } from "../../constants/Constants";
import { toast } from "react-toastify";
import MyInput from "../../components/ui/input/MyInput";
import { useAuth } from "../../context/Auth";
const ProfilePage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const navigate = useNavigate();
  const {
    createProfile,
    getProfile,
    persistProfile,
    isAuthorized,
    setIsAuthorized,
  } = useAuth();

  //   const getIdToken = async (): Promise<string | null> => {
  //     try {
  //       const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
  //       const tokens: AuthTokens = JSON.parse(storedTokens!);
  //       return tokens.id_token ? tokens.id_token : null;
  //     } catch (e) {
  //       console.error(e);
  //       return null;
  //     } finally {
  //       console.log(`Something`);
  //     }
  //     //const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
  //     //return storedTokens ? JSON.parse(storedTokens).id_token : null;
  //   };

  //   async function createProfile(data: ProfileUpdateDTO) {
  //     let url = BASE_GRIFFON_URL + GRIFFON_PROFILE_URL;
  //     const idToken = await getIdToken();
  //     return axios
  //       .post<Profile>(url, data, {
  //         headers: {
  //           Authorization: `Bearer ${idToken}`,
  //         },
  //       })
  //       .then((res) => res.data);
  //   }

  //   async function getProfile() {
  //     const idToken = await getIdToken();
  //     let url = BASE_GRIFFON_URL + GRIFFON_PROFILE_URL;
  //     if (idToken) {
  //       return axios
  //         .get(url, {
  //           headers: {
  //             Authorization: `Bearer ${idToken}`,
  //           },
  //         })
  //         .then((res) => res?.data);
  //     } else {
  //       throw new Error("There's no token ID");
  //     }
  //   }

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleProfileInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProfile({
        first_name: firstName,
        last_name: lastName,
      });
      setIsAuthorized(true);
      const profileData = await getProfile();
      persistProfile(profileData);
      toast.success("Profile success");
      navigate(DASHBOARD_PAGE);
    } catch (error) {
      toast.error("Profile error");
    }
  };

  //   const refreshToken = async () => {
  //     let url = BASE_GRIFFON_URL + GRIFFON_TOKEN_URL;
  //     const params = new URLSearchParams();
  //     params.append("client_id", GRIFFON_TOKEN);
  //     params.append("client_secret", GRIFFON_SECRET);
  //     const tokensString = localStorage.getItem(TOKEN_STORAGE_KEY);
  //     const tokens = tokensString ? JSON.parse(tokensString) : null;
  //     if (tokens) {
  //       params.append("refresh_token", tokens.refresh_token);
  //       params.append("grant_type", "refresh_token");
  //       return axios.post<AuthTokens>(url, params).then((res) => {
  //         localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(res.data));
  //         return res.data;
  //       });
  //     } else {
  //       throw new Error("No tokens found in local storage");
  //     }
  //   };

  // const refreshToken = () => {
  //   const params = new URLSearchParams();
  //   params.append("client_id", this.config.griffonClientId);
  //   params.append("client_secret", this.config.griffonClientSecret);
  //   params.append("refresh_token", this.getTokens()?.refresh_token || "");
  //   params.append("grant_type", "refresh_token");

  //   return axios
  //     .post<AuthTokens>(`${this.config.griffonApiRoot}/oauth/token`, params)
  //     .then((res) => res.data);
  // };

  //   const persistProfile = (profile: Profile) => {
  //     localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  //   };

  //   const persistTokens = (tokens: AuthTokens) => {
  //     const expire_date = new Date().getTime() + tokens.expires_in * 1000;
  //     localStorage.setItem(
  //       TOKEN_STORAGE_KEY,
  //       JSON.stringify({
  //         ...tokens,
  //         expire_date,
  //       })
  //     );
  //   };

  return (
    <div className={styles.container}>
      <div className={styles.registerForm} style={{ marginBottom: "0px" }}>
        <div className={styles.info}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="/images/TLOU.png" alt="" />
          </div>
          <h2 style={{ marginTop: "0px" }}>Register</h2>
          <p>U're taking final steps! Enter last fields and u're done</p>
        </div>
        <form className={styles.form}>
          <MyInput
            className={styles.input}
            type="text"
            id="lastName"
            value={firstName}
            onChange={handleFirstName}
            placeholder="Enter First name"
          />
          <MyInput
            className={styles.input}
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastName}
            placeholder="Enter Last name"
          />
          <button
            className={styles.button}
            type="submit"
            onClick={handleProfileInfoSubmit}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
