import { Product } from './Product';

export interface List {
  _id: string;
  name: string;
  products: string[];
  userIds?: string[];
  imageUrl: string;
  isPrivate?: boolean;
  creator: string;
}
