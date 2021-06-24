import { List } from './List';

export interface ListApiData {
  error?: { message: string };
  success?: boolean;
  lists?: List[];
}
