import { Box, Grid, Switch, Typography } from '@material-ui/core';
import { useState } from 'react';
import { List } from '../../interface/List';
import useStyles from './useStyles';

/**
 * @member listAccess:boolean | true if list is private, false if not
 * @member setlistAccess: React.Dispatch<React.SetStateAction<boolean>> | changes listAccess state
 */
interface Props {
  listAccess: boolean;
  setListAccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleListAccess = ({ listAccess, setListAccess }: Props): JSX.Element => {
  const classes = useStyles();
  const [checked, setChecked] = useState(listAccess);

  const toggleChecked = () => {
    setChecked((state) => !state);
    setListAccess(checked);
  };

  return (
    <Box textAlign="center" className={classes.root}>
      <Grid>
        <Typography className={classes.label}>Toggle the switch bellow to set the list access</Typography>
        <Grid container alignItems="center" spacing={1}>
          <Grid className={classes.marginAuto} item>
            <Grid component="label" item>
              Private List
            </Grid>
            <Switch checked={checked} onChange={toggleChecked} color="primary" />
            <Grid component="label" item>
              Public List
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToggleListAccess;
