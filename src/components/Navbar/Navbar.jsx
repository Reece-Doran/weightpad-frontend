import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearTokens } from "../../store/features/jwt/jwtSlice"
import { clearData } from "../../store/features/user/userSlice"
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@emotion/react';
import NavbarDrawer from '../NavbarDrawer/NavbarDrawer';


export default function Header() {
  const [underscore, setUnderscore] = useState(0);
  const globalUserData = useSelector(
    (state) => state.user.value
  )
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("sm"));


  const logout = () => {
    dispatch(clearTokens());
    dispatch(clearData());
    setUnderscore(0);
    return navigate("/");
  }

  const loggedIn =  <Tabs
                          sx={{ marginLeft: "auto" }}
                          indicatorColor="secondary"
                          textColor="inherit"
                          value={underscore}
                          onChange={(e, value) => setUnderscore(value)} 
                          >
                      <Tab label="Schedule" value={0} onClick={() => navigate("/schedule")}/>
                      <Tab label="Routines" value={1} onClick={() => navigate("/routines")}/>
                      <Tab label="About Us" value={2} onClick={() => navigate("/about")}/>
                      <Tab label="Logout" value={3} onClick={() => {logout()}}/>
                    </Tabs>

  const loggedOut =  <Tabs
                          sx={{ marginLeft: "auto" }}
                          indicatorColor="secondary"
                          textColor="inherit"
                          value={underscore}
                          onChange={(e, value) => setUnderscore(value)} 
                          >
                      <Tab label="About Us" value={2} onClick={() => navigate("/about")}/>
                      <Tab label="Login" value={0} onClick={() => navigate("/")}/>
                      <Tab label="Register" value={1} onClick={() => navigate("/register")}/>
                    </Tabs>

  const bigDisplay = globalUserData?loggedIn:loggedOut

  const navbar = <AppBar position="static">
                    <Toolbar sx ={{display:"flex", justifyContent:"space-between"}}>
                      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        WeightPad
                      </Typography>
                      {isMatch?bigDisplay:<NavbarDrawer/>}
                      
                    </Toolbar>
                  </AppBar>


  return (
    <React.Fragment>
      {navbar}
    </React.Fragment>

  );
}
