import { apiSlice } from "./apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPost: builder.query({
            query: (args) => {
                return {
                    url: "/allpost",
                    method: "GET",
                }
            }
        }),
        getProfilePost: builder.query({
            query: (id) => {
                return {
                    url: `/profile/${id}`,
                    method: "GET"
                }
            }
        }),
        likePost: builder.mutation({
            query: credentials => ({
                url: "/likepost",
                method: "POST",
                body: { ...credentials }
            })
        }),
        getPost: builder.query({
            query: (id) => {
                return {
                    url: `/post/${id}`,
                    method: "GET"
                }
            }
        }),
        commentPost: builder.mutation({
            query: credentials => ({
                url: "/comment",
                method: "POST",
                body: { ...credentials }
            })
        }),
        CreatePost: builder.mutation({
            query: ({ Desc, media_file }) => {
                const body = new FormData();
                body.append('Content-Type', media_file.type);
                body.append('media_file', media_file[0]);
                body.append("Desc", Desc)
                return {
                    url: "/crpost",
                    method: "POST",
                    body
                }
            }
        })

    })
});

export const { useGetAllPostQuery, useGetProfilePostQuery,
    useLikePostMutation, useGetPostQuery, useCommentPostMutation,
    useCreatePostMutation } = authApiSlice;