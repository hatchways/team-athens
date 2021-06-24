import { ProductDetails } from './ProductDetails';

export interface ProductDetailApiData {
  error?: { message: string };
  success?: boolean;
  ScrapedProduct?: ProductDetails;
}
