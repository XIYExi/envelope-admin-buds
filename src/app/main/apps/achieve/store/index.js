import {combineReducers} from "@reduxjs/toolkit";
import achieves from './achievesSlice';
import reward from './rewardSlice';

const reducer = combineReducers({
    achieves,
    reward,
})

export default reducer;
