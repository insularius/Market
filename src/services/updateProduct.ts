import { data } from "../mock";
import { PostProductFields } from "../types/postProductFields";
// import { updateProduct } from './editProduct';
import { ProductFields } from "../types/product";
import { uploadProductImage } from "./ uploadProductImage";
import axios from "axios";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";

// export const updateProduct = (
//   productId: number,
//   updatedFields: Partial<ProductFields>
// ) => {
//   return axios.put(`${API_ROOT}/daru-products/${productId}`, {
//     data: updatedFields,
//   });
// };

// export const updateProduct = (productId: number, product: ProductFields) => {
//   return axios.put(`${API_ROOT}/daru-products/${productId}`, { data: product });
// };

// export const updateProduct = async (
//   productId: number,
//   product: ProductFields
//   // image?: File | null
// ) => {
//   // if (image) {
//   //   const formData = new FormData();
//   //   formData.append("files", image);
//   //   const imageResponse = await axios.post(`${API_ROOT}/upload`, formData);
//   //   const uploadedImageId = imageResponse.data[0].id;
//   //   product.image = uploadedImageId;
//   // }
//   const response = await axios.put(`${API_ROOT}/daru-products/${productId}`, {
//     data: product,
//   });

//   return response.data;
// };
export const updateProduct = async (
  productId: number,
  product: ProductFields
) => {
  return await axios.put(`${API_ROOT}/daru-products/${productId}`, {
    data: product,
  });
};
