/**
 * Table数据Slice
 */
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getTableUsers = createAsyncThunk('usersApp/usersTable/getUsers', async (collegeId, {dispatch, getState}) => {
    const response = await axios.get(`/back/users/listForTeacher?collegeId=${collegeId}`);
    const data = await response.data.data.response;

    return data;
});


const initialState = {
    selectUsers: [],
    usersDialogOpen: false, // 修改单个用户数据的弹窗
    searchText: '',
    dataSources: [],
}


const usersTableSlice = createSlice({
    name: 'usersApp/usersTable',
    initialState: initialState,
    reducers: {
        openUsersDialog: (state, action) => {
            state.usersDialogOpen = true;
        },
        closeUsersDialog: (state, action) => {
            state.usersDialogOpen = false;
        },
    },
    extraReducers: {
        [getTableUsers.fulfilled]: (state, action) => {
            // console.log('dataSources: ',action.payload)
            state.dataSources = action.payload.data;
            state.selectedUsers = action.payload.data.map(item => item.sysId);
            state.searchText = '';
        }
    }
})

export const selectUsersDataSource = ({usersApp}) => usersApp.usersTable.dataSources;


export const {
    openUsersDialog,
    closeUsersDialog,
} = usersTableSlice.actions;

export default usersTableSlice.reducer;
