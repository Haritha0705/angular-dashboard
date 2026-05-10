export interface User {
  id: string;
  name: string;
  role: string;
  initials: string;
  status: 'Active' | 'Away' | 'Offline';
}
