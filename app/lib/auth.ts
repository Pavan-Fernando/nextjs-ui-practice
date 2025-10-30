// app/lib/auth.ts
export type User = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'User';
  status: 'Active' | 'Inactive';
  phone?: string;
  avatar?: string;
  joinedAt: string;
};

export const getCurrentUser = (): User | null => {
  // Replace with real auth (NextAuth, Clerk, etc.)
  return {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    phone: '+1234567890',
    joinedAt: '2023-06-15',
  };
};