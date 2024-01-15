import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import ContactModel from "../model/ContactModel";


export const getUserItem = createAsyncThunk(
    'usersApp/usersTable/getUserItem',
    async(id, {dispatch, getState}) => {
        try{
            const response = await axios.get(`/back/users/user/${id}`);
            const data = response.data.data.response;
            // console.log(response.data)

            return {data};
        }catch (err){
            history.push({pathname: '/apps/users'});
            return null;
        }
    }
);


export const addUserItem = createAsyncThunk(
    'usersApp/usersTable/addUser',
    async (event, {dispatch, getState}) => {
        const {user,opsId} = event;
        const response = await axios.post(`/back/users/addUserItem/${opsId}`, user);
        const data = await response.data.data.response;

        return data;
    }
)


export const updateUserItem = createAsyncThunk(
    'usersApp/usersTable/updateUser',
    async (event, {dispatch, getState}) => {
        const {
            user,
            id
        } = event;
        const response = await axios.post(`/back/users/updateUserItem/${id}`, user);
        const data = await response.data.data.response;

        return data;
    }
)


export const removeUserItem = createAsyncThunk(
    'usersApp/usersTable/removeUser',
    async (id, {dispatch, getState}) => {
        const response = await axios.post(`/back/users/removeUserItem/${id}`);
        const data = await response.data.data.response;

        return data;
    }
)

export const selectUserItem = ({usersApp}) => usersApp.userItem;



const userItemSlice = createSlice({
    name: 'usersApp/userItem',
    initialState: null,
    reducers: {
        newUser: (state, action) => ContactModel(),
        resetContact: () => null,
    },
    extraReducers: {
        [getUserItem.pending]: (state, action) => null,
        [getUserItem.fulfilled]: (state, action) => action.payload.data.data,
        [updateUserItem.fulfilled]: (state, action) => action.payload.data.data,
        [removeUserItem.fulfilled]: (state,action) => null,
    }
});


export const {
    newUser,
    resetContact,
} = userItemSlice.actions;

export default userItemSlice.reducer;
