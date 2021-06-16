import { User } from './User';

export interface Notification {
  _id: string;
  title: string;
  message: string;
  receiver: User;
  old_price?: string;
  new_price?: string;
  image?: string;
  url?: string;
  read: boolean;
  read_date?: Date;
  create_date: Date;
}
