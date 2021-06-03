import useStyles from './useStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';

export default function NavBar({ loggedInUser }: any): JSX.Element {
  const classes = useStyles();

  const handleProfileClick = () => {
    console.log('click');
  };

  return (
    <AppBar position="static" className={classes.navRoot}>
      <Toolbar className={classes.customizeToolbar}>
        <Typography className={classes.logo}>Deals Mate</Typography>
        <Box className={classes.headerButtonGroup}>
          <Button>Shopping List</Button>
          <Button>Friends</Button>
          <Button>
            <Badge variant="dot" color="secondary" invisible={false}>
              Notifications
            </Badge>
          </Button>
        </Box>

        <Chip
          label={loggedInUser.username}
          className={classes.userChip}
          color="primary"
          clickable
          onClick={handleProfileClick}
          avatar={<Avatar style={{ height: '38px', width: '38px' }} src="/static/images/avatar/1.jpg" />}
        />
      </Toolbar>
    </AppBar>
  );
}
