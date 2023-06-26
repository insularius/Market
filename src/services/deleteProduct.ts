import axios from "axios";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";

export const deleteProduct = (id: number) => {
  return axios
    .delete(`${API_ROOT}/daru-products/${id}`)
    .then((response) => {
      console.log(`Deleted post with ID ${id}`);
    })
    .catch((error) => {
      console.error(error);
    });
};
