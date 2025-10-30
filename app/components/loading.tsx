'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(false);

    return loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                {/* Option 1: Tailwind Spinner */}
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

                {/* Option 2: Lucide Spinner (install: npm install lucide-react) */}
                {/* <Spinner className="w-10 h-10 text-indigo-400" /> */}

                <p className="text-gray-300 text-sm animate-pulse">Loading...</p>
            </div>
        </div>
    ) : null;
}