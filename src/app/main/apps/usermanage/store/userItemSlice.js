/**
 * 单个user数据， 用于处理ContactView预览
 */
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import ContactModel from "../model/ContactModel";

export const getUserItem = createAsyncThunk(
    'userManageApp/usersTable/getUser',
    async (id, {dispatch, getState}) => {
        try{
            const response = await axios.get(`/api/usermanage/user/${id}`);
            const data = await response.data;

            return data;
        }catch (err){
            history.push({pathname: '/apps/usermanage'});
            return null;
        }
    }
)


export const addUserItem = createAsyncThunk(
    'userManageApp/usersTable/addUser',
    async (user, { dispatch, getState }) => {
        const response = await axios.post('/api/usermanage/user', user);

        const data = await response.data;

        return data;
    }
)



export const updateUserItem = createAsyncThunk(
    'userManageApp/usersTable/updateUser',
    async (user, { dispatch, getState }) => {
        console.log('put -> koa', user)
        const response = await axios.put(`/api/usermanage/user/${user.id}`, user);

        const data = await response.data;

        console.log('uodateItem', data);

        return data;
    }
);


export const removeUserItem = createAsyncThunk(
    'userManageApp/usersTable/removeUser',
    async (id, { dispatch, getState }) => {
        const response = await axios.delete(`/api/usermanage/user/${id}`);

        await response.data;

        return id;
    }
);


export const selectUser = ({userManageApp}) => userManageApp.userItem;


const userItemSlice = createSlice({
    name: 'userManageApp/userItem',
    initialState: null,
    reducers: {
        newUser: (state, action) => ContactModel(),
        resetContact: () => null,
    },
    extraReducers: {
        [getUserItem.pending]: (state, action) => null,
        [getUserItem.fulfilled]: (state, action) => action.payload,
        [updateUserItem.fulfilled]: (state, action) => action.payload,
        [removeUserItem.fulfilled]: (state, action) => null,
    }
});


export const {newUser, resetContact} = userItemSlice.actions;

export default userItemSlice.reducer;