import axios from "axios";
import { getProductListResponse } from "../types/getProductListResponse";
import qs from "qs";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";

type Args = {
  categoryId?: number[];
  query?: string;
};
export const getProductsList = async ({ categoryId, query }: Args) => {
  const params = qs.stringify(
    {
      populate: ["image", "daru_category"],
      filters: {
        name: {
          $containsi: query,
        },
        daru_category: {
          id: {
            $in: categoryId,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  return await axios
    .get<getProductListResponse>(`${API_ROOT}/daru-products?${params}`)
    .then((res) => res.data);
};
