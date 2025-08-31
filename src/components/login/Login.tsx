import React from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/fetures/auth/authApi";
import { verifyToken } from "../utility/varefyToken";
import { useAppDispatch } from "@/redux/fetures/hooks";
import { setUser } from "@/redux/fetures/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const form = useForm({
        defaultValues: {
            username: "johndoe@example.com",
            password: "hashed_password_here",
        },
    });
    const dispatch = useAppDispatch()
    interface FormData {
        username: string,
        password: string
    }

    const [userLogin] = useLoginMutation()
    const navigate = useNavigate()
    const onSubmit = async (data: FormData) => {
        const toastId = toast.loading("Logging in...", { duration: 2000 });
        console.log(data)
        try {
            const repelsData = {
                email: data?.username,
                password: data?.password
            }
            const res = await userLogin(repelsData).unwrap();

            console.log(res)

            if (!res.data?.token) {
                throw new Error(
                    res.data?.message || "Login failed. No access token received."
                );
            }

            const userInfo = verifyToken(res.data.token);

            if (!userInfo) {
                throw new Error("Invalid token. Please try again.");
            }

            dispatch(
                setUser({
                    user: { userInfo },
                    token: res.data.token,
                })
            );
            sessionStorage.setItem("accessToken", res.data.token);
            toast.success("Login successful!", { id: toastId });
            navigate("/dashboard", { replace: true }); // Prevents going back to login
        } catch (error: any) {
            console.error("Login failed:", error);
            const errorMessage =
                error?.data?.message ||
                error.message ||
                "Login failed. Please try again.";
            toast.error(errorMessage, { id: toastId });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 border border-black sm:px-6 lg:px-8">

            <div style={{ boxShadow: "1px 1px 10px" }} className="max-w-md shadow-cyan-900 w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-cyan-800">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <a
                            href="/signup"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            create a new account
                        </a>
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" required
                                            placeholder="Enter your username or email"
                                            {...field}
                                            className="rounded-md"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your unique identifier.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input required
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                {...field}
                                                className="rounded-md pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Must be at least 8 characters long.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full  text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            Sign in
                        </Button>
                    </form>
                </Form>


            </div>
        </div>
    );
};

export default Login;