
'use client';

import type { Metadata } from 'next';
import Navbar from '@/app/components/navBar';
import './globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from "@/app/components/loading";

export const metadata: Metadata = {
    title: 'My Next.js App',
    description: 'A modern Next.js site with a responsive navbar',
};

export default function ClientLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        // Listen to route change events
        router.events?.on('routeChangeStart', handleStart);
        router.events?.on('routeChangeComplete', handleComplete);
        router.events?.on('routeChangeError', handleComplete);

        return () => {
            router.events?.off('routeChangeStart', handleStart);
            router.events?.off('routeChangeComplete', handleComplete);
            router.events?.off('routeChangeError', handleComplete);
        };
    }, [router]);

    return (
        <>
            {/* Global Loading Overlay */}
            {loading && <LoadingScreen />}
            <Navbar />
            <main>{children}</main>
        </>
    );
}