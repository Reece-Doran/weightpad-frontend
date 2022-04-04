import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { getUserData} from "../../store/features/user/userSlice"
import { Box, TextField, Button, Typography, Alert, Grid, Card } from '@mui/material';
import { getTokens } from '../../store/features/jwt/jwtSlice';

export default function Login() {

  
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.value);

  const loginUser = async (e) => {    
    e.preventDefault();

    const promiseResult = await dispatch(getTokens({username, password}));
    const { payload } = promiseResult;

    !payload || promiseResult.status===403? setAlert(true): await dispatch(getUserData({username}));
    navigate("/schedule");
  }

  useEffect(() => {
    if(userData) {
      navigate("/schedule")
    }
    return () => {
      
    }
  }, [userData, navigate])
  

  const loginComp = <Grid container direction="column" justifyContent="flex-start" alignItems="center" marginTop="50px" style={{minHeight:"100vh"}} spacing={1}>
                      <Grid item>
                        <Card sx={{backgroundColor: "secondary.main"}}>
                            <Box component = "form" onSubmit={loginUser} 
                              sx={{
                              borderRadius: 5, opacity: 0.8, width:"15em", height:"20em", marginTop:"50px", marginBottom:"-20px"}}
                              >
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                              <Grid item justifySelf="center">
                                <Typography variant= "h4" component="div" >Login</Typography>
                              </Grid>
                              <Grid item>
                                <TextField color="primary" margin="dense" variant="outlined" label="email" required size="small"onChange={e => setUsername(e.target.value)}/>

                              </Grid>
                              <Grid item>
                                <TextField color="primary" margin="dense" variant="outlined" label="password" required size="small"onChange={e => setPassword(e.target.value)}/>

                              </Grid>
                              <Grid item>
                                <Button variant="contained" color="primary" type="submit" >Submit</Button>        
                                {alert?<Alert severity="error">Please ensure your email and password are correct</Alert>:""}

                              </Grid>
                            </Grid>
                          </Box>
                        </Card> 
                      </Grid>
                    </Grid>
  
  return (
    <React.Fragment>
      {loginComp}
    </React.Fragment>
  );
}
