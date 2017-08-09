import { Username } from './username.model';
export interface Post {
  id?: number;
  slug?: string;
  title: string;
  content: string;
  author?: Username;
  createdDate?: any;
}

