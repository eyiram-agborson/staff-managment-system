export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  department: string;
  status: 'active' | 'inactive';
}