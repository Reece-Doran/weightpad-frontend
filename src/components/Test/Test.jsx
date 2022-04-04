import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

export default function Test() {

  // const globalUserData = useSelector(
  //   (state) => state.user.value
  // )
  // const accessToken = useSelector(
  //   (state) => state.jwt.value.accessToken
  // )
  // const username = useSelector(
  //   (state) => state.user.username
  // )

  // const {routines} = globalUserData;

  // const test = () => {
  //   console.log(globalUserData)
  //   console.log("access token: "+accessToken)
  //   console.log("routines: "+routines)
  // }

  return (
    <div>
        <h1>This is my test page</h1>
        {/* <span>Your email is {username}</span>
        <Button  color="secondary"  onClick={e => test()}>test</Button> */}
        
    </div>
  );
}
