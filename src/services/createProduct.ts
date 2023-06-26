import { ProductFields } from "../types/product";
// import { postProduct } from './postProduct';
import axios from "axios";
import { uploadProductImage } from "./ uploadProductImage";
const API_ROOT = "https://dario-cms.dar-dev.zone/api";

// export const postProduct = async (product: Productt) => {
//   try {
//     const response = await axios.post<Productt>(
//       `${API_ROOT}/daru-products`,
//       product
//     );
//     const createdProduct: Productt = response.data;
//     return createdProduct;
//   } catch (error) {
//     console.error("Error creating product:", error);
//     throw error;
//   }
// };

// export const createProduct = async (product: ProductFields) => {
//   axios.post(`${API_ROOT}/daru-products`, { data: product });
// };

// export const createProduct = async (
//   product: ProductFields
//   // image: File | null
// ) => {
//   // if (image) {
//   //   const formData = new FormData();
//   //   formData.append("files", image);
//   //   const imageResponse = await axios.post(`${API_ROOT}/upload`, formData);
//   //   const uploadedImageId = imageResponse.data[0].id;
//   //   product.image = uploadedImageId;
//   // }
//   const response = await axios.post(`${API_ROOT}/daru-products`, {
//     data: product,
//   });
//   return response.data;
// };

export const createProduct = async (product: ProductFields) => {
  return await axios.post(`${API_ROOT}/daru-products`, {
    data: product,
  });
};
