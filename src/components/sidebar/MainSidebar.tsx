import { useState } from "react";
import { FiHome, FiX, FiMenu, FiFileText, FiBook } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import { useGetMeQuery } from "@/redux/fetures/auth/authApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaHome } from "react-icons/fa";

const MainSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const menuItems = [
        {
            icon: <FiHome className="w-5 h-5" />,
            label: "Dashboard",
            href: "/dashboard"
        },
        {
            icon: <FiBook className="w-5 h-5" />,
            label: "Create Category",
            href: "/dashboard/create-category"
        },
        {
            icon: <FiFileText className="w-5 h-5" />,
            label: "Create product",
            href: "/dashboard/create-product"
        },
    ];

    const { data: meData } = useGetMeQuery("");
    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                {!isSidebarOpen && (
                    <Button
                        className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-md"
                        type="button"
                        onClick={toggleSidebar}
                        aria-expanded={isSidebarOpen}
                        aria-controls="drawer-navigation"
                    >
                        {isSidebarOpen ? (
                            <FiX className="inline mr-2" />
                        ) : (
                            <FiMenu className="inline mr-2" />
                        )}
                        {isSidebarOpen ? 'Hide navigation' : 'Show navigation'}
                    </Button>
                )}
            </div>

            {/* Sidebar */}
            <div
                id="drawer-navigation"
                className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-gradient-to-b from-cyan-800 to-cyan-950 dark:from-cyan-900 dark:to-cyan-800 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 shadow-lg`}
                tabIndex={-1}
                aria-labelledby="drawer-navigation-label"
                aria-modal={isSidebarOpen ? "true" : "false"}
                aria-hidden={!isSidebarOpen}
            >
                <div className="flex items-center justify-between mb-6 pt-2">
                    <Link to={'/'}>       <h5
                        id="drawer-navigation-label"
                        className="text-white flex gap-2 items-center dark:text-cyan-100 font-bold text-lg uppercase tracking-wide"
                    >

                        <FaHome  className="text-3xl"/>  Navigation Menu
                    </h5></Link>
                    <button
                        type="button"
                        onClick={closeSidebar}
                        className="text-cyan-700 bg-cyan-200 hover:bg-cyan-300 rounded-lg p-1.5 inline-flex items-center dark:text-cyan-100 dark:bg-cyan-700 dark:hover:bg-cyan-600 transition-colors lg:hidden"
                        aria-label="Close menu"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-3">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="flex items-center p-3 text-cyan-900 rounded-lg dark:text-cyan-50 bg-white dark:bg-cyan-700 shadow-sm hover:shadow-md hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-600 transition-all duration-300 group"
                                    onClick={closeSidebar}
                                >
                                    <span className="text-cyan-600 dark:text-cyan-300 transition duration-300 group-hover:text-white">
                                        {item.icon}
                                    </span>
                                    <span className="ms-3 font-medium">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    
                </div>
                <div className="absolute bottom-4 left-4 text-cyan-600 dark:text-cyan-400 text-xs">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-white/20">
                            <AvatarImage src={meData?.profileImage || "https://github.com/shadcn.png"} />
                            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-cyan-600">
                                {meData?.name ? meData.name.charAt(0).toUpperCase() : "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">{meData?.name || "User"}</span>
                            <span className="text-xs text-gray-400">{meData?.email || "user@example.com"}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Main content area */}
            <div className="lg:ml-64 p-5 lg:mt-0 mt-16 min-h-screen bg-cyan-50 dark:bg-cyan-950/20">
                <Outlet />
            </div>
        </>
    );
};

export default MainSidebar;