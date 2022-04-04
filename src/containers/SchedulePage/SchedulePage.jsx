import React from 'react';
import ScheduleContainer from "../../components/ScheduleContainer/ScheduleContainer"
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';


export default function SchedulePage() {
  const globalUserData = useSelector(
    (state) => state.user.value
  )
  return (
    <Container >
      {globalUserData?<ScheduleContainer/>:<Navigate to="/" />}
      
    </Container>

  );
}
