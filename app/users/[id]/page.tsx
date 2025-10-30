import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockUsers } from '../../lib/mockUser';
import { ArrowLeft, Edit, Mail, Phone, Shield, Circle } from 'lucide-react';

export default async function UserViewPage({ params }: { params: Promise<{ id: string }> }) {
    // Await params
    const { id } = await params;
    const userId = Number(id);

    const user = mockUsers.find(u => u.id === userId);

    if (!user) notFound();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Link href="/users" className="hover:text-indigo-400">Users</Link>
                    <span>/</span>
                    <span className="text-white">{user.name}</span>
                </div>

                <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                                <p className="text-gray-400">{user.email}</p>
                            </div>
                        </div>
                        <Link
                            href={`/users/${user.id}/edit`}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Edit
                            Edit User
                        </Link>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-white">{user.email}</p>
                                </div>
                            </div>
                            {user.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-400">Phone</p>
                                        <p className="text-white">{user.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Role</p>
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                        user.role === 'Admin' ? 'bg-purple-900 text-purple-300' :
                                            user.role === 'Editor' ? 'bg-indigo-900 text-indigo-300' :
                                                'bg-gray-700 text-gray-300'
                                    }`}>
                    {user.role}
                  </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Circle className={`w-5 h-5 ${
                                    user.status === 'Active' ? 'text-green-400' : 'text-red-400'
                                }`} />
                                <div>
                                    <p className="text-sm text-gray-400">Status</p>
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                        user.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                                    }`}>
                    {user.status}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <Link
                            href="/users"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Back to Users
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}