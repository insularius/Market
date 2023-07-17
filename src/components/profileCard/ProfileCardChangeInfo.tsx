import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { ProfileCardChangeInfoProps } from "../../types/griffon";

const ProfileCardChangeInfo: React.FC<ProfileCardChangeInfoProps> = ({
  profile,
  handleButtonClick,
  handleProfileInfoChange,
  editing,
  toggleEditing,
  country,
}) => {
  return (
    <Paper
      sx={{
        flexBasis: "50%",
        display: "flex",
        flexDirection: "row",
        gap: 2,
        p: 2,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flexBasis: "50%",
        }}
      >
        <TextField
          label="First name"
          name="first_name"
          value={profile.first_name}
          variant="outlined"
          disabled={!editing}
          onChange={(event) =>
            handleProfileInfoChange(event.target.name, event.target.value)
          }
        />
        <TextField
          label="Last name"
          name="last_name"
          value={profile.last_name}
          variant="outlined"
          disabled={!editing}
          onChange={(event) =>
            handleProfileInfoChange(event.target.name, event.target.value)
          }
        />
        {!editing ? (
          <Button variant="contained" onClick={toggleEditing}>
            Change
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Button variant="contained" onClick={toggleEditing}>
              Cancel
            </Button>
            <Button
              variant="contained"
              // onClick={toggleEditing}
              onClick={handleButtonClick}
              color="primary"
            >
              Save changes
            </Button>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flexBasis: "50%",
        }}
      >
        <TextField
          name="city"
          value={profile.city}
          label="City"
          variant="outlined"
          disabled={!editing}
          onChange={(event) =>
            handleProfileInfoChange(event.target.name, event.target.value)
          }
        />
        <FormControl>
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            name="country"
            value={country}
            defaultValue={profile.country}
            onChange={(event) =>
              handleProfileInfoChange(event.target.name, event.target.value)
            }
            disabled={!editing}
          >
            <MenuItem value={"USA"}>USA</MenuItem>
            <MenuItem value={"Canada"}>Canada</MenuItem>
            <MenuItem value={"UK"}>UK</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default ProfileCardChangeInfo;
