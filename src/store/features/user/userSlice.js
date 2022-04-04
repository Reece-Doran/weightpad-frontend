import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authRequest } from "../../../config/axios/axios"
// import axios from "axios";

import { USER_DATA_URL, SAVE_ROUTINE_URL, SAVE_EXERCISE_URL, UPDATE_EXERCISE_URL, GET_SCHEDULE_URL } from "../../../config/config";


export const getUserData = createAsyncThunk(
    "userData/getUserData",
    async ({username}, { dispatch, getState }) => {

        const { jwt } = getState();
        const accessToken = jwt.value.accessToken;
        
        const res = await authRequest.get(USER_DATA_URL + username, {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json'
            }}).catch(e=>console.log(e));
        
        return res.data;
    }
);



export const saveRoutine = createAsyncThunk(
    "userData/saveRoutine",
    async ({newRoutineName}, { getState }) => {

        const { jwt } = getState();
        const { user } = getState();
        const accessToken = jwt.value.accessToken;
        const userId = user.value.id;

        const content = JSON.stringify({name: newRoutineName})

        const res = await authRequest.post(SAVE_ROUTINE_URL+userId, content,
        {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json'
            }
        }
        ).catch(e=>console.log(e));
        return res.data;
    }
);
export const saveExercise = createAsyncThunk(
    "userData/saveExercise",
    async ({routineId, newExerciseName, repsSets, weight}, { getState }) => {

        const { jwt } = getState();
        const accessToken = jwt.value.accessToken;
        const content = JSON.stringify({name : newExerciseName, repsSets : repsSets, weight : weight})

        const res = await authRequest.post(SAVE_EXERCISE_URL + routineId, content,
        {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json'
            }
        }
        ).catch(e=>console.log(e));
        return res.data;
    }
);
export const updateExercise = createAsyncThunk(
    "userData/updateExercise",
    async ({exerciseId, exerciseName, repsSets, weight}, { getState }) => {

        const { jwt } = getState();
        const accessToken = jwt.value.accessToken;

        const content = JSON.stringify({name : exerciseName, repsSets : repsSets, weight : weight})

        const res = await authRequest.put(UPDATE_EXERCISE_URL + exerciseId, content,
        {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json'
            }
        }
        ).catch(e=>console.log(e));
        return res.data;
    }
);
export const getSchedule = createAsyncThunk(
    "userData/getSchedule",
    async ({scheduleId}, { getState }) => {

        const { jwt } = getState();
        const accessToken = jwt.value.accessToken;
        
        const res = await authRequest.get(GET_SCHEDULE_URL + scheduleId, 
        {
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json'
            }
        }
        ).catch(e=>console.log(e));
        return res.data;
    }
);

export const userSlice = createSlice ({
    name: "userData",
    initialState: { value: null, status: null, username:""},
    reducers: {
        clearData: (state) => {
            state.value = null
        },
        
        deleteRoutine: (state, {payload}) => {
            const routines = state.value.routines;
            for (let i = 0; i< routines.length ;i++) {
                if(routines[i].id === payload){
                    routines.splice(i, 1);
                }
            }

        },
        deleteExercise: (state, {payload}) => {
            const {exerciseId, routineId} = payload;
            const routine = state.value.routines.find(item => item.id === routineId);

            for (let i = 0; i< routine.exercises.length ;i++) {
                if(routine.exercises[i].id === exerciseId){
                    routine.exercises.splice(i, 1);
                }
            }

        },
        
        
    },
    extraReducers: {
        // user data
        [getUserData.pending]:(state) => {
            state.status = "loading"
        },
        [getUserData.fulfilled]: (state, {payload}) => {
            state.value = payload
            state.status = "success"
        },
        [getUserData.rejected]: (state) => {
            state.status = "failed"
        },

        //routines
        [saveRoutine.pending]:(state) => {
            state.status = "loading"
        },
        [saveRoutine.fulfilled]: (state, {payload}) => {
            state.value.routines.push(payload);
            state.status = "success"
        },
        [saveRoutine.rejected]: (state) => {
            state.status = "failed"
        },

        //exercises
        [updateExercise.pending]:(state) => {
            state.status = "loading"
        },
        [updateExercise.fulfilled]: (state, {payload}) => {

            const routine = state.value.routines.find(item => item.id === payload.routineId);

            for (let i = 0; i< routine.exercises.length ;i++) {
                if(routine.exercises[i].id === payload.id){
                    routine.exercises.splice(i, 1, payload);
                }
            }
            state.status = "success"
        },
        [updateExercise.rejected]: (state) => {
            state.status = "failed"
        },

        
        [saveExercise.pending]:(state) => {
            state.status = "loading"
        },
        [saveExercise.fulfilled]: (state, {payload}) => {
            const routine = state.value.routines.find(item => item.id === payload.routineId);
            routine.exercises.push(payload);
            state.status = "success"
        },
        [saveExercise.rejected]: (state) => {
            state.status = "failed"
        },

        // Schedule
        [getSchedule.pending]:(state) => {
            state.status = "loading"
        },
        [getSchedule.fulfilled]: (state, {payload}) => {
            state.value.schedule = payload;
            state.status = "success"
        },
        [getSchedule.rejected]: (state) => {
            state.status = "failed"
        },

    }
}) 


export const { clearData, saveUsername, deleteRoutine, deleteExercise } = userSlice.actions;
export default userSlice.reducer;



