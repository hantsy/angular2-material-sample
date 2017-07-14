export interface User {
  id?: number;
  username: string;
  roles?: string[];
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: string;
  createdBy?: string;
}
