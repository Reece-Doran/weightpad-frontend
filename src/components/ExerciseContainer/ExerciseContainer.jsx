import React, { useEffect, useState }  from 'react'
import Exercise from "../../components/Exercise/Exercise"
import NewExerciseDialog from "../../components/NewExerciseDialog/NewExerciseDialog"
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Grid, Grow} from '@mui/material';
import { Add, ArrowBack } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';


export default function ExerciseContainer(props) {
    const [exercises, setExercises] = useState(props.exercises);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const findCurrentRoutine = (routine) => {
      return routine.id === props.routineId
    }
    
    const routineSelector = useSelector((state) => state.user.value.routines.find(findCurrentRoutine).exercises);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    
    const handleClose = () => {
      setOpen(false);
    };

    const goBack = () => {
      navigate("/routines")
    }
    
    useEffect(() => {

      setExercises(routineSelector)
  
    }, [routineSelector])
    
    
  return (
    
    <Grid container marginTop="15px" direction="column" alignItems="flex-start"  style={{minHeight:"100vh"}} spacing={1}>
      <Grow style={{ transformOrigin: '0 0 0' }} timeout={1000}  direction="up" in={true} mountOnEnter unmountOnExit>

        <ButtonGroup sx={{margin:"5px 0px 5px 0px"}} variant="contained" aria-label="outlined primary button group">
            <Button onClick={()=>handleClickOpen()}><Add/>Add Exercise</Button>
            <NewExerciseDialog routineId = {props.routineId} open={open} close={handleClose}/>
            <Button onClick={() => goBack()}><ArrowBack/>Routines</Button>
        </ButtonGroup>
      </Grow>
        {exercises?exercises.map((item, pos) => {
            return (
                <Exercise key = {item.id} 
                    id = {item.id} 
                    routineId = {item.routineId} 
                    name = {item.name} 
                    repsSets = {item.repsSets} 
                    weight = {item.weight} 
                  />
            )
        }):""}

    </Grid>
  )
}