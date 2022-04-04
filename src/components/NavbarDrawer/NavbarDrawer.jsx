import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { clearTokens } from "../../store/features/jwt/jwtSlice"
import { clearData } from "../../store/features/user/userSlice"


const NavbarDrawer = () => {

    const globalUserData = useSelector(
        (state) => state.user.value
      )
      
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = () => {
        dispatch(clearTokens());
        dispatch(clearData());
        return navigate("/");
      }

    const loggedIn = <React.Fragment>
                        <Drawer 
                        // sx={{backgroundColor:"secondary"}}
                            anchor="right"
                            open={openDrawer}
                            onClose={() => setOpenDrawer(false)}>
                            <List >
                                <ListItemButton >
                                    <ListItemIcon>
                                        <ListItemText onClick={() => navigate("/schedule")}>Schedule</ListItemText>
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <ListItemText onClick={() => navigate("/routines")}>Routines</ListItemText>
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <ListItemText onClick={() => navigate("/about")}>About Us</ListItemText>
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <ListItemText onClick={() => logout()}>Logout</ListItemText>
                                    </ListItemIcon>
                                </ListItemButton>
                            </List>
                        </Drawer>
                        <IconButton
                            sx={{ color: "inherit", marginLeft: "auto" }}
                            onClick={() => setOpenDrawer(!openDrawer)}>
                            <MenuIcon color="white" />
                        </IconButton>
                    </React.Fragment>


    const loggedOut = <React.Fragment>
                <Drawer 
                    anchor="right"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}>
                    <List >
                        <ListItemButton >
                            <ListItemIcon>
                                <ListItemText onClick={() => navigate("/about")}>About Us</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton >
                            <ListItemIcon>
                                <ListItemText onClick={() => navigate("/")}>Login</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton >
                            <ListItemIcon>
                                <ListItemText onClick={() => navigate("/register")}>Register</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Drawer>
                <IconButton
                        sx={{ color: "inherit", marginLeft: "auto" }}
                        onClick={() => setOpenDrawer(!openDrawer)}>
                        <MenuIcon color="white" />
                    </IconButton>
                </React.Fragment>

    return (
        <React.Fragment>
            {globalUserData?loggedIn:loggedOut}
        </React.Fragment>
    )
}

export default NavbarDrawer