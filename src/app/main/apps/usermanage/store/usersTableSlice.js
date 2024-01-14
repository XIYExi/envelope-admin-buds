import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import EnvelopeUtils from "../../../../../@envelope/utils";
import {addUserItem, removeUserItem, updateUserItem} from "./userItemSlice";

/**
 * Table数据
 *
 */


export const getUsers = createAsyncThunk(
    'userManageApp/usersTable/getUsers', async () => {
    const response = await axios.get('/api/usermanage/users');
    const data = await response.data;

    // console.log(data)

    return data;
})

export const selectSearchText = ({ userManageApp }) =>
    userManageApp.usersTable.searchText;

const userManageAdapter = createEntityAdapter({})

export const {
    selectAll: selectUsersTable,
} = userManageAdapter.getSelectors((state) => state.userManageApp.usersTable)


export const selectFilteredUsers = createSelector(
    [selectUsersTable, selectSearchText],
    (users, searchText) => {
        if (searchText.length === 0) {
            return users;
        }
        return EnvelopeUtils.filterArrayByString(users, searchText);
    }
);

export const selectGroupedFilteredUsers = createSelector(
    [selectFilteredUsers],
    (users) => {
        return users
            .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
            .reduce((r, e) => {
                // get first letter of name of current element
                const group = e.name[0];
                // if there is no property in accumulator with this letter create it
                if (!r[group]) r[group] = { group, children: [e] };
                // if there is push current element to children array for that letter
                else r[group].children.push(e);
                // return accumulator
                return r;
            }, {});
    }
);


const usersTableSlice = createSlice({
    name: 'userManageApp/usersTable',
    initialState: userManageAdapter.getInitialState({
        selectUsers: [],
        usersDialogOpen: false, // 修改单个用户数据的弹窗
        searchText: '',
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
            state.searchText = '';
        },
        [addUserItem.fulfilled]: userManageAdapter.addOne,
        [updateUserItem.fulfilled]: userManageAdapter.upsertOne,
        [removeUserItem.fulfilled]: userManageAdapter.removeOne,
    },
});

export const selectSelectedUsers = ({userManageApp}) => userManageApp.usersTable.selectedUsers;


export const selectUsersDialogOpen = ({userManageApp}) => userManageApp.usersTable.usersDialogOpen;

export const {openUsersDialog, closeUsersDialog} = usersTableSlice.actions;

export default usersTableSlice.reducer;
