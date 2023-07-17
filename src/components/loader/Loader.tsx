import { CircularProgress, Modal } from "@mui/material";
import React, { useCallback, useState } from "react";
import { ColorCircularProgress } from "../../types/authProvide";
import styles from "./Loader.module.scss";
type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (condition: boolean) => void;
};
const Loader = ({ isModalOpen, setIsModalOpen }: Props) => (
  <Modal
    open={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    aria-labelledby="loading-modal"
    aria-describedby="uploading-image"
  >
    <ColorCircularProgress
      size={80}
      sx={{
        position: "absolute",
        top: "40%",
        left: "45%",
        transform: "translate(-50%, -50%)",
        p: 4,
      }}
    />
  </Modal>
);

export default Loader;
