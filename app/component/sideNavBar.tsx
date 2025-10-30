// "use client";
//
// import { useState } from "react";
// import { Home, Users, Folder, Settings, Menu } from "lucide-react";
//
//
// export default function  SideNavBar(){
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//
//     const menuItems = [
//         { name: "Home", icon: <Home className="w-5 h-5" /> },
//         { name: "Users", icon: <Users className="w-5 h-5" /> },
//         { name: "Projects", icon: <Folder className="w-5 h-5" /> },
//         { name: "Settings", icon: <Settings className="w-5 h-5" /> },
//     ];
//     return (
//         <div className="flex min-h-screen bg-black-100">
//             {/* Sidebar */}
//             <div
//                 className={`bg-black p-4 shadow-md transition-all duration-300 ${
//                     isSidebarOpen ? "w-64" : "w-16"
//                 }`}
//             >
//                 <button
//                     className="mb-6 p-2 rounded hover:bg-blue-700"
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 >
//                     <Menu className="w-5 h-5" />
//                 </button>
//
//                 <ul className="space-y-4">
//                     {menuItems.map((item) => (
//                         <li
//                             key={item.name}
//                             className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
//                         >
//                             {item.icon}
//                             {isSidebarOpen && <span>{item.name}</span>}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//
//             {/* Main content */}
//             <div className="flex-1 flex flex-col">
//                 {/* Navbar */}
//                 <div className="bg-black p-4 shadow flex justify-between items-center">
//                     <h1 className="font-bold text-xl">Dashboard</h1>
//                     <div className="flex items-center gap-3">
//                         <span className="hidden sm:block">Pavan Fernando</span>
//                         <img
//                             src="https://via.placeholder.com/32"
//                             alt="Avatar"
//                             className="w-8 h-8 rounded-full"
//                         />
//                     </div>
//                 </div>
//
//                 {/* Content */}
//                 <div className="p-6">{children}</div>
//             </div>
//         </div>
//     );
//
// }