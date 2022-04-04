import React, { useEffect, useState } from 'react';
import Routine from "../../components/Routine/Routine"
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Grid, Grow } from '@mui/material';
import { Add } from "@mui/icons-material";
import NewRoutineDialog from "../NewRoutineDialog/NewRoutineDialog"
import { useNavigate } from 'react-router-dom';


export default function RoutineConatiner() {
  const [routines, setRoutines] = useState();
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.value);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  useEffect(() => {

    if (userData) {
      const {routines} = userData;
      setRoutines(routines);
    }

  }, [userData])
  
  const routineList = 
      <Grid  container marginTop="15px" direction="column" alignItems="flex-start"  style={{minHeight:"100vh"}} spacing={1}>
        <Grow style={{ transformOrigin: '0 0 0' }} timeout={1000}  direction="up" in={true} mountOnEnter unmountOnExit>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={()=>handleClickOpen()}><Add/>Add Routine</Button>
            <NewRoutineDialog open={open} close={handleClose}/>
          </ButtonGroup>
        </Grow>
        {(routines)?routines.map((item) => {
              return (
                  <Routine 
                      key = {item.id} 
                      routineId = {item.id} 
                      name = {item.name} />
                      )
        }):""}
      </Grid>;

  return (
    userData?routineList:navigate("/")

  );
}
