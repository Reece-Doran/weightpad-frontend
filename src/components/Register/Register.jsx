import React, { useState } from 'react';
import axios from "axios";
import { USER_REGISTRATION_URL } from "../../config/config";
import { Box, TextField, Button, Typography, Alert, Grid, Card} from '@mui/material';

export default function Register() {


  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [reconfirmPassword, setReconfirmPassword] = useState();

  const [alert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  

  
  const  registerUser = async (e) => {
    e.preventDefault();
    if (password !== reconfirmPassword) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Your passwords do not match");
      return
    }
    console.log(username, password);
    await axios.post(USER_REGISTRATION_URL, {
        username: username, 
        password: password
    }).catch(e=>console.log(e));

      setAlert(true);
      setAlertSeverity("success");
      setAlertMsg("A confirmation email has been sent to your inbox, please confirm your account to login");
      
  }

  return (
    <React.Fragment>
      <Grid container direction="column" justifyContent="flex-start" alignItems="center" marginTop="50px" style={{minHeight:"100vh"}} spacing={1}>
        <Grid item>
          <Card sx={{backgroundColor: "secondary.main"}}>
              <Box component = "form" onSubmit={registerUser} 
                sx={{
                borderRadius: 5, opacity: 0.8, width:"15em", height:"20em", marginTop:"50px", marginBottom:"-20px"}}
                >
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item justifySelf="center">
                  <Typography variant= "h4" component="div" >Register</Typography>
                </Grid>
                <Grid item>
                  <TextField color="primary" margin="dense" variant="outlined" label="email" required size="small"onChange={e => setUsername(e.target.value)}/>

                </Grid>
                <Grid item>
                  <TextField color="primary" margin="dense" variant="outlined" label="password" required size="small"onChange={e => setPassword(e.target.value)}/>

                </Grid>
                <Grid item>
                <TextField color="primary" margin="dense" variant="outlined" label="confirm password" required size="small"onChange={e => setReconfirmPassword(e.target.value)}/>

                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit" >Submit</Button>        
                </Grid>
              </Grid>
            </Box>
          </Card> 
        </Grid>
      {alert?<Alert severity={alertSeverity}>{alertMsg}</Alert>:""}
      </Grid>
    </React.Fragment>
  )
}
