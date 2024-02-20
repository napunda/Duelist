export interface ITodoItem {
  id: string;
  todo: string;
  date: string;
  tags: string[];
  owner: string;
  completed?: boolean;
  ownerUid: string;
  createdAt: Date;
}
