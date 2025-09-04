import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BiSolidCategory } from "react-icons/bi";
// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "../common/loding/Loading";
import LoadingPage from "../common/loding/LoadingPage";

// API Hooks
import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery
} from "@/redux/fetures/auth/authApi";

// Utilities
import { uploadProfileImage } from "../utility/imageUpload";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
interface CategoryFormValues {
  name: string;
  slug: string;
  image?: File;
}

export interface TCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const CreateCategory: React.FC = () => {
  // State Management
  const [preview, setPreview] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const categorySchema = z.object({
    name: z.string().min(1, "name is requeued"),
    slug: z.string().min(1, "slug is requeued"),
  });


  // Hooks

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const { data: categories, isLoading: isLoadingCategories } = useGetAllCategoryQuery('');

  // Form Setup
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      image: undefined,
    },
    mode: "onChange",
  });

  // Handlers
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setCurrentFile(file);
      form.setValue("image", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  }, [form]);

  const handleSubmit = async (data: CategoryFormValues) => {
    const toastId = toast.loading("Creating category...");

    try {
      let imageUrl = "";

      // Upload image if provided
      if (currentFile) {
        imageUrl = await uploadProfileImage(currentFile);
      }

      // Create category
      const result = await createCategory({
        ...data,
        image: imageUrl
      }).unwrap();

      if (result.success) {

        toast.success("Category created successfully!", { id: toastId });
      }
      // Success handling

      // Reset form and close dialog
      form.reset();
      setPreview(null);
      setCurrentFile(undefined);
      setIsDialogOpen(false);



    } catch (error: any) {
      // Error handling
      console.error("Category creation failed:", error);

      const errorMessage = error?.data?.message ||
        error.message ||
        "Category creation failed. Please try again.";

      toast.error(errorMessage, { id: toastId });
    }
  };

  // Loading state
  if (isLoadingCategories) {
    return <LoadingPage />;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
          <p className="text-gray-600 mt-1">
            Manage your product categories
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className=" text-white cursor-pointer">

              <BiSolidCategory className="mr-2 " /> Add Category
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new category for your products.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mt-4 space-y-4"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  rules={{
                    required: "Category name is required",
                    minLength: {
                      value: 2,
                      message: "Category name must be at least 2 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter category name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug Field */}
                <FormField
                  control={form.control}
                  name="slug"
                  rules={{
                    required: "Slug is required",
                    pattern: {
                      value: /^[a-z0-9-]+$/,
                      message: "Slug can only contain lowercase letters, numbers, and hyphens"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter slug (e.g., electronics)"

                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Field */}
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Category Image</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="cursor-pointer"
                          />
                          <p className="text-sm text-gray-500">
                            Recommended: Square image, max 5MB
                          </p>
                        </div>
                      </FormControl>
                      {preview && (
                        <div className="mt-2">
                          <img
                            src={preview}
                            alt="Preview"
                            className="h-24 w-24 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full text-white cursor-pointer"
                  disabled={isCreating}
                >
                  {isCreating ? <Loading /> : "Create Category"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {categories?.length > 0 ? (
                categories.map((category: TCategory, index: number) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-12 w-12 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg">No categories found</p>
                      <p className="text-sm mt-1">
                        Create your first category to get started
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;