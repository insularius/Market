import axios from "axios";
import { getProductListResponse } from "../types/getProductListResponse";
import qs from "qs";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";
//нужно сделать объект, который будет принимать в себя несколько аргументов для фильтрации

type Args = {
  categoryId?: number[];
  productId?: number;
};
export const getProductsList = async ({ categoryId, productId }: Args) => {
  const params = qs.stringify(
    {
      populate: ["image", "daru_category"],
      filters: {
        data: {
          id: productId,
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

// export const getProductItem = (id: number) => {
//   return axios
//     .get(`${API_ROOT}/daru-products/${id}`, {
//       params: {
//         populate: "image,daru_category",
//       },
//     })
//     .then((response) => response.data);
// }; https://dario-cms.dar-dev.zone/api/daru-products/1?populate=image%2Cdaru_category'

//https://dario-cms.dar-dev.zone/api/daru-categories
//https://dario-cms.dar-dev.zone/api/daru-products?populate=image%2Cdaru_category&filters[daru_category][name]=RPG
//daru-products?populate=image%2Cdaru_category&filters[daru_category][id][%24in][0]=1&filters[daru_category][id][%24in][1]=4

//всё должно работать в одном запросе, qs подключить и проверять, есть ли категории, то всталять в урл категории итд
//тогда и будет всё вставать на место, после примененения фильтра

//?populate=image%2Cdaru_category
//&filters[daru_category][id][%24in][0]=${id[0]}&filters[daru_category][id][%24in][1]=${id[1]}

//удалить категорию, поменять энпойнт,

/**
 * params: {
 *  categories?: number[]
 * }
 *
 */
