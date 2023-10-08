import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    state: null,
    options: {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
        },
        autoHideDuration: 2000,
        message: 'OI Message Box',
        variant: null,
    },
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        showMessage: (state, action) => {
            state.state = true;
            state.options = {
                ...initialState.options,
                ...action.payload
            };
        },
        hideMessage: (state, action) => {
            state.state = null;
        },
    },
});

export const {showMessage, hideMessage} = messageSlice.actions;

export const selectEnvelopeMessageState = ({envelope}) => envelope.message.state;

export const selectEnvelopeMessageOptions = ({envelope}) => envelope.message.options;

export default messageSlice.reducer;