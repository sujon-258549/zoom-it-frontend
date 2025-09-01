import AllProduct from "@/components/allProduct/AllProduct";
import Home from "@/components/home/Home";
import Login from "@/components/login/Login";
import Main from "@/components/main/Main";
import SignUp from "@/components/register/Registation";
import Shipping from "@/components/shipping/Shipping";
import BlogCreate from "@/components/sidebar/BlogCreate";
import Dashboard from "@/components/sidebar/Dashboard";
import MainSidebar from "@/components/sidebar/MainSidebar";
import StackCard from "@/components/sidebar/StackCard";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/all-product',
                element: <AllProduct />
            },
            {
                path: '/shipping',
                element: <Shipping />
            }
        ]
        ,

    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: "/dashboard",
        element: <MainSidebar></MainSidebar>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "create-blog",
                element: <BlogCreate />
            },
            {
                path: "blog",
                element: <StackCard />
            }
        ]

    },
])