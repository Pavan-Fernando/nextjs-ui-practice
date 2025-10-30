import type { Metadata } from 'next';
import Navbar from '../app/component/navBar';
import './globals.css';

export const metadata: Metadata = {
    title: 'My Next.js App',
    description: 'A modern Next.js site with a responsive navbar',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-gray-50">
        <Navbar />
        {children}
        </body>
        </html>
    );
}