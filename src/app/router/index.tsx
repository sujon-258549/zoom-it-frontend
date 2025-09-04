import AllProduct from "@/components/allProduct/AllProduct";
import ProductDetails from "@/components/allProduct/ProductDetails";
import Home from "@/components/home/Home";
import LoginForm from "@/components/login/LoginForm";
// import LoginForm from "../../components/login/Login";
import Main from "@/components/main/Main";
import SignUp from "@/components/register/Registation";
import Shipping from "@/components/shipping/Shipping";
import CreateCategory from "@/components/sidebar/CreateCategory";
import Dashboard from "@/components/sidebar/dashboard/Dashboard";
import MainSidebar from "@/components/sidebar/MainSidebar";
import ProductCreate from "@/components/sidebar/ProductCreate";
import Profile from "@/components/sidebar/Profile";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AllUser from "@/components/sidebar/AllUser";
import AllProductTable from "@/components/sidebar/AllProductTable";


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
                path: '/product/:id',
                element: <ProductDetails />
            }
        ]
        ,

    },
    {
        path: '/login',
        element: <LoginForm
        />
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
                element: <ProtectedRoute allowedRoles={['admin', "user"]}><Dashboard /></ProtectedRoute>
            },
            {
                path: "/dashboard/create-category",
                element: <ProtectedRoute allowedRoles={['admin']}><CreateCategory /></ProtectedRoute>
            },
            {
                path: "/dashboard/create-product",
                element: <ProtectedRoute allowedRoles={['admin']}> <ProductCreate /></ProtectedRoute>
            },
            {
                path: "/dashboard/profile",
                element: <ProtectedRoute allowedRoles={['admin', "user"]}> <Profile /></ProtectedRoute>
            },
            {
                path: "/dashboard/all-user",
                element: <ProtectedRoute allowedRoles={['admin', "user"]}> <AllUser /></ProtectedRoute>
            },
            {
                path: "/dashboard/all-product-table",
                element: <ProtectedRoute allowedRoles={['admin']}> <AllProductTable /></ProtectedRoute>
            }
        ]

    },
])