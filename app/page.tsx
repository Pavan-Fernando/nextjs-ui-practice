import { Users, DollarSign, Folder, CheckCircle } from "lucide-react";

export default function DashboardPage() {
    const cards = [
        { title: "Users", value: "2,540", icon: <Users className="w-6 h-6 text-blue-500" /> },
        { title: "Revenue", value: "$12,000", icon: <DollarSign className="w-6 h-6 text-green-500" /> },
        { title: "Projects", value: "28", icon: <Folder className="w-6 h-6 text-purple-500" /> },
        { title: "Tasks", value: "136", icon: <CheckCircle className="w-6 h-6 text-orange-500" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-600 p-8">
            <h1 className="text-2xl font-semibold mb-6 text-white text-center">
                Dashboard Overview
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 opacity-90"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-blue-300 text-sm font-bold">{card.title}</h2>
                                <p className="text-gray-200 text-2xl font-semibold mt-1">{card.value}</p>
                            </div>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
