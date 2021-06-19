import { User } from './User';

export interface Notification {
  _id: string;
  title: string;
  message: string;
  receiver: User;
  oldPrice?: string;
  newPrice?: string;
  image?: string;
  url?: string;
  read: boolean;
  createDate: Date;
}
