'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log('Form Data:', data);

            toast.success('User created! Mock!', {
                duration: 4000,
                position: 'bottom-center',
                style: {
                    background: '#166534',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: '500',
                },
            });
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-gray-400 text-sm">Fill in your details to get started</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div className="relative">
                            <input
                                {...register('name')}
                                type="text"
                                className={`peer w-full px-4 py-3 bg-gray-800/50 border ${
                                    errors.name ? 'border-red-500' : 'border-gray-700'
                                } rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                placeholder="Full Name"
                                disabled={isSubmitting}
                            />
                            <label
                                className={`absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm ${
                                    errors.name ? 'text-red-400' : 'text-gray-400 peer-focus:text-indigo-400'
                                }`}
                            >
                                Full Name
                            </label>
                            {errors.name && (
                                <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                                    <AlertCircle size={14} />
                                    <span>{errors.name.message}</span>
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                {...register('email')}
                                type="email"
                                className={`peer w-full px-4 py-3 bg-gray-800/50 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-700'
                                } rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                placeholder="Email"
                                disabled={isSubmitting}
                            />
                            <label
                                className={`absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm ${
                                    errors.email ? 'text-red-400' : 'text-gray-400 peer-focus:text-indigo-400'
                                }`}
                            >
                                Email Address
                            </label>
                            {errors.email && (
                                <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                                    <AlertCircle size={14} />
                                    <span>{errors.email.message}</span>
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                {...register('password')}
                                type="password"
                                className={`peer w-full px-4 py-3 bg-gray-800/50 border ${
                                    errors.password ? 'border-red-500' : 'border-gray-700'
                                } rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                placeholder="Password"
                                disabled={isSubmitting}
                            />
                            <label
                                className={`absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm ${
                                    errors.password ? 'text-red-400' : 'text-gray-400 peer-focus:text-indigo-400'
                                }`}
                            >
                                Password
                            </label>
                            {errors.password && (
                                <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                                    <AlertCircle size={14} />
                                    <span>{errors.password.message}</span>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                {...register('confirmPassword')}
                                type="password"
                                className={`peer w-full px-4 py-3 bg-gray-800/50 border ${
                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                                } rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                placeholder="Confirm Password"
                                disabled={isSubmitting}
                            />
                            <label
                                className={`absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm ${
                                    errors.confirmPassword ? 'text-red-400' : 'text-gray-400 peer-focus:text-indigo-400'
                                }`}
                            >
                                Confirm Password
                            </label>
                            {errors.confirmPassword && (
                                <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                                    <AlertCircle size={14} />
                                    <span>{errors.confirmPassword.message}</span>
                                </div>
                            )}
                        </div>

                        {/* Phone (Optional) */}
                        <div className="relative">
                            <input
                                {...register('phone')}
                                type="tel"
                                className="peer w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="Phone (Optional)"
                                disabled={isSubmitting}
                            />
                            <label className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400">
                                Phone (Optional)
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account?{' '}
                        <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}