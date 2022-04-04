import React from 'react';
import { Navigate } from "react-router-dom"
import RoutineContainer from "../../components/RoutineContainer/RoutineContainer"
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';


export default function RoutinePage() {

  const globalUserData = useSelector(
    (state) => state.user.value
  )

  return (
    <Container>
      {globalUserData?<RoutineContainer/>:<Navigate to="/" />}
    </Container>

  );
}
