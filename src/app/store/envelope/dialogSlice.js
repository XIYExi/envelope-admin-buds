import {createSlice} from "@reduxjs/toolkit";

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        state: false,
        options: {
            children: 'OI',
        },
    },
    reducers: {
        openDialog: (state, action) => {
            state.state = true;
            state.options = action.payload;
        },
        closeDialog: (state, action) => {
            state.state = false;
        },
    },
});

export const {openDialog, closeDialog} = dialogSlice.actions;

export const selectEnvelopeDialogState = ({envelope}) => envelope.dialog.state;

export const selectEnvelopeDialogOptions = ({envelope}) => envelope.dialog.options;

export default dialogSlice.reducer;