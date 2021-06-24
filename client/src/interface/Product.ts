export interface Product {
  _id: string;
  name: string;
  description: string;
  url: string;
  price: number;
  pictureUrl: string;
}

export interface ListProductApiData {
  success?: { message: string; products: Product[] };
  error?: { message: string };
}
