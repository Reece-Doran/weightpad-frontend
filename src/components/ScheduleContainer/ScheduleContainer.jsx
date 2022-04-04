import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import ScheduleCard from "../ScheduleCard/ScheduleCard"


export default function ScheduleContainer() {

  const [scheduleContents, setScheduleContents] = useState()
  const [scheduleId, setScheduleId] = useState()
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday", "Sunday"];

  const scheduleObj = useSelector((state) => state.user.value.schedule);

  useEffect(() => {
    if (scheduleObj) {
      const {monday, tuesday, wednesday, thursday,firday, saturday, sunday, scheduleId} = scheduleObj;
      setScheduleId(scheduleId);
      setScheduleContents([monday, tuesday, wednesday, thursday,firday, saturday, sunday]);
    }

  }, [scheduleObj])
  

  return (  
    <Grid  container direction="column" alignItems="center" justifyContent="center" style={{minHeight:"100vh"}} spacing={1}>
      {(scheduleContents)?
      scheduleContents.map((item, pos) => {
        
        return(
          item?
            <ScheduleCard  key={pos} pos ={pos} scheduleId={scheduleId} routineId={item.id} name={item.name} day={days[pos]}/>
            : 
            <ScheduleCard key={pos} scheduleId={scheduleId} day={days[pos]} />
        )
      })
      
      :""}

    </Grid>
  )
}
