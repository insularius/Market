import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Profile } from "../../../types/griffon";

interface CustomModalProps {
  isOpen: boolean;
  handleClose: () => void;
  field: string;
  handleProfileInfoChange: (name: string, value: string) => void;
  profile: Profile;
  updateProfileInfo: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  handleClose,
  field,
  handleProfileInfoChange,
  profile,
  updateProfileInfo,
}) => (
  <Modal
    open={isOpen}
    onClose={handleClose}
    aria-labelledby={`${field}-modal`}
    aria-describedby={`change-${field}`}
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <h2>Change {field.charAt(0).toUpperCase() + field.slice(1)}</h2>
      <TextField
        fullWidth
        label={`New ${field.charAt(0).toUpperCase() + field.slice(1)}`}
        name={field}
        value={profile[field as keyof Profile] || ""}
        onChange={(event) =>
          handleProfileInfoChange(event.target.name, event.target.value)
        }
      />
      <Button onClick={updateProfileInfo} sx={{ marginTop: 2 }}>
        Save
      </Button>
    </Box>
  </Modal>
);

export default CustomModal;

/* <Modal
        open={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        aria-labelledby="email-modal"
        aria-describedby="change-email"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Change Email</h2>
          <TextField
            fullWidth
            label="New Email"
            name="email"
            value={profile.email}
            onChange={(event) =>
              handleProfileInfoChange(event.target.name, event.target.value)
            }
          />
          <Button onClick={updateProfileInfo} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
      <Modal
        open={isPhoneModalOpen}
        onClose={handleClosePhoneModal}
        aria-labelledby="phone-modal"
        aria-describedby="change-phone"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Change Phone</h2>
          <TextField
            fullWidth
            label="New Phone"
            name="phone_number"
            value={profile.phone_number}
            onChange={(event) =>
              handleProfileInfoChange(event.target.name, event.target.value)
            }
          />
          <Button onClick={updateProfileInfo} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Box>
      </Modal> */
