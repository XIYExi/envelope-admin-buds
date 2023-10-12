import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

/**
 * 这是对Table中的单个用户进行增删改查！
 *
 */


export const getUsers = createAsyncThunk('userManageApp/usersTable/getUsers', async () => {
    const response = await axios.get('/api/usermanage/users');
    const data = await response.data;

    // console.log(data)

    return data;
})


export const updateUser = createAsyncThunk(
    'userManageApp/usersTable/updateUsers',
    async (newUser, {dispatch}) => {

    }
)


export const addUser = createAsyncThunk(
    'userManageApp/usersTable/addUsers',
    async (newUser, {dispatch}) => {

    }
)


export const removeUser = createAsyncThunk(
    'userManageApp/usersTable/removeUsers',
    async (newUser, {dispatch}) => {

    }
)


const userManageAdapter = createEntityAdapter({})

export const {
    selectAll: selectUsersTable,
} = userManageAdapter.getSelectors((state) => state.userManageApp.usersTable)


const usersTableSlice = createSlice({
    name: 'userManageApp/usersTable',
    initialState: userManageAdapter.getInitialState({
        selectUsers: [],
        usersDialogOpen: false, // 修改单个用户数据的弹窗
    }),
    reducers: {

        openUsersDialog: (state, action) => {
            state.usersDialogOpen = true;
        },
        closeUsersDialog: (state, action) => {
            state.usersDialogOpen = false;
        },
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            userManageAdapter.setAll(state, action.payload);
            state.selectedUsers = action.payload.map((item) => item.id);
        },
        [addUser.fulfilled]: userManageAdapter.addOne,
        [updateUser.fulfilled]: userManageAdapter.upsertOne,
        [removeUser.fulfilled]: userManageAdapter.removeOne,
    },
});

export const selectSelectedUsers = ({userManageApp}) => userManageApp.usersTable.selectedUsers;


export const selectUsersDialogOpen = ({userManageApp}) => userManageApp.usersTable.usersDialogOpen;

export const {openUsersDialog, closeUsersDialog} = usersTableSlice.actions;

export default usersTableSlice.reducer;