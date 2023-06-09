// import { Category } from './category';
export interface GetCategoryDto {
  id?: number;
  attributes?: {
    name?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}
export interface Productt {
  quantity: number;
  id: number;
  attributes: {
    name: string;
    description: string;
    article: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    daru_category: GetCategoryDto;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          caption: string;
          width: number;
          height: number;
          formats: {
            xsmall: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: null;
              size: number;
              width: number;
              height: number;
            };
            thumbnail: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: null;
              size: number;
              width: number;
              height: number;
            };
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: null;
          provider: string;
          provider_metadata: null;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
}

// export type ProductFields = Pick<
//   Productt["attributes"],
//   "name" | "description" | "article" | "price"
// >;
// export type CategoryFiled = Pick<Productt["attributes"], "publishedAt">;

// export type ProductFields = Pick<
//   Productt["attributes"],
//   "name" | "description" | "article" | "price" | "daru_category"
// >;

export type CategoryId = Productt["attributes"]["daru_category"]["id"];
// export type CategoryField = Pick<GetCategoryDto, "id">;
// export type CategoryField = Pick<GetCategoryDto, "id" | "attributes">;

export type ProductFields = Partial<
  Pick<Productt, "id"> & Productt["attributes"]
>;
