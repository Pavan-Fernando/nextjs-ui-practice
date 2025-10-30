import Link from 'next/link';
import { getCurrentUser } from '@/app/lib/auth';
import { Calendar, Mail, Phone, Shield, Circle, Edit, Activity, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
    const user = getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    // Mock stats
    const stats = [
        { label: 'Tasks Completed', value: 142, icon: CheckCircle, color: 'text-green-400' },
        { label: 'Projects', value: 12, icon: Activity, color: 'text-indigo-400' },
        { label: 'Active Days', value: 89, icon: Calendar, color: 'text-purple-400' },
    ];

    const recentActivity = [
        { id: 1, action: 'Completed task "Design Dashboard"', time: '2 hours ago' },
        { id: 2, action: 'Commented on "API Integration"', time: '5 hours ago' },
        { id: 3, action: 'Updated profile picture', time: '2 days ago' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-8 px-4">
            {/* Background Orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link href="/" className="hover:text-indigo-400">Dashboard</Link>
                    <span>/</span>
                    <span className="text-indigo-400">Profile</span>
                </div>

                {/* Profile Card */}
                <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="relative">
                                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                    {user.name.charAt(0)}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors">
                                    <Edit size={16} className="text-gray-300" />
                                </button>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                                <p className="text-gray-300 mt-1">{user.email}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-3 justify-center md:justify-start">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'Admin' ? 'bg-purple-900 text-purple-300' :
                          user.role === 'Editor' ? 'bg-indigo-900 text-indigo-300' :
                              'bg-gray-700 text-gray-300'
                  }`}>
                    <Shield size={14} />
                      {user.role}
                  </span>
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                        user.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                                    }`}>
                    <Circle size={14} className={user.status === 'Active' ? 'text-green-400' : 'text-red-400'} />
                                        {user.status}
                  </span>
                                </div>
                            </div>

                            <Link
                                href="/profile/edit"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-all hover:scale-105"
                            >
                                <Edit size={18} />
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left: Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
                                    <div className="space-y-4">
                                        {user.phone && (
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-400">Phone</p>
                                                    <p className="text-white">{user.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-400">Email</p>
                                                <p className="text-white">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-400">Member Since</p>
                                                <p className="text-white">{format(new Date(user.joinedAt), 'MMMM d, yyyy')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Center: Stats */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:bg-gray-800/70 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-400">{stat.label}</p>
                                                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                                </div>
                                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Activity */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    {recentActivity.map((act) => (
                                        <div key={act.id} className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors">
                                            <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm text-white">{act.action}</p>
                                                <p className="text-xs text-gray-500">{act.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                                    View all activity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}