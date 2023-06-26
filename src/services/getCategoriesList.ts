import axios from "axios";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";

export const getCategoriesList = () => {
  return axios
    .get(`${API_ROOT}/daru-categories`)
    .then((response) => response.data);
};
