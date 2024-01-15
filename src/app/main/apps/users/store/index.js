import {combineReducers} from "@reduxjs/toolkit";
import usersTable from "./usersTableSlice";
import userItem from './userItemSlice';

const reducer = combineReducers({
    usersTable,
    userItem,
})

export default reducer;
