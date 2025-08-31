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
    }),
});

export const {
    useRegisterUserMutation,
    useLoginMutation,
    useCreateBlogMutation,
    useAllBlogQuery
} = authApi;