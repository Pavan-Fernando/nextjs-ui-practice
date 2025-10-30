'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Mock user state (replace with real auth.ts later)
const isLoggedIn = true; // Set to `false` to show guest
const currentUser = isLoggedIn
    ? { name: 'John Doe', email: 'john@example.com', avatar: null }
    : null;

// Mock notifications
const notifications = [
    { id: 1, title: 'New user registered', time: '2 min ago', unread: true },
    { id: 2, title: 'Server backup completed', time: '1 hour ago', unread: false },
    { id: 3, title: 'Payment received', time: '3 hours ago', unread: true },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/users', label: 'Users' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl text-white">MyApp</span>
                    </Link>

                    {/* Desktop: Links + Icons */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Nav Links */}
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`transition-colors font-medium ${
                                    pathname === href
                                        ? 'text-indigo-400'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}

                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => setNotifOpen(!notifOpen)}
                                className="relative p-2 text-gray-300 hover:text-white transition-colors"
                                aria-label="Notifications"
                            >
                                <Bell size={22} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {unreadCount}
                  </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {notifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                                    <div className="p-4 border-b border-gray-700">
                                        <h3 className="font-semibold text-white">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <p className="p-4 text-center text-gray-400">No notifications</p>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={`p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                                                        notif.unread ? 'bg-gray-750' : ''
                                                    }`}
                                                >
                                                    <p className={`font-medium ${notif.unread ? 'text-white' : 'text-gray-300'}`}>
                                                        {notif.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="p-2 border-t border-gray-700">
                                        <button className="w-full text-center text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setUserOpen(!userOpen)}
                                className="flex items-center gap-2 p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                            >
                                {currentUser ? (
                                    <>
                                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {currentUser.name.charAt(0)}
                                        </div>
                                        <span className="hidden lg:block font-medium">{currentUser.name.split(' ')[0]}</span>
                                        <ChevronDown size={16} />
                                    </>
                                ) : (
                                    <>
                                        <User size={22} />
                                        <span className="font-medium">Guest</span>
                                    </>
                                )}
                            </button>

                            {/* User Dropdown */}
                            {userOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl">
                                    {currentUser ? (
                                        <>
                                            <div className="p-4 border-b border-gray-700">
                                                <p className="font-semibold text-white">{currentUser.name}</p>
                                                <p className="text-sm text-gray-400">{currentUser.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                    onClick={() => setUserOpen(false)}
                                                >
                                                    <User size={18} />
                                                    Profile
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                    onClick={() => setUserOpen(false)}
                                                >
                                                    <Settings size={18} />
                                                    Settings
                                                </Link>
                                            </div>
                                            <div className="border-t border-gray-700">
                                                <button className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors">
                                                    <LogOut size={18} />
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-4">
                                            <Link
                                                href="/login"
                                                className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
                                                onClick={() => setUserOpen(false)}
                                            >
                                                Sign In
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-gray-300"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-gray-700 py-2 bg-gray-800">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 text-left transition-colors font-medium ${
                                    pathname === href
                                        ? 'bg-gray-700 text-indigo-400'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}

                        {/* Mobile: Notification & User */}
                        <div className="border-t border-gray-700 mt-2 pt-2 px-4 space-y-2">
                            <button className="flex items-center gap-2 w-full text-left text-gray-300">
                                <Bell size={20} />
                                Notifications {unreadCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>}
                            </button>
                            {currentUser ? (
                                <div className="flex items-center gap-2 text-gray-300">
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {currentUser.name.charAt(0)}
                                    </div>
                                    <span>{currentUser.name.split(' ')[0]}</span>
                                </div>
                            ) : (
                                <Link href="/login" className="block text-indigo-400 font-medium">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Click outside to close dropdowns */}
            {(notifOpen || userOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setNotifOpen(false);
                        setUserOpen(false);
                    }}
                />
            )}
        </header>
    );
}