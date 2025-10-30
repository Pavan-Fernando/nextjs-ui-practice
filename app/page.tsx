'use client';

import { Users, DollarSign, Folder, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const stats = [
        { title: 'Total Users', value: 2540, icon: Users, color: 'blue', change: '+12%' },
        { title: 'Revenue', value: 12000, icon: DollarSign, color: 'green', change: '+8%' },
        { title: 'Projects', value: 28, icon: Folder, color: 'purple', change: '+3%' },
        { title: 'Completed Tasks', value: 136, icon: CheckCircle, color: 'orange', change: '+22%' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-6 md:p-8">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-400 text-lg">Real-time insights into your system</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Animated Counter Hook
function useAnimatedCounter(target: number, duration = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start > target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);

    return count;
}

// Reusable Stat Card
function StatCard({
                      title,
                      value,
                      icon: Icon,
                      color,
                      change,
                  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    change: string;
}) {
    const count = useAnimatedCounter(value);
    const formatted = value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString();
    const displayValue = value >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toLocaleString();

    const colorMap = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        orange: 'from-orange-500 to-orange-600',
    };

    const textColor = {
        blue: 'text-blue-400',
        green: 'text-green-400',
        purple: 'text-purple-400',
        orange: 'text-orange-400',
    };

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gray-900/70 backdrop-blur-xl border border-gray-800 p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-700">
            {/* Gradient Orb Background */}
            <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${colorMap[color]} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`}
            />

            <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-white">
                        {value > 999 ? displayValue : count}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className={`text-xs font-semibold ${textColor[color]}`}>{change}</span>
                        <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                </div>

                {/* Icon with Gradient */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[color]} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>

            {/* Bottom Glow Line */}
            <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${colorMap[color]} opacity-50 group-hover:opacity-100 transition-opacity`} />
        </div>
    );
}