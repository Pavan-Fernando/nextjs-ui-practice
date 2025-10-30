'use client';

import Link from 'next/link';
import UsersTable from '@/app/components/userTable';
import { Users, Plus } from 'lucide-react';

export default function UsersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-8 px-4 sm:px-6 lg:px-8">
            {/* Subtle Background Orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                                <Users className="w-10 h-10 text-indigo-400" />
                                Users
                            </h1>
                            <p className="text-gray-400 mt-1">Manage and monitor all registered users</p>
                        </div>

                        <Link
                            href="/users/new"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                        >
                            <Plus className="w-5 h-5" />
                            Add New User
                        </Link>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-gray-800">
                        <h2 className="text-lg font-semibold text-white">All Users</h2>
                        <p className="text-sm text-gray-400">Complete list of registered users</p>
                    </div>

                    <div className="p-6">
                        <UsersTable />
                    </div>
                </div>
            </div>
        </div>
    );
}