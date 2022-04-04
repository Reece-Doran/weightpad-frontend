import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {DialogTitle, DialogContent, DialogActions, Dialog, RadioGroup, Radio, FormControlLabel} from '@mui/material/';
import { SET_SCHEDULE_URL } from "../../config/config"
import { getSchedule } from "../../store/features/user/userSlice"
import { authRequest } from "../../config/axios/axios"


export default function SetScheduleDialog(props) {
  const { onClose, value: valueProp, open } = props;

  //this value is the routine ID taken from the radio popup option
  const [routineId, setRoutineId] = useState(valueProp);
  const radioGroupRef = useRef(null);

  const dispatch = useDispatch();

  const routines = useSelector((state) => state.user.value.routines);

  const accessToken = useSelector(
    (state) => state.jwt.value.accessToken
  )

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };


  const commitSetSchedule = async () =>{
    const scheduleId = props.scheduleId
    await authRequest.put(SET_SCHEDULE_URL+scheduleId +"/"+routineId+"?day="+props.day.toLowerCase(),{}, {
      headers: {
          "Authorization": "Bearer " + accessToken,
          "Access-Control-Allow-Origin": "*",
          'content-type': 'application/json'
      }}).then(
        res => {
          if(res.status === 200) {
            dispatch(getSchedule({scheduleId}))
          }
        }
      ).catch(e=>{
        if (e.name === "RefreshTokenError"){
        // TODO add custom exception alert for user
        alert("Your session tokens have expired, please login to continue")
      }})
  }


  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    commitSetSchedule(routineId)
    onClose();
  };

  const handleChange = (event) => {
    setRoutineId(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      
    >
      <DialogTitle>Set routine for {props.day}</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="set-schedule"
          name="set-schedule"
          value={routineId}
          onChange={handleChange}
        >
          {routines.map((item) => (
            <FormControlLabel
              value={item.id}
              key={item.id}
              control={<Radio />}
              label={item.name}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
// SetScheduleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     value: PropTypes.string.isRequired,
//   };
  

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Dialog from '@mui/material/Dialog';
// import RadioGroup from '@mui/material/RadioGroup';
// import Radio from '@mui/material/Radio';
// import FormControlLabel from '@mui/material/FormControlLabel';

// const options = [
//   'None',
//   'Atria',
//   'Callisto',
//   'Dione',
//   'Ganymede',
//   'Hangouts Call',
//   'Luna',
//   'Oberon',
//   'Phobos',
//   'Pyxis',
//   'Sedna',
//   'Titania',
//   'Triton',
//   'Umbriel',
// ];
// SetScheduleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     value: PropTypes.string.isRequired,
//   };

// export default function SetScheduleDialog(props) {
// //   const { onClose, value: valueProp, open, ...other } = props;
//   const [value, setValue] = React.useState();
//   const radioGroupRef = React.useRef(null);

// //   React.useEffect(() => {
// //     if (!open) {
// //       setValue(valueProp);
// //     }
// //   }, [valueProp, open]);

//   const handleEntering = () => {
//     if (radioGroupRef.current != null) {
//       radioGroupRef.current.focus();
//     }
//   };

// //   const handleCancel = () => {
// //     onClose();
// //   };

//   const handleOk = () => {
//     // onClose(value);
//   };

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   return (
//     <Dialog
//       sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
//       maxWidth="xs"
//       TransitionProps={{ onEntering: handleEntering }}
//       open={props.open}
//     //   {...other}
//     >
//       <DialogTitle>Phone Ringtone</DialogTitle>
//       <DialogContent dividers>
//         <RadioGroup
//           ref={radioGroupRef}
//           aria-label="ringtone"
//           name="ringtone"
//           value={value}
//           onChange={handleChange}
//         >
//           {options.map((option) => (
//             <FormControlLabel
//               value={option}
//               key={option}
//               control={<Radio />}
//               label={option}
//             />
//           ))}
//         </RadioGroup>
//       </DialogContent>
//       <DialogActions>
//         <Button autoFocus onClick={()=>props.close()}>
//           Cancel
//         </Button>
//         <Button onClick={handleOk}>Ok</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }


