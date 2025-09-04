import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import Loading from "../common/loding/Loading";

import { useLoginMutation } from "../../redux/fetures/auth/authApi";
import { useAppDispatch } from "../../redux/fetures/hooks";
import { setUser } from "../../redux/fetures/auth/authSlice";
import { verifyToken } from "../utility/varefyToken";
import { loginSchema } from "./login";

interface FormData {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [demoUser, setDemoUser] = useState<FormData>({ email: "", password: "" });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userLogin] = useLoginMutation();

    const form = useForm<FormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: demoUser,
    });

    const { formState: { isSubmitting }, reset } = form;

    const onSubmit = async (data: FormData) => {
        const toastId = toast.loading("Logging in...", { duration: 2000 });

        try {
            const res = await userLogin({ email: data.email, password: data.password }).unwrap();

            if (!res.data?.token) throw new Error("Login failed. No access token received.");

            const userInfo = verifyToken(res.data.token);
            if (!userInfo) throw new Error("Invalid token. Please try again.");

            dispatch(setUser({ user: { userInfo }, token: res.data.token }));
            sessionStorage.setItem("accessToken", res.data.token);

            toast.success("Login successful!", { id: toastId });
            navigate("/dashboard", { replace: true });
        } catch (error: any) {
            console.error("Login failed:", error);
            toast.error(error?.data?.message || error.message || "Login failed. Please try again.", { id: toastId });
        }
    };

    const fillDemoUser = (role: "admin" | "user") => {
        const demoCredentials: Record<string, FormData> = {
            admin: { email: "johndoe@example.com", password: "hashed_password_here" },
            user: { email: "sujon11@gmail.com", password: "Pa$$w0rd!" },
        };
        const demo = demoCredentials[role];
        setDemoUser(demo);
        reset(demo); // fill form
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md" style={{ boxShadow: "1px 1px 10px" }}>
                <h2 className="text-center text-3xl font-extrabold text-cyan-800">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        create a new account
                    </a>
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormDescription>Your unique identifier.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} className="pr-10" />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                            </button>
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full text-white cursor-pointer">
                            {isSubmitting ? <Loading /> : "Sign In"}
                        </Button>
                        <div className="flex items-center -mb-[1px] -mt-3">
                            <div className="border-t border-1 border-cyan-700 flex-grow"></div>
                            <div className="px-3 text-cyan-700 font-bold text-2xl">OR</div>
                            <div className="border-t border-1 border-cyan-700 flex-grow"></div>
                        </div>
                        {/* Demo Buttons */}
                        <div className="flex flex-wrap justify-between mt-2">
                            <Button className="text-white cursor-pointer" onClick={() => fillDemoUser("admin")}>Demo Admin</Button>
                            <Button className="text-white cursor-pointer" onClick={() => fillDemoUser("user")}>Demo User</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
