import React, { useState } from 'react';
import { Alert, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveExercise } from "../../store/features/user/userSlice"

export default function NewExerciseDialog(props) {
    const [newExerciseName, setNewExerciseName] = useState("");
    const [repsSets, setRepsSets] = useState("");
    const [weight, setWeight] = useState("");
    const [alert, setAlert] = useState(false);

    const dispatch = useDispatch();

    const commitNewExercise = async (routineId, newExerciseName, repsSets, weight) => {

        if (!newExerciseName || !repsSets || !weight) {
            return setAlert(true);
        }
        dispatch(saveExercise({routineId, newExerciseName, repsSets, weight}));

        setNewExerciseName("");
        setRepsSets("");
        setWeight("")
        //TODO add snackbar message with MUI
        props.close();
    }

    const close = () => {
        props.close();
        setAlert(false);
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Add a new exercise</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Add the name of your new exercise here, as well as the number of repititions, sets and the weight lifted
            </DialogContentText>
            <TextField
                margin="dense"fullWidth variant="standard" color="secondary" label="Exercise name" required size="small"onChange={e => setNewExerciseName(e.target.value)}
            />
            <TextField
                margin="dense"fullWidth variant="standard" color="secondary" label="Reps/Sets" required size="small"onChange={e => setRepsSets(e.target.value)}
            />
            <TextField
                margin="dense"fullWidth variant="standard" color="secondary" label="Weight" required size="small"onChange={e => setWeight(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>close()}>Cancel</Button>
            <Button onClick={()=>commitNewExercise(props.routineId, newExerciseName, repsSets, weight)}>Save</Button>
            </DialogActions>
            {alert?<Alert severity="error">All fields are required</Alert>:""}
        </Dialog>
    
  );
}
