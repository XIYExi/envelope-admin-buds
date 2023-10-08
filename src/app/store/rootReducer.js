import { combineReducers } from '@reduxjs/toolkit';
import envelope from './envelope';
import i18n from './i18nSlice';
import user from './userSlice';

const createReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        envelope,
        i18n,
        user,
        ...asyncReducers
    });
    /**
     * 当用户登出的时候重置redux
     * */
    if (action.type === 'user/suerLoggedOut'){
        state = undefined;
    }

    return combinedReducer(state, action);
}

export default createReducer;