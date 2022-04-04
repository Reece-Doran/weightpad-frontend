import React, { useState } from 'react'
import { Grid, Typography, Card, ButtonGroup, Button, Grow } from '@mui/material';
import { Pageview, Menu } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import SetScheduleDialog from "../SetScheduleDialog/SetScheduleDialog"

export default function ScheduleCard(props) {
    const [openPopup, setOpenPopup] = useState(false)


    const handleClickOpen = () => {
    setOpenPopup(true);
    };

    const handleClose = () => {
    setOpenPopup(false);
    };

    const navigate = useNavigate();


    const viewExercises = () => {
        navigate("/exercises/" +props.routineId)
    }



  const viewBtn = <Button variant ="contained" onClick={() => viewExercises()}><Pageview/>View</Button>

  
  return (
      <Grid item width="80%" >

        <Grow in={true} style={{ transformOrigin: '0 0 0' , opacity: 0.8 }} 
                    // timeout={1000}  
                    // direction="up" 
                    mountOnEnter={true} unmountOnExit={true}>
            <Card  variant="outlined" sx={{backgroundColor:'secondary.main'}}>

                <Grid container direction="row" justifyContent="space-between">
                    <Grid item xs={12} align="left" >
                        <Typography component="div" variant="h4" sx={{ flexGrow: 1, textDecoration: 'underline', opacity: 1 }}>
                            {props.day}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} align = "left" >
                        <Typography component="div" variant="h4" sx={{ flexGrow: 1 }}>
                            {props.name?props.name:"available"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} align = "right" >
                        <ButtonGroup  variant="contained" align = "right" aria-label="outlined primary button group">
                        {props.name?viewBtn:""}
                        {/* TODO change icon */}
                        <Button variant ="contained" onClick={handleClickOpen}><Menu/>Select</Button>
                        <SetScheduleDialog scheduleId={props.scheduleId}
                            scheduleIndex = {props.pos}
                            day={props.day}
                            keepMounted
                            open={openPopup}
                            onClose={handleClose}
                            value={props.name?props.name:""}/>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Card>
        </Grow>
      </Grid>
  )
}