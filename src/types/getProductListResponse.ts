import { product } from "./product";
export interface getProductListResponse {
  data: [product];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
