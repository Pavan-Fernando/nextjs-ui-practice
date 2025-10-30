// app/lib/mockUsers.ts
export type User = {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'Editor' | 'User';
    status: 'Active' | 'Inactive';
    phone?: string;
};

export const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', phone: '+1234567890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', phone: '+0987654321' },
];