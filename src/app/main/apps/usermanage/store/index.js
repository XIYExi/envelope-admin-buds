import {combineReducers} from "@reduxjs/toolkit";
import usersTable from './usersTableSlice';
import userItem from './userItemSlice';
import tags from "./tagSlice";

const reducer = combineReducers({
    usersTable,
    userItem,
    tags,
})

export default reducer;