import { Product } from './Product';

export interface List {
  _id: string;
  name: string;
  products: Product[];
  userIds: string;
  creator: string;
}
