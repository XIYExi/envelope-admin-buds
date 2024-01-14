import {combineReducers} from "@reduxjs/toolkit";
import usersTable from "./usersTableSlice";

const reducer = combineReducers({
    usersTable
})

export default reducer;
