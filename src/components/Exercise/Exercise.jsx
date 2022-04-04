import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteExercise } from "../../store/features/user/userSlice"
import { DELETE_EXERCISE_URL } from "../../config/config"
import { Typography, Card, ButtonGroup, Button, Grid, Grow } from '@mui/material';
import { Menu, Delete } from "@mui/icons-material";
import UpdateExerciseDialog from "../../components/UpdateExerciseDialog/UpdateExerciseDialog"
import { authRequest } from "../../config/axios/axios" 

export default function Exercise(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const accessToken = useSelector(
    (state) => state.jwt.value.accessToken
  )

  const schedule = useSelector(
    (state) => state.jwt.schedule
  )

  //used for checking schedule for routine, returns the routine if found
  const checkScheduleForRoutine = (routineId) => {
    const scheduleArr = Object.values(schedule)
    return scheduleArr.find(item => item.id === routineId);
  }

  const deleteExerciseContents = async () => {
    const exerciseId = props.id;
    const routineId = props.routineId;

    // Prevents the user from deleting a routine that is already set to their schedule
    if(checkScheduleForRoutine(routineId)) {
      alert("You cannot delete a routine that is set to you schedule");
      return
    }

    await authRequest.delete(DELETE_EXERCISE_URL + exerciseId, {
      headers: {
          "Authorization": "Bearer " + accessToken,
          "Access-Control-Allow-Origin": "*",
          'content-type': 'application/json'
      }}).then(
        res=> {
          if(res.status === 200) {
            dispatch(deleteExercise({exerciseId, routineId}));
          }
        }
      ).catch(e => {
        if (e.name === "RefreshTokenError"){
          // TODO add custom exception alert for user
          alert("Your session tokens have expired, please login to continue")
        } else console.log(e)
      })

  }

  return (

      <Grid  item width="100%" >
        <Grow style={{ transformOrigin: '0 0 0', opacity: 0.8  }} 
            // timeout={1000}  
            direction="up" in={true} mountOnEnter unmountOnExit>
          <Card  variant="outlined" sx={{backgroundColor:'secondary.main'}}>

            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item  align="left" >
                <Typography component="div"  align = "left" variant="h4" sx={{ flexGrow: 1 }}>
                  {props.name}
                </Typography>
              </Grid>
              <Grid item  align="left" >
                <Typography component="div"  align = "left" variant="h4" sx={{ flexGrow: 1 }}>
                  Reps/Sets: {props.repsSets}
                </Typography>
              </Grid>
              <Grid item  align="left" >
                <Typography component="div"  align = "left" variant="h4" sx={{ flexGrow: 1 }}>
                    Weight: {props.weight}
                </Typography>
              </Grid>
              <Grid item align = "right">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button onClick={()=>handleClickOpen()}><Menu/>Update</Button>
                  <UpdateExerciseDialog open={open} close={handleClose} 
                            id = {props.id}
                            name = {props.name} 
                            repsSets = {props.repsSets} 
                            weight = {props.weight} />
                  <Button onClick={()=>deleteExerciseContents()}><Delete/>Delete</Button>
                </ButtonGroup>
            </Grid>
          </Grid>
        </Card>
      </Grow>
   </Grid>
  )
}
