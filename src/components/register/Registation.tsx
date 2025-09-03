import React, { useState } from "react";
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
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "@/redux/fetures/auth/authApi";
import { uploadProfileImage } from "../utility/imageUpload";
const SignUp = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [currentFile, setCurrentFile] = useState<File | undefined>(undefined)
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            profileImage: "",
            confirmPassword: "",
        },
    });
    const {
        formState: { isSubmitting },
    } = form;
    interface FormData {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        profileImage: string;
        confirmPassword: string;
    }
    const navigate = useNavigate()
    // Get the mutation function from the hook
    const [registerUser] = useRegisterUserMutation();
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setCurrentFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string" || reader.result === null) {
                    setImagePreview(reader.result);
                } else {
                    setImagePreview(null);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const onSubmit = async (data: FormData) => {
        console.log(currentFile);
        // Handle sign up logic here
        if (data.password !== data.confirmPassword) {
            form.setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
            return;
        }
        const toastId = toast.loading("Registering...", { duration: 2000 });
        // let imageUrl = "";
        // if (profileImage) {
        //     imageUrl = await uploadImageToCloudinary(profileImage);
        // }

        let imageUrl = "";
        if (currentFile) {
            imageUrl = await uploadProfileImage(currentFile);
        }


        try {

            const registrationData = {
                name: `${data.firstName} ${data.lastName || ""}`.trim(),
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber,
                profileImage: imageUrl,
                role: "user",
                isBlocked: false,
            };

            const res = await registerUser(registrationData).unwrap();

            if (res.success) {
                toast.success(res.message || "Registration successful!", {
                    id: toastId,
                    duration: 2000,
                });
                setTimeout(() => navigate("/login"), 2000); // Redirect after success
            } else {
                throw new Error(res.message || "Registration failed");
            }
        } catch (error: any) {
            console.error("Registration error:", error);

            // Handle MongoDB duplicate key error (email already exists)
            if (error?.code === 11000 || error?.err?.code === 11000) {
                toast.error("Email already registered. Please use a different email.", {
                    id: toastId,
                    duration: 4000,
                });
            }
            // Handle API error response
            else if (error?.data?.message) {
                toast.error(error.data.message, { id: toastId, duration: 4000 });
            }
            // Generic fallback
            else {
                toast.error(
                    error.message || "Something went wrong. Please try again.",
                    {
                        id: toastId,
                        duration: 4000,
                    }
                );
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 border border-black sm:px-6 lg:px-8">
            <div style={{ boxShadow: "1px 1px 10px" }} className="max-w-lg shadow-cyan-900 w-full space-y-8 bg-white p-8 rounded-sm shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-cyan-800">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <a
                            href="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            sign in to your existing account
                        </a>
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex space-x-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Enter your first name"
                                                {...field}
                                                className="rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Enter your last name"
                                                {...field}
                                                className="rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            required
                                            placeholder="Enter your email address"
                                            {...field}
                                            className="rounded-md"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        We'll never share your email with anyone else.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            required
                                            placeholder="Enter your phone number"
                                            {...field}
                                            className="rounded-md"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        We'll use this for account verification.
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
                                            <Input
                                                required
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Create a password"
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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                required
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm your password"
                                                {...field}
                                                className="rounded-md pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profileImage"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Profile Image</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col items-start">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="rounded-md"
                                            />
                                            {imagePreview && (
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium mb-2">Image Preview:</p>
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="max-h-60 w-full rounded-md object-contain"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        A nice profile image makes your account more personal.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="terms"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms and Conditions</a>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            {isSubmitting ? "Loading......" : "Sign up"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;