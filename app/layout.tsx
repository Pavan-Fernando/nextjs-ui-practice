// app/layout.tsx
import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import './globals.css';
import {Toaster} from "react-hot-toast";

export const metadata: Metadata = {
    title: 'MyApp',
    description: 'Dark-themed Next.js App with loading states',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
        <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <ClientLayout>{children}</ClientLayout>
        {/* Toast container */}
        <Toaster position="top-right" reverseOrder={false} />
        </body>
        </html>
    );
}