import axios from "axios";
import { getProductListResponse } from "../types/getProductListResponse";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";

export const getProductItemById = (id: number) => {
  return axios
    .get(`${API_ROOT}/daru-products/${id}`, {
      params: {
        populate: ["image", "daru_category"],
      },
    })
    .then((response) => response.data);
};

// const res = await axios.get('https://httpbin.org/get', { params });

// `${API_ROOT}/daru-products/${id}?populate=image%2Cdaru_category`;
// `https://dario-cms.dar-dev.zone/api/daru-products/${id}?populate=image%2Cdaru_category&filters[daru_category]=${id}`
