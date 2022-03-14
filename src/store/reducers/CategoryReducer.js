import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    general: {
        isLoading: true,
        activeTabIndex: 0,
        enableReswipeMode: false,
        reswipeModeActive: false,
        loadingIndexList: []
    },
    categories: [],
    external_creators: [],
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchCategories: (state, action) => {
            state = { ...state, ...state.general.isLoading = false, ...state.categories = action.payload.categories, ...state.external_creators = action.payload.external_creators }
        },
        categorySavedBuckets: (state, action) => {
            const { newBucket } = action.payload;
            const reswipedDrops = {};
            newBucket.forEach((d) => {
                if (!reswipedDrops[d.category]) {
                    reswipedDrops[d.category] = {};
                }

                reswipedDrops[d.category][d.id] = d;
            });


            const general = {
                ...state.general,
                reswipeModeActive: false
            }

            const updatedCategories = Object.entries(reswipedDrops).reduce((previousValue, [key, value]) => ({
                ...previousValue,
                [key]: {
                    ...state[key],
                    reswipedDrops: value,
                }
            }), {});

            return {
                ...state,
                general,
                ...updatedCategories
            }
        }
    },
})

export const { fetchCategories, categorySavedBuckets } = categorySlice.actions

export default categorySlice.reducer