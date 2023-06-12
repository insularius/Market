import { Productt } from "./product";
export interface getProductListResponse {
  data: Productt[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
