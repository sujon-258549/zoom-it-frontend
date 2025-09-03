import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "../utility/imageUpload";
import { X, Upload, Plus, Check } from "lucide-react";
import { MultiSelect } from "react-multi-select-component";
import { useCreateProductMutation, useGetAllCategoryQuery } from "@/redux/fetures/auth/authApi";
import LoadingPage from "../common/loding/LoadingPage";

export interface TProduct {
  _id: string;
  name: string;
  slug: string;
  photos: string[];
  description: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: "active" | "inactive";
  categories: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const ProductCreate = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm();
  const [createProduct] = useCreateProductMutation();
  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoryQuery('');
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  console.log('options', options)
  // console.log('options2',options2)
  useEffect(() => {
    if (!categoriesData) return;

    const mapped = categoriesData.map((cat: { name: any; _id: any; }) => ({
      label: cat.name,
      value: cat._id,
    }));

    setOptions(mapped);
  }, [categoriesData]);

  if (categoriesLoading) {
    return <LoadingPage />
  }
  console.log(selected)



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select only image files');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...validFiles.map(file => URL.createObjectURL(file))]);
    e.target.value = ''; // Reset input to allow selecting same files again
  };



  const removeImage = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]); // Clean up memory
      return prev.filter((_, i) => i !== index);
    });
  };
  console.log(previews.length)
    ;

  const onSubmit = async (data: any) => {
    // console.log("stockStatus",data?.stockStatus)
    if (files.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }
    if (data.stockStatus === undefined) {
      toast.error("Please select stock status");
      return;
    }
    console.log(data.status)
    if (data.status === undefined) {
      toast.error("Please select status");
      return;
    } 



    const categoryData = selected.map((s: any) => s.value)

    if (categoryData.length === 0) {
      toast.error("Please select category");
      return;
    }


    try {
      setIsUploading(true);
      const toastId = toast.loading("Creating product...");

      // Upload images
      const photoUrls: string[] = [];
      for (const file of files) {
        const url = await uploadProfileImage(file);
        photoUrls.push(url);
      }
      console.log(data)

      const discountedPrice = (Number(data.price) * Number(data.discount || 0)) / 100
      const discountAmount = (Number(data.price) - discountedPrice)

      const productData = {
        name: data.name,                   // Product name
        slug: data.slug,                     // SEO-friendly slug
        photos: photoUrls,                  // Multiple photos (array of image URLs)
        description: data.description,            // Product description
        price: Number(data.price),                   // Product price
        discount: discountAmount,               // Optional discount (percentage or fixed value)
        stockStatus: data.stockStatus === "true" ? true : false,         // In stock or not (true/false)
        status: data.status,
        categories: categoryData

      };
      // console.log(productData)
      const res = await createProduct(productData).unwrap();
      if (res.success === true) {

        toast.success(res.message || "Product created successfully!", { id: toastId });
      }
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Product creation failed:", err);
      toast.error(err.data?.message || "Failed to create product.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4 shadow-md">
          <Plus className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Create New Product</h2>
          <p className="text-gray-500">Add a new product to your inventory</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="h-5 w-5 bg-blue-500 rounded mr-2"></div>
                  Product Information
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Product name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Product Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter product name"
                            className="focus:ring-2 focus:ring-blue-500 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Slug */}
                  <FormField
                    control={form.control}
                    name="slug"
                    rules={{ required: "Slug is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Slug *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="product-slug"
                            className="focus:ring-2 focus:ring-blue-500 h-11"
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Unique identifier for the product URL
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    rules={{ required: "Description is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter product description..."
                            rows={4}
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Pricing Section */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="h-5 w-5 bg-green-500 rounded mr-2"></div>
                  Pricing
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    rules={{
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Price ($) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            placeholder="Enter price"
                            className="focus:ring-2 focus:ring-blue-500 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Discount */}
                  <FormField
                    control={form.control}
                    name="discount"
                    rules={{
                      min: { value: 0, message: "Discount cannot be negative" },
                      max: { value: 100, message: "Discount cannot exceed 100%" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Discount (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="0-100"
                            className="focus:ring-2 focus:ring-blue-500 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Image Upload Section */}

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">

                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="h-5 w-5 bg-amber-500 rounded mr-2"></div>
                  Product Images
                </h3>

                {/* Upload area */}
                {previews.length <= 2 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-white">
                    <input
                      type="file"
                      id="product-images"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <label htmlFor="product-images" className="cursor-pointer block">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Upload className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">Drag & drop images here</p>
                          <p className="text-sm text-gray-500">or click to browse files</p>
                        </div>
                        <p className="text-xs text-gray-400">Supports JPG, PNG up to 5MB each</p>
                      </div>
                    </label>

                  </div>
                )}
                {/* Image Previews */}
                {previews.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Selected Images ({previews.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {previews.map((src, idx) => (
                        <div key={idx} className="relative group">
                          <div className="aspect-square overflow-hidden rounded-lg border">
                            <img
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>


            </div>

            {/* Right Column - Settings */}
            <div className="space-y-6">
              {/* Status Section */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="h-5 w-5 bg-purple-500 rounded mr-2"></div>
                  Status
                </h3>

                <div className="space-y-4">
                  {/* Stock Status */}
                  <FormField
                    control={form.control}
                    name="stockStatus"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700 font-medium">Stock Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id="in-stock" />
                              <label htmlFor="in-stock" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                In Stock
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id="out-of-stock" />
                              <label htmlFor="out-of-stock" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                                Out of Stock
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Product Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Product Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="focus:ring-2 focus:ring-blue-500 h-11">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                Active
                              </div>
                            </SelectItem>
                            <SelectItem value="inactive">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-gray-500 mr-2"></div>
                                Inactive
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* select */}
              <p className="text-sm font-semibold">select Category</p>
              <div className="w-full ">
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </div>

              {/* Action Buttons */}
              <div className="sticky top-6 space-y-4">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Publish</h3>
                  <div className="flex flex-col space-y-3">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="cursor-pointer text-white"
                      size="lg"
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Product...
                        </>
                      ) : (
                        <>Create Product</>
                      )}
                    </Button>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductCreate;