import './nav.css'
import { Button } from "@/components/ui/button"
import { FaShoppingBag } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '@/redux/fetures/hooks'
import { userCurrentUser } from '@/redux/fetures/auth/authSlice'
import DropdownMenu from '../navbarAndFooter/Dropdown'
import MotionButton from '../MotionButton'
import { useEffect, useState } from 'react'
import { orderSelector } from '@/redux/fetures/card/shippingSlice'

const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/all-product", label: "All Product" },
]

export default function Navbar() {
    useEffect(() => {

        const session = sessionStorage.getItem("login");
        if (session === "true") {
            sessionStorage.removeItem("login");
            window.location.reload();
        }
    }, []);
    const user = useAppSelector(userCurrentUser)
    //   @ts-expect-error
    const email = user?.userInfo?.email
    const productLength = useAppSelector(orderSelector)
    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <section className='border-b px-4 sticky top-0 z-40 md:px-8 bg-cyan-900'>
            <header className="max-w-6xl mx-auto lg:px-3">
                <div className="flex h-16 items-center justify-between">

                    {/* Left: Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="w-[100px]" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-4">
                        {navigationLinks.map((link, i) => (
                            <NavLink
                                key={i}
                                to={link.href}
                                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right: Auth Buttons + Mobile Hamburger */}
                    <div className="flex items-center gap-2">
                        <Link to="/shipping" className="relative inline-flex items-center">
                            {/* Shopping Bag Icon */}
                            <FaShoppingBag className="text-2xl mr-2 text-white" />

                            {/* Badge */}
                            <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {productLength.length}
                            </span>
                        </Link>


                        {email ? <DropdownMenu /> : <Link to='/login'><MotionButton text="Login" /></Link>}

                        {/* Mobile Hamburger */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    // Close (X) icon
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    // Hamburger icon
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </Button>


                            {/* Mobile Menu */}
                            {isMobileMenuOpen && (
                                <div className="absolute top-16 right-0 w-64 h-[100vh] bg-cyan-900 shadow-md flex flex-col p-4 gap-2 z-50">
                                    {navigationLinks.map((link, i) => (
                                        <NavLink
                                            key={i}
                                            to={link.href}
                                            className={({ isActive }) =>
                                                `block px-3 py-2 rounded-md text-white ${isActive ? "bg-cyan-700" : ""}`
                                            }
                                            onClick={() => setIsMobileMenuOpen(false)} // close menu on link click
                                        >
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </header>
        </section>
    )
}


//  add code 