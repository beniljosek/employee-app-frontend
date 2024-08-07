import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        id: '',
        isOpen: false
    }
};

export const deleteDialogSlice = createSlice({
    name: 'deleteDialogData',
    initialState,
    reducers: {
        setDeleteDialogData: (state, action) => {
            console.log(action);
            state.value = action.payload;
        },
        resetDeleteDialogData: (state) => {
            state.value = initialState;
        }
    }
});

export const { setDeleteDialogData, resetDeleteDialogData } = deleteDialogSlice.actions;
export default deleteDialogSlice.reducer;
