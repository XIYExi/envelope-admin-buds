import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import _ from '@lodash';
import history from '@history';

import {showMessage} from "./envelope/messageSlice";
import settingsConfig from "../configs/settingsConfig";
import jwtService from "../auth/services/jwtService/jwtService";


export const setUser = createAsyncThunk('/user/setUser', async (user, {dispatch, getState}) => {

    if (user.loginRedirectUrl) {
        settingsConfig.loginRedirectUrl = user.loginRedirectUrl;
    }

    return user;
})

export const updateUserSettings = createAsyncThunk(
    'user/updateSettings',
    async (settings, {dispatch, getState}) => {
        const {user} = getState();
        const newUser = _.merge({}, user, {data: {settings}});

        dispatch(updateUserData(newUser));

        return newUser;
    }
)

export const updateUserShortcuts = createAsyncThunk(
    'user/updateShortcuts',
    async (shortcuts, { dispatch, getState }) => {
        const { user } = getState();
        const newUser = {
            ...user,
            data: {
                ...user.data,
                shortcuts,
            },
        };

        dispatch(updateUserData(newUser));

        return newUser;
    }
);


export const logoutUser = () => async (dispatch, getState) => {
    const { user } = getState();

    if (!user.role || user.role.length === 0) {
        // is guest
        return null;
    }

    history.push({
        pathname: '/',
    });

    dispatch(setInitialSettings());

    return dispatch(userLoggedOut());
};


export const updateUserData = (user) => async (dispatch, getState) => {

    if(!user.role || user.role.length ===0){
        //  guest 访客
        return;
    }

    jwtService
        .updateUserData(user)
        .then(() => {
            dispatch(showMessage({message: 'User data saved with api'}));
        })
        .catch(err => {
            dispatch(showMessage({message: err.message}));
        });
}

const initialState = {
    role: [],
    data: {
        displayName: 'John Doe',
        photoURL: 'assets/images/avatars/brian-hughes.jpg',
        email: 'johndoe@withinpixels.com',
        shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
    }
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedOut: (state, action) => initialState,
    },
    extraReducers: {
        [updateUserSettings.fulfilled]: (state, action) => action.payload,
        [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
        [setUser.fulfilled]: (state, action) => action.payload,
    },
});


export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;