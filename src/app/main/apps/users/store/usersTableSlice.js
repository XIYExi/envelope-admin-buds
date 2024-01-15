/**
 * Table数据Slice
 */
import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import EnvelopeUtils from "../../../../../@envelope/utils";
import moment from "moment";

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
    time: {
        beginTime: null,
        endTIme: null,
    }
}


export const selectUsersDataSource = ({usersApp}) =>
    usersApp.usersTable.dataSources;
export const selectSearchText = ({ usersApp }) =>
    usersApp.usersTable.searchText;
export const selectTime = ({usersApp}) =>
    usersApp.usersTable.time;

/**
 * 根据searchText查询用户，对所有字段进行模糊匹配
 * */
export const selectFilteredUsers = createSelector(
    [selectUsersDataSource, selectSearchText],
    (users, searchText) => {
        if (searchText.length === 0) {
            return users;
        }
        return EnvelopeUtils.filterArrayByString(users, searchText);
    }
);

export const selectFilteredUsersWithCreatedTime = createSelector(
    [selectFilteredUsers, selectTime],
    (users, time) => {
        // console.log('time', time)

        // 如果没有提供完整的时间范围就返回原本的数据
        if (time.beginTime === null || time.endTime === null)
            return users;

        // 否则就按照时间进行检索
        const beginTimeUnix = moment(time.beginTime).valueOf();
        const endTimeUnix = moment(time.endTime).valueOf();
        return users.filter(item => {
            //console.log(item.createTime, beginTimeUnix, endTimeUnix);
            return item.createTime >= beginTimeUnix && item.createTime <= endTimeUnix;
        })
    }
)



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
        changeSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        changeSearchTime: (state, action) => {
            const {begin, end} = action.payload;
            state.time = {
                beginTime: begin,
                endTime: end,
            };
        },
        clearQuery: (state, action) => {
            state.searchText = '';
            state.time = {
                beginTime: null,
                endTime: null,
            };
        }
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

export const {
    openUsersDialog,
    closeUsersDialog,
    changeSearchText,
    changeSearchTime,
    clearQuery,
} = usersTableSlice.actions;

export default usersTableSlice.reducer;
