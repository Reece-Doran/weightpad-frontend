import React from 'react'
import { Typography, Card, ButtonGroup, Button, Grid, Grow, Slide } from '@mui/material';
import { Pageview, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_ROUTINE_URL } from "../../config/config";
import { deleteRoutine } from "../../store/features/user/userSlice"
import { useNavigate } from 'react-router-dom';
import { authRequest } from "../../config/axios/axios" 

export default function Routine(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(
    (state) => state.jwt.value.accessToken
  )

  const schedule = useSelector(
    (state) => state.user.value.schedule
  )


  const viewExercises = () => {
    navigate("/exercises/" +props.routineId)
  }

  
    //used for checking schedule for routine, returns the routine if found
    const checkScheduleForRoutine = (routineId) => {
      const scheduleArr = Object.values(schedule)
      return scheduleArr.find(item => item?item.id === routineId:undefined);
    }
  const deleteRoutineContents = async (routineId) => {

    // Prevents the user from deleting a routine that is already set to their schedule
    if(checkScheduleForRoutine(routineId)) {
      alert("You cannot delete a routine that is set to your schedule");
      return
    }

    await authRequest.delete(DELETE_ROUTINE_URL+routineId, {
      headers: {
          "Authorization": "Bearer " + accessToken,
          "Access-Control-Allow-Origin": "*",
          'content-type': 'application/json'
      }}).then(
        res => {
          if(res.status === 200) {
            dispatch(deleteRoutine(routineId))
          }
        }
      ).catch(e=>{
        if (e.name === "RefreshTokenError"){
          // TODO add custom exception alert for user
          alert("Your session tokens have expired, please login to continue")
        }
        console.log(e);
      })
  }
  
  // sx={{outline: "1px solid red"}}
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
                    <Grid item xs={12} sm={6} align = "right">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                          <Button onClick={() => viewExercises()}><Pageview/>View</Button>
                          <Button onClick={() => deleteRoutineContents(props.routineId)}><Delete/>Delete</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
          </Card>
         </Grow>
      </Grid>
  )
}
