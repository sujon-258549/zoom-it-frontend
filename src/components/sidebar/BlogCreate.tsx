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
import { Textarea } from "@/components/ui/textarea";

const BlogCreate = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  interface FormData {
    title: string;
    description: string;
    image: FileList | null;
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle blog creation logic here
    // You would typically send this data to your backend API
  };

  const handleImageChange = (e : any) => {
    const file = e.target.files[0];
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

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div 
        style={{boxShadow: "1px 1px 10px"}} 
        className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#c70e0e]">
            Create a New Blog Post
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Share your thoughts and ideas with the world
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter a captivating title"
                      {...field}
                      className="rounded-md"
                    />
                  </FormControl>
                  <FormDescription>
                    This will be the main headline of your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Content</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Write your blog content here..."
                      {...field}
                      className="rounded-md min-h-[200px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Share your ideas, stories, or expertise with your readers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-start">
                      <Input
                        type="file"
                        accept="image/*"
                        {...fieldProps}
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleImageChange(e);
                        }}
                        className="rounded-md"
                      />
                      {imagePreview && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Image Preview:</p>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="max-h-60 rounded-md object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    A compelling image can make your blog post more engaging.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
            >
              Publish Blog Post
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BlogCreate;