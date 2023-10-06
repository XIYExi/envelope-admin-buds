import { createSelector, createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18';
import {setDefaultSettings} from "./envelope/settingsSlice";

export const changeLanguage = (languageId) => (dispatch, getState) => {
    const {direction} = getState().envelope.settings.defaults;

    const newLangDirection = i18n.dir(languageId);

    // if necessary， change theme direction
    if(newLangDirection !== direction)
        dispatch(setDefaultSettings({ direction: newLangDirection }));

    // 改变语言
    return i18n.changeLanguage(languageId).then(() => {
        dispatch(i18nSlice.actions.languageChanged(languageId));
    })
}


const i18nSlice = createSlice({
    name: 'i18n',
    initialState: {
        language: i18n.options.lng,
        languages: [
            {id: 'en', title: 'English', flag: 'US'},
            {id: 'zh', title: 'Chinese', flag: 'CN'}
        ],
    },
    reducers: {
        languageChanged: (state, action) => {
            state.language = action.payload;
        },
    },
});

export const selectCurrentLanguageId = ({ i18n: _i18n }) => _i18n.language;

export const selectLanguages = ({ i18n: _i18n }) => _i18n.languages;

export const selectCurrentLanguageDirection = createSelector([selectCurrentLanguageId], (id) => {
    return i18n.dir(id);
});

export const selectCurrentLanguage = createSelector(
    [selectCurrentLanguageId, selectLanguages],
    (id, languages) => {
        return languages.find((lng) => lng.id === id);
    }
);

export default i18nSlice.reducer;
