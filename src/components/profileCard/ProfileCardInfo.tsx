import { Avatar, Box, Button, Paper, TextField } from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { ChangeButton } from "../../types/authProvide";
import { Profile, ProfileCardInfoProps } from "../../types/griffon";
import styles from "../profileCard/ProfileCardInfo.module.scss";
import { StyledBadge } from "../ui/badge/Badge";
const ProfileCardInfo: React.FC<ProfileCardInfoProps> = ({
  handleFileChangeAndUpload,
  handleProfileInfoChange,
  updateProfileInfo,
  handleDelete,
  handleOpenEmailModal,
  handleOpenPhoneModal,
  profile,
  avatarUrl,
  nicknameChanged,
}) => {
  return (
    <Paper
      sx={{
        flexBasis: "50%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <h3>Profile</h3>
      <div className={styles.imageContainer}>
        {profile?.avatar && profile.avatar.original && (
          <div>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                key={avatarUrl}
                src={avatarUrl}
                alt="User avatar"
                className={styles.avatar}
                sx={{ width: 140, height: 140 }}
              />
            </StyledBadge>
            <div className={styles.imageUpload}>
              <label htmlFor="avatar-input">
                <FaPlus className={styles.plusButton} />
              </label>
              <input
                id="avatar-input"
                type="file"
                onChange={handleFileChangeAndUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 0,
        }}
      >
        <h5>Nickname</h5>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <TextField
            id="standard-basic"
            label="Enter nickname"
            variant="standard"
            name="nickname"
            value={profile.nickname}
            onChange={(event) =>
              handleProfileInfoChange(event.target.name, event.target.value)
            }
            sx={{ width: "80%" }}
          />
          {nicknameChanged && (
            <Button onClick={updateProfileInfo} sx={{ marginLeft: 2 }}>
              Save
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        <h5>Email</h5>
        <span className={styles.emailField}>
          <p className={styles.emailValue}>{profile?.email}</p>
          <ChangeButton
            variant="text"
            onClick={handleOpenEmailModal}
            className="myButton"
          >
            Change email
          </ChangeButton>
        </span>
      </Box>
      <h5>Phone Number</h5>
      {profile?.phone_number ? (
        <span className={styles.emailField}>
          <p>{profile.phone_number}</p>
          <Button variant="text" color="primary">
            Change phone number
          </Button>
        </span>
      ) : (
        <span>
          <ChangeButton
            variant="text"
            className="myButton"
            color="primary"
            onClick={handleOpenPhoneModal}
          >
            Add phone number
          </ChangeButton>
        </span>
      )}
      <Button variant="contained" onClick={handleDelete}>
        Delete Avatar
      </Button>
    </Paper>
  );
};

export default ProfileCardInfo;
