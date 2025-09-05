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

interface OrderItem {
  id: TProduct;
  orderQuantity: number;
  _id: string;
}
export interface TOrder {
  _id: string;
  orderId: {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
  };
  product: OrderItem[];
  address: {
    address: string;
    district: string;
    _id: string;
  };
  totalAmount: number;
  deliveryStatus: boolean;
  paymentStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TOrderResponse = {
  data: TOrder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number
  };
};