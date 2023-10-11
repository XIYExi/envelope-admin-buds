import widgets from './widgetsSlice';
import {combineReducers} from "@reduxjs/toolkit";

const reducer = combineReducers({
    widgets,
})

export default reducer;