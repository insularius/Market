import axios from "axios";

export const postProductList = (dataa: any) => {
  const url = "https://dario-cms.dar-dev.zone/api/daru-products";
  return axios.post(url, dataa).then((response) => {
    console.log(response.status, response.data.token);
  });
};

/**
 * params: {
 *  categories?: number[]
 * }
 *
 */
