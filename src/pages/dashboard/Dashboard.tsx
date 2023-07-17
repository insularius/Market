import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import {
  deleteAvatar,
  updateAvatar,
  updateProfile,
} from "../../types/authProvide";
import Box from "@mui/material/Box";
import styles from "../dashboard/Dashboard.module.scss";
import { ProfileUpdateDTO } from "../../types/griffon";
import Loader from "../../components/loader/Loader";
import CustomModal from "../../components/ui/modal/CustomModal";
import ProfileCardInfo from "../../components/profileCard/ProfileCardInfo";
import ProfileCardChangeInfo from "../../components/profileCard/ProfileCardChangeInfo";

const Dashboard = () => {
  const { getProfile, profile = { nickname: "" }, setProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [country, setCountry] = useState("");
  const [nicknameChanged, setNicknameChanged] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar?.original);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const updateProfileInfo = async () => {
    const updatedProfile: ProfileUpdateDTO = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      city: profile.city,
      country: profile.country,
      nickname: profile.nickname,
      email: profile.email,
      phone_number: profile.phone_number,
    };
    try {
      await updateProfile(updatedProfile);
      setProfile({
        ...profile,
        first_name: profile.first_name,
        last_name: profile.last_name,
        city: profile.city,
        country: profile.country,
        nickname: profile.nickname,
        email: profile.email,
        phone_number: profile.phone_number,
      });
      setNicknameChanged(false);
      handleCloseEmailModal();
      handleClosePhoneModal();
    } catch (error) {}
  };
  const handleProfileInfoChange = (field: string, value: string) => {
    setNicknameChanged(true);
    setProfile({ ...profile, [field]: value });
  };
  const handleOpenEmailModal = () => {
    setIsEmailModalOpen(true);
  };
  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };
  const handleOpenPhoneModal = () => {
    setIsPhoneModalOpen(true);
  };
  const handleClosePhoneModal = () => {
    setIsPhoneModalOpen(false);
  };
  // useEffect(() => {
  //   setNickname(profile.nickname);
  // }, [profile.nickname]);

  // const handleCountryChange = (event: SelectChangeEvent<string>) => {
  //   setCountry(event.target.value);
  // };

  // const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setNicknameChanged(true);
  //   setNickname(event.target.value);
  //   // setProfile({ ...profile, nickname: event.target.value });
  // };
  const handleFileChangeAndUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.files);
    setIsModalOpen(true);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      await handleUpload(file);

      setIsModalOpen(false);
    }
  };

  // const handleUpload = async (file: File) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("fileupload", file);
  //     const response = await updateAvatar(formData);
  //
  //     await getProfile();
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   //обработку ошибок дополнить
  // };

  // const handleUpload = async (file: File) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("fileupload", file);
  //     await updateAvatar(formData);
  //     if (profile.avatar && profile.avatar.original) {
  //       setAvatarUrl(`${profile.avatar.original}?timestamp=${Date.now()}`);
  //     }
  //     await getProfile();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("fileupload", file);
      await updateAvatar(formData);
      setAvatarUrl(`${profile?.avatar?.original}?timestamp=${Date.now()}`);
      await getProfile();
      console.log(avatarUrl);
      console.log(profile.avatar?.original);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (profile.avatar && profile.avatar.original) {
      setAvatarUrl(`${profile.avatar.original}?timestamp=${Date.now()}`);
    }
  }, [profile.avatar]);

  const handleDelete = async () => {
    await deleteAvatar();
    await getProfile();
    setAvatarUrl("");
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };
  const handleButtonClick = () => {
    toggleEditing();
    updateProfileInfo();
  };

  useEffect(() => {
    setCountry(profile.country || "");
  }, [profile.country]);

  return (
    <>
      <Loader isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <CustomModal
        isOpen={isEmailModalOpen}
        handleClose={handleCloseEmailModal}
        field="email"
        handleProfileInfoChange={handleProfileInfoChange}
        profile={profile}
        updateProfileInfo={updateProfileInfo}
      />
      <CustomModal
        isOpen={isPhoneModalOpen}
        handleClose={handleClosePhoneModal}
        field="phone_number"
        handleProfileInfoChange={handleProfileInfoChange}
        profile={profile}
        updateProfileInfo={updateProfileInfo}
      />
      <Box className={styles.container}>
        <Box className={styles.container__content}>
          <ProfileCardInfo
            handleFileChangeAndUpload={handleFileChangeAndUpload}
            handleProfileInfoChange={handleProfileInfoChange}
            updateProfileInfo={updateProfileInfo}
            handleDelete={handleDelete}
            handleOpenEmailModal={handleOpenEmailModal}
            handleOpenPhoneModal={handleOpenPhoneModal}
            profile={profile}
            avatarUrl={avatarUrl}
            nicknameChanged={nicknameChanged}
          />
          <ProfileCardChangeInfo
            profile={profile}
            editing={editing}
            handleProfileInfoChange={handleProfileInfoChange}
            toggleEditing={toggleEditing}
            handleButtonClick={handleButtonClick}
            country={country}
          />
        </Box>
      </Box>
    </>
  );
};
export default Dashboard;
