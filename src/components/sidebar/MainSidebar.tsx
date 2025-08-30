import { useState } from "react";
import {
    FiHome,
    FiGrid,

    FiX,
    FiMenu
} from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { Button } from "../ui/button";

const MainSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };



    const menuItems = [
        { icon: <FiHome className="w-5 h-5" />, label: "Dashboard", href: "/dashboard/create-blog" },
        { icon: <FiGrid className="w-5 h-5" />, label: "Create Blog", href: "/dashboard/create-blog", },
        { icon: <FiGrid className="w-5 h-5" />, label: "All Blog", href: "/dashboard/blog", },

    ];

    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                {!isSidebarOpen && <Button
                    className=""
                    type="button"
                    onClick={toggleSidebar}
                    aria-expanded={isSidebarOpen}
                    aria-controls="drawer-navigation"
                >
                    {isSidebarOpen ? <FiX className="inline mr-2" /> : <FiMenu className="inline mr-2" />}
                    {isSidebarOpen ? 'Hide navigation' : 'Show navigation'}
                </Button>}
            </div>




            {/* Sidebar */}
            <div
                id="drawer-navigation"
                className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-[#d3d1d1] dark:bg-gray-800 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
                tabIndex={-1}
                aria-labelledby="drawer-navigation-label"
                aria-modal={isSidebarOpen ? "true" : "false"}
                aria-hidden={!isSidebarOpen}
            >
                <div className="flex items-center  justify-between mb-3">
                    <h5
                        id="drawer-navigation-label"
                        className="ml-3 -mb-5 font-semibold text-gray-500 uppercase dark:text-gray-400"
                    >
                        Menu
                    </h5>
                    <div className="flex items-center">

                        <button
                            type="button"
                            onClick={closeSidebar}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white lg:hidden"
                            aria-label="Close menu"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors"
                                    onClick={closeSidebar}
                                >
                                    <span className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                        {item.icon}
                                    </span>
                                    <span className="ms-3">{item.label}</span>

                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="lg:ml-80 p-5 lg:mt-0 mt-16">
                <Outlet />
            </div>
        </>
    );
};

export default MainSidebar;