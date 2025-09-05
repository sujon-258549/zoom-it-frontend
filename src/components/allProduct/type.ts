export type TCategory = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};


export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount?: number;
  status: string;
  stockStatus: boolean;
  orderQuantity?: number,
  photos: string[];
  categories: TCategory[];
  createdAt: string;
  updatedAt: string;

};


export type TProductResponse = {
  data: TProduct[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number
  };
};
