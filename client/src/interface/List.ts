export interface List {
  _id: string;
  name: string;
  products?: string[];
  userIds?: string[];
  imageUrl: string;
  private?: boolean;
  creator: string;
}
