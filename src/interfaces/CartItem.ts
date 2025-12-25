export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: {
    title: string;
    imageCover: string;
    id: string;
  };
}