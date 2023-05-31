import axios from "axios";
import { getProductListResponse } from "../types/getProductListResponse";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";

export const getProductList = () => {
  return axios
    .get<getProductListResponse>(`${API_ROOT}/daru-products`)
    .then((response) => response.data);
};
