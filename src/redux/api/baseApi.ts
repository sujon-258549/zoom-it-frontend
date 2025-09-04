
import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../fetures/store"; // Adjust the import path as needed
// import { setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://backend-nu-cyan.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth?.token;
        console.log(token)
        if (token) {
            headers.set("authorization", `${token}`);
        }
        return headers;
    },
});



export const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: ["product"],
    baseQuery: baseQuery,
    endpoints: () => ({}),
});