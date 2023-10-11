import {createSlice, createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import navigationConfig from "../../configs/navigationConfig";
import EnvelopeUtils from "../../../@envelope/utils";
import i18next from "i18next";
import _  from '../../../@lodash'

const navigationAdapter = createEntityAdapter();// 创建实体配置器，规范state
const emptyInitialState = navigationAdapter.getInitialState();
// 接受多个entity，存在则更新，不存在则添加
const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setNavigation: navigationAdapter.setAll,
        resetNavigation: (state, action) => initialState,
    },
});


export const appendNavigationItem = (item, parentId) => (dispatch, getState) => {
    const navigation = selectNavigationAll(getState());

    return dispatch(setNavigation(EnvelopeUtils.appendNavItem(navigation, item, parentId)));
}

export const prependNavigationItem = (item, parentId) => (dispatch, getState) => {
    const navigation = selectNavigationAll(getState());

    return dispatch(setNavigation(EnvelopeUtils.prependNavItem(navigation, item, parentId)));
};

export const updateNavigationItem = (id, item) => (dispatch, getState) => {
    const navigation = selectNavigationAll(getState());

    return dispatch(setNavigation(EnvelopeUtils.updateNavItem(navigation, id, item)));
};

export const removeNavigationItem = (id) => (dispatch, getState) => {
    const navigation = selectNavigationAll(getState());

    return dispatch(setNavigation(EnvelopeUtils.removeNavItem(navigation, id)));
};

export const {
    selectAll: selectNavigationAll,
    selectIds: selectNavigationIds,
    selectById: selectNavigationItemById,
} = navigationAdapter.getSelectors((state) => state.envelope.navigation);



export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = (state) => state.user.role;


export const selectNavigation = createSelector(
    [selectNavigationAll, ({ i18n }) => i18n.language, getUserRole],
    (navigation, language, userRole) => {
        function setTranslationValues(data) {
            // loop through every object in the array
            return data.map((item) => {
                if (item.translate && item.title) {
                    item.title = i18next.t(`navigation:${item.translate}`);
                }

                if (item.subtitleTranslate && item.subtitle){
                    item.subtitle = i18next.t(`navigation:${item.subtitleTranslate}`);
                }

                // see if there is a children node
                if (item.children) {
                    // run this function recursively on the children array
                    item.children = setTranslationValues(item.children);
                }
                return item;
            });
        }

        return setTranslationValues(
            _.merge(
                [],
                filterRecursively(navigation, (item) => EnvelopeUtils.hasPermission(item.auth, userRole))
            )
        );
    }
);


function filterRecursively(arr, predicate) {
    return arr.filter(predicate).map((item) => {
        item = { ...item };
        if (item.children) {
            item.children = filterRecursively(item.children, predicate);
        }
        return item;
    });
}


export const selectFlatNavigation = createSelector([selectNavigation], (navigation) =>
    EnvelopeUtils.getFlatNavigation(navigation)
);

export default navigationSlice.reducer;