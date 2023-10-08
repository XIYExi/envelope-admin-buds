import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';

const envelopeReducers = combineReducers({
    navigation,
    settings,
    navbar,
    message,
    dialog,
});

export default envelopeReducers;
