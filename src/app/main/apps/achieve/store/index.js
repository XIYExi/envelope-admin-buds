import {combineReducers} from "@reduxjs/toolkit";
import achieves from './achievesSlice';

const reducer = combineReducers({
    achieves,
})

export default reducer;
