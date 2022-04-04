import { createSlice } from "@reduxjs/toolkit";

export const exceptionSlice = createSlice ({
    name: "exception",
    initialState: { error: false, severity: "", message: ""},
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSeverity: (state, action) => {
            state.severity = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearException: (state) => {
            state.error = false;
            state.severity = "";
            state.message = "";
        }
        
    }
});
    


export const { setError, setSeverity, setMessage, clearException } = exceptionSlice.actions;
export default exceptionSlice.reducer;