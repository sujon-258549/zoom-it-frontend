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
            query: () => ({
                url: "/products",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                return response;
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
    useGetAllProductQuery
} = authApi;