import React, { useState } from 'react';
import { Alert, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveRoutine } from "../../store/features/user/userSlice"

export default function NewRoutineDialog(props) {
    const [newRoutineName, setNewRoutineName] = useState("");
    const [alert, setAlert] = useState(false);

    const dispatch = useDispatch();

    const commitNewRoutine = async (newRoutineName) => {

        if (!newRoutineName) {
            return setAlert(true);
        }
        dispatch(saveRoutine({newRoutineName}));

        props.close();
    }

    const close = () => {
        props.close();
        setAlert(false);
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Add a new routine</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Add the name of your new routine here, you can then view it and add new exercises to it one by one
            </DialogContentText>
            <TextField
                margin="dense"fullWidth variant="standard" color="secondary" label="Routine name" required size="small"onChange={e => setNewRoutineName(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>close()}>Cancel</Button>
            <Button onClick={()=>commitNewRoutine(newRoutineName)}>Save</Button>
            </DialogActions>
            {alert?<Alert severity="error">Your routine must have a name</Alert>:""}
        </Dialog>
    
  );
}
