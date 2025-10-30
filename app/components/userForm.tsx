'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email'),
    role: z.enum(['Admin', 'Editor', 'User']),
    status: z.enum(['Active', 'Inactive']),
    phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface UserFormProps {
    user?: FormData & { id: number };
    onSubmit: (data: FormData) => void;
    isSubmitting: boolean;
}

export default function UserForm({ user, onSubmit, isSubmitting }: UserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: user || { role: 'User', status: 'Active' },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                    {...register('name')}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                        errors.name ? 'border-red-500' : 'border-gray-700'
                    } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                    {...register('email')}
                    type="email"
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                        errors.email ? 'border-red-500' : 'border-gray-700'
                    } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            {/* Role & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select
                        {...register('role')}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="User">User</option>
                        <option value="Editor">Editor</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                        {...register('status')}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone (Optional)</label>
                <input
                    {...register('phone')}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Saving...
                    </>
                ) : (
                    'Save Changes'
                )}
            </button>
        </form>
    );
}