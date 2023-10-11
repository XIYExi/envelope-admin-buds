import events from './eventsSlice';
import labels from './labelsSlice';
import {combineReducers} from "@reduxjs/toolkit";

const reducer = combineReducers({
    events,
    labels,
});

export default reducer;