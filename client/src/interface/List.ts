import { Product } from './Product';

export interface List {
  _id: string;
  name: string;
  products: Product[];
  userId: string;
}
