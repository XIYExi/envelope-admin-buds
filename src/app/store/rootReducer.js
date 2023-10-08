import { combineReducers } from '@reduxjs/toolkit';
import envelope from './envelope';
import i18n from './i18nSlice';
import user from './userSlice';

const createReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        envelope: envelope,
        i18n,
        user,
        ...asyncReducers,
    });

    /*
      Reset the redux store when user logged out
       */
    if (action.type === 'user/userLoggedOut') {
        // state = undefined;
    }

    return combinedReducer(state, action);
};

export default createReducer;