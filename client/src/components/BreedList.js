import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  list: {
    border: '2px solid #fff'
  }
}));

export default function BreedList(props) {
  const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      className={classes.list}
      options={props.breedOptions}
      getOptionLabel={(option) => option.breed}
      onChange={props.submitHandler}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} 
          label="Search breeds." variant="outlined" />}
    />
  );
}