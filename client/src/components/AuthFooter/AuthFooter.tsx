import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';

interface Props {
  linkTo: string;
  asideText: string;
  linkText: string;
}

const AuthFooter = ({ linkTo, asideText, linkText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.authHeader}>
      <Typography className={classes.accAside} style={{ display: 'inline' }}>
        {asideText}
      </Typography>
      <Link to={linkTo} className={classes.link}>
        <Typography color="primary" style={{ display: 'inline' }}>
          {linkText}
        </Typography>
      </Link>
    </Box>
  );
};

export default AuthFooter;
