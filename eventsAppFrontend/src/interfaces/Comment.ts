import { User } from './user';

export interface Comment {
  id?: number;
  event: Event;
  user: User;
  content: String;
  createdAt: Date;
  updateddAt: Date;
  rating: number;
}
