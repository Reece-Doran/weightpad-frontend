import React from 'react'
import ExerciseContainer from "../../components/ExerciseContainer/ExerciseContainer";
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function ExercisePage(props) {

  const location = useLocation();

    const strRoutineId = location.pathname.replace("/exercises/", "");
    const intRoutineId = parseInt(strRoutineId);

  return (
    <Container>
      <ExerciseContainer routineId = {intRoutineId}/>
    </Container>
  )
}
