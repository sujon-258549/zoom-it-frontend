import AllProduct from "@/components/allProduct/AllProduct";
import ProductDetails from "@/components/allProduct/ProductDetails";
import Home from "@/components/home/Home";
import Login from "@/components/login/Login";
import Main from "@/components/main/Main";
import SignUp from "@/components/register/Registation";
import Shipping from "@/components/shipping/Shipping";
import CreateCategory from "@/components/sidebar/CreateCategory";
import Dashboard from "@/components/sidebar/Dashboard";
import MainSidebar from "@/components/sidebar/MainSidebar";
import ProductCreate from "@/components/sidebar/ProductCreate";
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
            },
            {
                path: '/product-details',
                element: <ProductDetails />
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
                path: "/dashboard/create-category",
                element: <CreateCategory />
            },
            {
                path: "/dashboard/create-product",
                element: <ProductCreate />
            }
        ]

    },
])