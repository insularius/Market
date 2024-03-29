import {
  GRIFFON_EMAIL_VERIFY_CODE,
  GRIFFON_MY_BUCKET,
  GRIFFON_PROFILE_AVATAR,
  GRIFFON_PROFILE_URL,
  GRIFFON_USER_EMAIL,
  PROFILE_STORAGE_KEY,
} from "./../constants/Constants";
import axios from "axios";
import { toast } from "react-toastify";
import {
  BASE_GRIFFON_URL,
  GRIFFON_CHECK_URL,
  GRIFFON_MY_CLIENT,
  GRIFFON_MY_SECRET,
  GRIFFON_TOKEN_URL,
  GRIFFON_VERIFY_URL,
  TOKEN_STORAGE_KEY,
} from "../constants/Constants";
import instance from "../services/axiosInstance";
import {
  AuthTokens,
  Profile,
  ProfileUpdateDTO,
  SendOtpResponse,
} from "./griffon";
import { Button, CircularProgress, styled } from "@mui/material";

export const getIdToken = (): string | null => {
  try {
    const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedTokens) {
      console.log("No stored tokens found");
      return null;
    }
    const tokens: AuthTokens = JSON.parse(storedTokens);
    return tokens.id_token ? tokens.id_token : null;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    console.log(`getIdToken вызвался`);
  }
};

export const refreshToken = async () => {
  const params = new URLSearchParams();
  params.append("client_id", GRIFFON_MY_CLIENT);
  params.append("client_secret", GRIFFON_MY_SECRET);
  const tokensString = localStorage.getItem(TOKEN_STORAGE_KEY);
  const tokens = tokensString ? JSON.parse(tokensString) : null;
  if (tokens) {
    params.append("refresh_token", tokens.refresh_token);
    params.append("grant_type", "refresh_token");
    return instance.post<AuthTokens>(GRIFFON_TOKEN_URL, params).then((res) => {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(res.data));
      return res.data;
    });
  } else {
    throw new Error("No tokens found in local storage");
  }
};

export const sendOtp = async (code: string, sid?: string) => {
  try {
    await instance.post<SendOtpResponse>(
      GRIFFON_VERIFY_URL,
      {
        code,
      },
      {
        params: {
          sid,
        },
      }
    );
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      toast.error("Token expired, running refreshToken");
      refreshToken();
    }
    throw error;
  }
};

export const checkIfUserExists = async (username: string) => {
  try {
    await instance.post(GRIFFON_CHECK_URL, {
      username,
      bucket: GRIFFON_MY_BUCKET,
    });
    return false;
  } catch (error: any) {
    if (error?.response?.status === 409) {
      // toast.success("User exist");
      return true;
    }
    throw error;
  }
};

export const sendEmailVerificationCode = (email: string, password: string) => {
  return instance
    .post(GRIFFON_EMAIL_VERIFY_CODE, {
      email,
      password,
    })
    .then((res) => res.data);
};
const persistProfile = (profile: Profile) => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
};
export function updateProfile(data: ProfileUpdateDTO) {
  return instance.put<Profile>(GRIFFON_PROFILE_URL, data).then((res) => {
    persistProfile(res.data); // Save profile data in the local storage
    return res.data;
  });
}

export async function sendEmailVerificationPassword(
  email: string,
  password: string
) {
  return instance
    .post(GRIFFON_USER_EMAIL, {
      email,
      password,
    })
    .then((res) => res.data);
}

const getAccessToken = (): string | null => {
  let tokens: AuthTokens | null = null;
  try {
    const tokenString = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (tokenString) {
      tokens = JSON.parse(tokenString);
    }
  } catch (e) {
    console.error(e);
  }
  return tokens?.access_token ?? null;
};

// const updateAvatar = (body: any) => {
//   const url = BASE_GRIFFON_URL + GRIFFON_PROFILE_AVATAR;
//   let accessToken = getAccessToken();
//   return axios
//     .post(url, body, {
//       headers: {
//         Authorization: `Bearer ${accessToken}}`,
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((res) => res.data);
// };

export const updateAvatar = async (body: any) => {
  try {
    const res = await instance.post(GRIFFON_PROFILE_AVATAR, body, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAvatar = () => {
  try {
    return axios.delete(
      "https://griffon.dar-qa.zone/api/v1/oauth/profile/avatar",
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const ChangeButton = styled(Button)(({ theme }) => ({
  "&.myButton": {
    padding: "6px",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

export const ColorCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: "teal",
}));
export const DeleteButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
  },
}));

// const profileInfoString = localStorage.getItem(PROFILE_STORAGE_KEY);
// const profileInfo = profileInfoString ? JSON.parse(profileInfoString) : null;
// const [profile, setProfile] = useState<Profile>();  //fron dashboard
