import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DROPMAGNET_SERVER_URL } from '../../config/constants'



export const DropApi = createApi({
    reducerPath: 'categories',
    baseQuery: fetchBaseQuery({ baseUrl: DROPMAGNET_SERVER_URL }),
    endpoints: (builder) => ({
        fetchUserProfile: builder.query({
            query: ({ token, userId }) => ({
                url: `/profiles/${userId}`,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
        }),


        getCategories: builder.query({
            query: () => `/categories`,
        }),

        fetchCategoryDrops: builder.query({
            query: ({ token, userId, time }) => ({
                url: `/drops?user_id=${userId}&index=${time}`,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
        }),

        fetchUserSavedDrops: builder.query({
            query: ({ token, symbol }) => ({
                url: `/drops/saved?symbol=${symbol}`,
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
        }),

        saveSwipedDrop: builder.mutation({
            query: ({token, dropId}) => ({
                url: `/drops/${dropId}/save`,
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
        }),
        unSaveSwipedDrop: builder.mutation({
            query: ({token, dropId}) => ({
                url: `/drops/${dropId}/unsave`,
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
        }),
    }),
})

export const {
    useGetCategoriesQuery,
    useFetchCategoryDropsQuery,
    useFetchUserSavedDropsQuery,
    useFetchUserProfileQuery,

    useSaveSwipedDropMutation,
    useUnSaveSwipedDropMutation
} = DropApi