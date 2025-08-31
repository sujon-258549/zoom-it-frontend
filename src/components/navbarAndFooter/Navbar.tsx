import './nav.css'

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LogIn } from 'lucide-react'
import { NavLink } from 'react-router-dom'

// Navigation links
const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/all-product", label: "All Product" },
]

export default function Navbar() {
    return (
        <section className='border-b px-4 md:px-8 bg-cyan-900 '>

            <header className="max-w-5xl mx-auto">
                <div className="flex h-16 items-center justify-between">
                    {/* Left: Logo */}
                    <a href="/" className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="w-[100px]" />
                    </a>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="flex gap-2">
                            {navigationLinks.map((link, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavLink
                                        to={link.href}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? "active" : ""}`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-9">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-40 p-2">
                                <NavigationMenu>
                                    <NavigationMenuList className="flex flex-col gap-1">
                                        {navigationLinks.map((link, index) => (
                                            <NavLink
                                                key={index}
                                                to={link.href}
                                                className={({ isActive }) =>
                                                    `nav-link block rounded-md px-3 py-2 text-sm ${isActive ? "active" : ""
                                                    }`
                                                }
                                            >
                                                {link.label}
                                            </NavLink>
                                        ))}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Right: Auth Buttons */}
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" className="text-sm">
                            <a href="/login"> Login <LogIn/></a>
                        </Button>
                    </div>
                </div>
            </header>
        </section>
    )
}
