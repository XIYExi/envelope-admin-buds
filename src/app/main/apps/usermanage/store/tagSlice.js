/**
 * Tag 即为 部门！
 */
import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getTags = createAsyncThunk(
    'userManageApp/tags/getTags',
    async (params, {getState}) => {
        const response = await axios.get('/api/usermanage/tags');
        const data = await response.data;

        console.log('tags', data)

        return data;
    }
)

const tagsAdapter = createEntityAdapter({});
export const { selectAll: selectTags, selectById: selectTagsById } = tagsAdapter.getSelectors(
    (state) => state.userManageApp.tags
);

const tagsSlice = createSlice({
    name: 'userManageApp/tags',
    initialState: tagsAdapter.getInitialState([]),
    reducers: {},
    extraReducers: {
        [getTags.fulfilled]: tagsAdapter.setAll,
    }
})

export default tagsSlice.reducer;