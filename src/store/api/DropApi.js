import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DROPMAGNET_SERVER_URL } from '../../config/constants'

const createProfileFormData = (file) => {
    const data = new FormData()
    data.append('name', 'avatar')
    data.append('avatar', file)
    data.append('content_type', file ? file.type : '')
    return data
}

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
    tagTypes: ['UserSavedDrops'],
    endpoints: (builder) => ({
        fetchUserProfile: builder.query({
            query: (userId) => ({
                url: `/profiles/${userId}`,
            }),
        }),

        updateUserProfileDetails: builder.mutation({
            query: ({ field, value, userId }) => ({
                url: `/profiles/${field}?v=${value}`,
                method: 'PUT',
                responseHandler: "text",
            }),
            async onQueryStarted({ field, value, userId }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    DropApi.util.updateQueryData('fetchUserProfile', userId, (draft) => {
                        Object.assign(draft, { ...draft, [field]: value })
                    })
                )
                try {
                    await queryFulfilled
                } catch (e) {
                    console.log("error=+>", e)
                    patchResult.undo()
                }
            },
        }),

        updateUserProfilePicture: builder.mutation({
            query: ({ file, userId, bufferImg }) => ({
                url: `/profiles/avatar`,
                method: 'PUT',
                body: createProfileFormData(file),
                responseHandler: "text",
            }),
            async onQueryStarted({ file, userId, bufferImg }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    DropApi.util.updateQueryData('fetchUserProfile', userId, (draft) => {
                        if (!file) {
                            Object.assign(draft, { ...draft, avatar_url: '' })
                        } else {
                            Object.assign(draft, { ...draft, avatar_url: bufferImg })
                        }

                    })
                )
                try {
                    await queryFulfilled
                } catch (e) {
                    console.log("error=+>", e)
                    patchResult.undo()
                }
            },
        }),


        getCategories: builder.query({
            query: () => `/categories`,
        }),

        fetchCategoryDrops: builder.query({
            query: ({ userId, time }) => ({
                url: `/drops?user_id=${userId}&index=${time}`,
            }),
        }),

        fetchUserSavedDrops: builder.query({
            query: (symbol) => ({
                url: `/drops/saved?symbol=${symbol}`,
            }),
            providesTags: ['UserSavedDrops'],
        }),



        /*----------- swipe Drops API Logic Start----------*/
        saveSwipedDrop: builder.mutation({
            query: ({ symbol, userId, drop, time }) => ({
                url: `/drops/${drop.id}/save`,
                method: 'POST',
                responseHandler: "text",
            }),
            // invalidatesTags: ['UserSavedDrops'],
            async onQueryStarted({ symbol, drop, userId, time }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    DropApi.util.updateQueryData('fetchUserSavedDrops', symbol, (draft) => {
                        if (draft === null) {
                            draft = [drop]
                            return draft
                        } else {
                            Object.assign(draft, [...draft, drop])
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
                    // dispatch(DropApi.util.invalidateTags(['UserSavedDrops']))
                } catch (e) {
                    console.log("error=+>", e)
                    // categoryDropResult.undo()
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




        /*----------- Reswipe Drops API Logic Start----------*/
        saveReSwipedDrop: builder.mutation({
            query: ({ symbol, dropId }) => ({
                url: `/drops/${dropId}/save`,
                method: 'POST',
                responseHandler: "text",
            }),
            // async onQueryStarted({ symbol, dropId }, { dispatch, queryFulfilled }) {
            //     const patchResult = dispatch(
            //         DropApi.util.updateQueryData('fetchUserSavedDrops', symbol, (draft) => {
            //             if (draft === null) {
            //                 return
            //             } else {
            //                 let drops = draft
            //                 const index = drops.findIndex(x => x.id === dropId)
            //                 drops.splice(index, 1)
            //                 Object.assign(draft, drops)
            //             }
            //         })
            //     )
            //     try {
            //         await queryFulfilled
            //     } catch (e) {
            //         patchResult.undo()
            //     }
            // },
        }),

        unSaveReSwipedDrop: builder.mutation({
            query: ({ symbol, dropId }) => ({
                url: `/drops/${dropId}/unsave`,
                method: 'POST',
                responseHandler: "text",
            }),
            // async onQueryStarted({ symbol, dropId }, { dispatch, queryFulfilled }) {
            //     const patchResult = dispatch(
            //         DropApi.util.updateQueryData('fetchUserSavedDrops', symbol, (draft) => {
            //             if (draft === null) {
            //                 return
            //             } else {
            //                 let drops = draft
            //                 const index = drops.findIndex(x => x.id === dropId)
            //                 drops.splice(index, 1)
            //                 Object.assign(draft, drops)
            //             }
            //         })
            //     )
            //     try {
            //         await queryFulfilled
            //     } catch (e) {
            //         patchResult.undo()
            //     }
            // },
        }),
    }),
})

export const {
    useGetCategoriesQuery,
    useFetchCategoryDropsQuery,
    useFetchUserSavedDropsQuery,

    useFetchUserProfileQuery,
    useUpdateUserProfileDetailsMutation,
    useUpdateUserProfilePictureMutation,

    useSaveSwipedDropMutation,
    useUnSaveSwipedDropMutation,
    useSaveReSwipedDropMutation,
    useUnSaveReSwipedDropMutation
} = DropApi