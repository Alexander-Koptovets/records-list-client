import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'records',
    initialState: {
        records: [],
        isLoading: false,
        modalRecord: null,
    },
    reducers: {
        setRecords(state, action) {
            state.records = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setModalRecord(state, action) {
            state.modalRecord = action.payload;
        },
    },
});

export default slice.reducer;
export const { setRecords, setLoading, setModalRecord } = slice.actions;