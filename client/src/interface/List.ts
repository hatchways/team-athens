export interface List {
  _id: string;
  name: string;
  products?: string[];
  userIds?: string[];
  creator: string;
}
