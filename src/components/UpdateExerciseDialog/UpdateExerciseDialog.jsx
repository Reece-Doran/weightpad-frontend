

import React, { useState } from 'react';
import { Alert, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateExercise } from "../../store/features/user/userSlice"

export default function UpdateExerciseDialog(props) {
    const [exerciseName, setExerciseName] = useState(props.name);
    const [repsSets, setRepsSets] = useState(props.repsSets);
    const [weight, setWeight] = useState(props.weight);
    const [alert, setAlert] = useState(false);

    const dispatch = useDispatch();

    const commitUpdate = async (exerciseId, exerciseName, repsSets, weight) => {

        if (!exerciseName || !repsSets || !weight) {
            return setAlert(true);
        }
        dispatch(updateExercise({exerciseId, exerciseName, repsSets, weight}));
        props.close();
    }

    const close = () => {
        props.close();
        setAlert(false);
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Update exercise</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Update you exercise information here
            </DialogContentText>
            <TextField
                value = {exerciseName} margin="dense"fullWidth variant="standard" color="secondary" label="Exercise name" required size="small"onChange={e => setExerciseName(e.target.value)}
            />
            <TextField
                value = {repsSets} margin="dense"fullWidth variant="standard" color="secondary" label="Reps/Sets" required size="small"onChange={e => setRepsSets(e.target.value)}
            />
            <TextField
                value = {weight} margin="dense"fullWidth variant="standard" color="secondary" label="Weight" required size="small"onChange={e => setWeight(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>close()}>Cancel</Button>
            <Button onClick={()=>commitUpdate(props.id, exerciseName, repsSets, weight)}>Update</Button>
            </DialogActions>
            {alert?<Alert severity="error">All fields are required</Alert>:""}
        </Dialog>
    
  );
}
