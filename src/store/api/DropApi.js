import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DROPMAGNET_SERVER_URL } from '../../config/constants'



export const DropApi = createApi({
    reducerPath: 'categories',
    baseQuery: fetchBaseQuery({
        baseUrl: DROPMAGNET_SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['CategoryDrops'],
    endpoints: (builder) => ({
        fetchUserProfile: builder.query({
            query: (userId) => ({
                url: `/profiles/${userId}`,
            }),
        }),


        getCategories: builder.query({
            query: () => `/categories`,
        }),

        fetchCategoryDrops: builder.query({
            query: ({ userId, time }) => ({
                url: `/drops?user_id=${userId}&index=${time}`,
            }),
            providesTags: ['CategoryDrops']
        }),

        fetchUserSavedDrops: builder.query({
            query: (symbol) => ({
                url: `/drops/saved?symbol=${symbol}`,
            }),
        }),

        saveSwipedDrop: builder.mutation({
            query: ({ symbol, userId, drop, time }) => ({
                url: `/drops/${drop.id}/save`,
                method: 'POST',
                responseHandler: "text",
            }),
            async onQueryStarted({ symbol, drop, userId, time }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    DropApi.util.updateQueryData('fetchUserSavedDrops', symbol, (draft) => {
                        if (draft === null) {
                            draft = [drop]
                            return draft
                        } else {
                            Object.assign(draft, [...draft, drop])
                        }
                        // const data = draft === null ? [].push(drop) : [...draft, drop]
                        // Object.assign(draft === null ? [] : draft, data)
                    })
                )

                const categoryDropResult = dispatch(
                    DropApi.util.updateQueryData('fetchCategoryDrops', { userId, time }, (draft) => {
                        let drops = draft.drops
                        const index = drops.findIndex(x => x.id === drop.id)
                        drops.splice(index, 1)
                        Object.assign(draft, { ...draft, drops: drops })
                    })
                    // DropApi.util.invalidateTags
                )


                try {
                    // console.log('categoryDropResult', { categoryDropResult.patches.value })
                    await queryFulfilled
                    if (categoryDropResult.patches.value) {

                    }

                } catch (e) {
                    console.log("error=+>", e)
                    categoryDropResult.undo()
                    patchResult.undo()
                }
            },
        }),


        
        unSaveSwipedDrop: builder.mutation({
            query: ({ symbol, userId, drop, time }) => ({
                url: `/drops/${drop.id}/unsave`,
                method: 'POST',
                responseHandler: "text",
            }),
            async onQueryStarted({ symbol, drop, userId, time }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    DropApi.util.updateQueryData('fetchUserSavedDrops', symbol, (draft) => {
                        if (draft === null) {
                            return
                        } else {
                            let drops = draft
                            const index = drops.findIndex(x => x.id === drop.id)
                            drops.splice(index, 1)
                            Object.assign(draft, drops)
                        }
                    })
                )

                const categoryDropResult = dispatch(
                    DropApi.util.updateQueryData('fetchCategoryDrops', { userId, time }, (draft) => {
                        let drops = draft.drops
                        const index = drops.findIndex(x => x.id === drop.id)
                        drops.splice(index, 1)
                        Object.assign(draft, { ...draft, drops: drops })
                    })
                )

                try {
                    await queryFulfilled
                    // if (categoryDropResult.patches[0].value === 0) {
                    //     dispatch(DropApi.util.invalidateTags(['CategoryDrops']))
                    // }

                } catch (e) {
                    console.log("error=+>", e)
                    categoryDropResult.undo()
                    patchResult.undo()
                }
            },
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