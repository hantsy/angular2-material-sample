import { Username } from './username.model';
export interface Comment {
  id?: number;
  content: string;
  author?: Username;
  createdDate?: string;
}
