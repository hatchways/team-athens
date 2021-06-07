import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [age, setAge] = useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  return (
    <Grid className={classes.addLinkFormSection} container sm={10}>
      <Typography variant="h5" className={classes.addLinkFormTitle} align={'center'}>
        Add new item:
      </Typography>
      <form className={classes.addLinkForm} noValidate autoComplete="off">
        <Grid container>
          <TextField
            id="standard-basic"
            label="Paste your link here"
            variant="standard"
            className={classes.urlFormInput}
            InputProps={{ disableUnderline: true }}
          />
          <FormControl variant="standard" className={classes.selectField}>
            <InputLabel id="list-select-field">Select list</InputLabel>
            <Select
              labelId="list-select-field"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
              disableUnderline={true}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Shoes'}>Shoes</MenuItem>
              <MenuItem value={'Tech'}>Tech</MenuItem>
            </Select>
          </FormControl>
          <Button className={classes.formButton} color="secondary" variant="contained">
            Add
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
