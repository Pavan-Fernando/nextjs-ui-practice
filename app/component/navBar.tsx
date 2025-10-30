'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        {/* <Image src="/logo.svg" alt="Logo" width={40} height={40} className="invert" /> */}
                        <span className="font-bold text-xl text-white">MyApp</span>
                    </Link>

                    {/* Desktop menu */}
                    <ul className="hidden md:flex space-x-8">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`transition-colors font-medium ${
                                        pathname === href
                                            ? 'text-indigo-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-gray-300"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <ul className="md:hidden border-t border-gray-700 py-2 bg-gray-800">
                        {navLinks.map(({ href, label }) => (
                            <li key={href} className="px-2 py-1">
                                <Link
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block rounded-md px-3 py-2 transition-colors font-medium ${
                                        pathname === href
                                            ? 'bg-gray-700 text-indigo-400'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </header>
    );
}