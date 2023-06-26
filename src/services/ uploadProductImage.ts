import axios from "axios";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";

// export const uploadImage = async (image: File) => {
//   const formData = new FormData();
//   formData.append("files", image);
//   const imageResponse = await axios.post(`${API_ROOT}/upload`, formData);
//   const uploadedImageId = imageResponse.data[0].id;
//   return uploadedImageId;
// };

export const uploadProductImage = async (image: File) => {
  const formData = new FormData();
  formData.append("files", image);
  const imageResponse = await axios.post(`${API_ROOT}/upload`, formData);
  return imageResponse.data[0].id;
};
