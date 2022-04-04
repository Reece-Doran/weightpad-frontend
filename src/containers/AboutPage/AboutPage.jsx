import { Card, Grid, Typography } from '@mui/material'
import React from 'react'

export default function AboutPage() {
  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="center"  marginTop= "15px" style={{minHeight:"100vh"}} spacing={1}>
      <Grid item>
        <Card sx={{backgroundColor: "secondary.main", margin:"15px 15px 15px 15px"}}>
          <Grid container direction="column" justifyContent="center" alignItems="center" marginTop="15px" spacing={1}>
            <Grid item justifySelf="center">
              <Typography variant='h3'>About Us</Typography> 
            </Grid>
            <Grid item>
              <Typography  variant='h6'>This is a notetaking application designed specifically for bodybuilding, 
                users should register an account and confirm it via email to gain access. </Typography> 
              <Typography variant='h6'>Once you have an account you can make rouines, add exercises to them as well as add and update information
                 such as weight lifted and reps/sets. </Typography> 
              <Typography variant='h6'>You can then add these routines to your weekly schedule - your home page - to quickly access them.</Typography> 
              <Typography variant='h6'>Later releases of this applictaion will include expanded notation capabilites, exercise analytics and a search functionality to query an external fitness database.</Typography> 
              
            </Grid>
          </Grid>
        </Card> 
      </Grid>
    </Grid>
  )
}
