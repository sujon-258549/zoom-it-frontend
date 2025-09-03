import type { TProductResponse } from "@/components/allProduct/type";
import { baseApi } from "@/redux/api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/register",
                method: "POST",
                body: userInfo,
            }),
        }),


        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            }),
        }),
        createBlog: builder.mutation({
            query: (userInfo) => ({
                url: "/blogs",
                method: "POST",
                body: userInfo,
            }),
        }),
        allBlog: builder.query({
            query: () => ({
                url: "/blogs",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        getMe: builder.query({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),

        // Category
        createCategory: builder.mutation({
            query: (userInfo) => ({
                url: "/category",
                method: "POST",
                body: userInfo,
            }),
        }),
        getAllCategory: builder.query({
            query: () => ({
                url: "/category",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),

        // Product
        createProduct: builder.mutation({
            query: (userInfo) => ({
                url: "/products",
                method: "POST",
                body: userInfo,
            }),
        }),

        getAllProduct: builder.query({
            // query: () => ({
            //     url: "/products",
            //     method: "GET",
            // }),
            // transformResponse: (response: any) => {
            //     return response;
            // },
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((element: { name: string; value: string }) => {
                        params.append(element.name, element.value);
                    });
                }
                return {
                    url: "/products",
                    method: "GET",
                    params: params,
                };
            },
            transformResponse: (response: TProductResponse) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["product"],
        }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,  //http://localhost:4000/api/products/68b7ea20941d34bc4441581a
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response;
            },
        }),



        // dashboard
        adminDashboard: builder.query({
            query: () => ({
                url: "/admin",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginMutation,
    useCreateBlogMutation,
    useAllBlogQuery,
    useGetMeQuery,
    useCreateCategoryMutation,
    useGetAllCategoryQuery,
    useCreateProductMutation,
    useGetAllProductQuery,
    useGetSingleProductQuery,
    useAdminDashboardQuery
} = authApi;