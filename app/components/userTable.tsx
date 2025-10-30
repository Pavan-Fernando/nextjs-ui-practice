// app/components/UsersTable.tsx
'use client';

import { useMemo, useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { mockUsers } from '../lib/mockUser';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
};

// const mockUsers: User[] = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
//     { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
//     { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Inactive' },
// ];

type SortKey = keyof Pick<User, 'name' | 'email' | 'role' | 'status'>;
type SortOrder = 'asc' | 'desc';

export default function UsersTable() {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    // ---------- SEARCH ----------
    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        return term
            ? mockUsers.filter(
                (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
            )
            : mockUsers;
    }, [search]);

    // ---------- SORT ----------
    const sorted = useMemo(() => {
        const copy = [...filtered];
        copy.sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];

            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        return copy;
    }, [filtered, sortKey, sortOrder]);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortKey !== column) return null;
        return sortOrder === 'asc' ? (
            <ChevronUp className="inline w-4 h-4 ml-1" />
        ) : (
            <ChevronDown className="inline w-4 h-4 ml-1" />
        );
    };

    return (
        <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
            {/* ---------- SEARCH BAR ---------- */}
            <div className="p-4 border-b border-gray-800">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* ---------- TABLE ---------- */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="bg-gray-800">
                    <tr>
                        {(['name', 'email', 'role', 'status'] as const).map((key) => (
                            <th
                                key={key}
                                onClick={() => toggleSort(key)}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                <SortIcon column={key} />
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                    {sorted.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'Admin'
                              ? 'bg-purple-900 text-purple-300'
                              : user.role === 'Editor'
                                  ? 'bg-indigo-900 text-indigo-300'
                                  : 'bg-gray-700 text-gray-300'
                      }`}
                  >
                    {user.role}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-red-900 text-red-300'
                      }`}
                  >
                    {user.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                                    Edit
                                </button>
                                <button className="text-red-400 hover:text-red-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* ---------- EMPTY STATE ---------- */}
                {sorted.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        {search
                            ? `No users match "${search}".`
                            : 'No users found. Click "Add New User" to get started.'}
                    </div>
                )}
            </div>
        </div>
    );
}