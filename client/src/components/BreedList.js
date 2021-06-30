import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  list: {
    border: '2px solid #fff'
  },
  paper: {
    padding: "15px",
  }
}));

export default function BreedList(props) {
  const classes = useStyles();
  return (
    <Paper elevation={4} className={classes.paper}>
      <Autocomplete
        id="combo-box-demo"
        className={classes.list}
        options={props.breedOptions}
        getOptionLabel={(option) => option.breed}
        onChange={props.submitHandler}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} 
            label="Search breeds" variant="outlined" />}
      />
    </Paper>
  );
}