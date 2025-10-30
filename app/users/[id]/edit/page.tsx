import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { mockUsers } from '../../../lib/mockUser';
import UserForm from '../../../components/userForm';
import { ArrowLeft } from 'lucide-react';

export default async function UserEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const userId = Number(id);
    const user = mockUsers.find(u => u.id === userId);

    if (!user) notFound();

    // Server Action
    const updateUser = async (data: any) => {
        'use server';
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Updated user:', data);
        // In real app: save to DB
        redirect(`/users/${user.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Link href="/users" className="hover:text-indigo-400">Users</Link>
                    <span>/</span>
                    <Link href={`/users/${user.id}`} className="hover:text-indigo-400">{user.name}</Link>
                    <span>/</span>
                    <span className="text-white">Edit</span>
                </div>

                <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
                    <h1 className="text-3xl font-bold text-white mb-6">Edit User</h1>

                    <UserForm user={user} action={updateUser} />

                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <Link
                            href={`/users/${user.id}`}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}