import Login from "@/components/login/Login";
import Main from "@/components/main/Main";
import SignUp from "@/components/register/Registation";
import BlogCreate from "@/components/sidebar/BlogCreate";
import MainSidebar from "@/components/sidebar/MainSidebar";
import StackCard from "@/components/sidebar/StackCard";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {

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
        children:[
            {
                path:"create-blog",
                element : <BlogCreate/>
            },
            {
                path:"blog",
                element : <StackCard/>
            }
        ]

    },
])