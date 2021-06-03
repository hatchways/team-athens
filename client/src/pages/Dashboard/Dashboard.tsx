import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Paper } from '@material-ui/core';
import Image from 'material-ui-image';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import LogoImage from './../../Images/logo.png';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { shadows } from '@material-ui/system';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from '@material-ui/icons/Add';

import ClothesImage from '../../Images/clothes.png';
import FurnitureImage from '../../Images/furniture.png';
import LuxuryImage from '../../Images/luxury.png';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [age, setAge] = useState('');

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }
  // 550 775 950
  // 550 225 175
  // 56% 24% 20%
  //.
  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.customizeToolbar}>
          <Typography className={classes.logo}>Deals Mate</Typography>
          <Box className={classes.headerButtonGroup}>
            <Button color="inherit">Shopping List</Button>
            <Button color="inherit">Friends</Button>
            <Button color="inherit">
              <Badge variant="dot" color="secondary" invisible={false}>
                Notifications
              </Badge>
            </Button>
          </Box>
          <Box className={classes.userPanel}>
            <Avatar alt="Profile Image" />
            <Typography variant="h5" className={classes.userText}>
              {loggedInUser.username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Paper>
        <Image src={LogoImage} />
      </Paper> */}
      {/* <Grid item className={classes.drawerWrapper}> */}
      {/* <ChatSideBanner loggedInUser={loggedInUser} /> */}
      {/* </Grid> */}

      {/* <Paper variant="outlined">
        <Image src={LogoImage} className={classes.logo} />
      </Paper> */}

      <Grid className={classes.pageContent}>
        <Grid className={classes.addLinkFormSection}>
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
              />
              <FormControl variant="standard" className={classes.selectField}>
                <InputLabel id="list-select-field">Select list</InputLabel>
                <Select labelId="list-select-field" id="demo-simple-select-filled" value={age} onChange={handleChange}>
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

        <Grid className={classes.shoppingListsContentArea}>
          <Typography variant="h5" align={'left'} className={classes.shoppingListsTitle}>
            My Shopping Lists:
          </Typography>
          {/*  */}
          <Grid container className={classes.cardsContainer}>
            <Card className={classes.shoppingListCard}>
              <CardActionArea className={classes.shoppingListButton}>
                <CardMedia className={classes.media} image={ClothesImage} title="Card image" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align={'center'}>
                    Clothes
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
                    34 items
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.shoppingListCard}>
              <CardActionArea className={classes.shoppingListButton}>
                <CardMedia className={classes.media} image={ClothesImage} title="Card image" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align={'left'}>
                    Clothes
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
                    34 items
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.shoppingListCard}>
              <CardActionArea className={classes.shoppingListButton}>
                <CardMedia className={classes.media} image={ClothesImage} title="Card image" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align={'left'}>
                    Clothes
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
                    34 items
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.shoppingListCard}>
              <CardActionArea className={classes.shoppingListButton}>
                <CardMedia className={classes.media} image={ClothesImage} title="Card image" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align={'left'}>
                    Clothes
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
                    34 items
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.shoppingListCard}>
              <CardActionArea className={classes.shoppingListButton}>
                <CardMedia className={classes.media} image={ClothesImage} title="Card image" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align={'left'}>
                    Clothes
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
                    34 items
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.shoppingListCard}>
              <CardActionArea className={classes.shoppingListButton}>
                <CardMedia className={classes.media} image={ClothesImage} title="Card image" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align={'left'}>
                    Clothes
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
                    34 items
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.shoppingListCard}>
              <CardActionArea className={classes.shoppingListButton}>
                <CardMedia className={classes.media} image={ClothesImage} title="Card image" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align={'left'}>
                    Clothes
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
                    34 items
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            {/* /////////////////// */}
            <Card className={classes.shoppingListCard}>
              <CardActionArea className={classes.shoppingListButton}>
                <Grid>
                  <AddIcon color="secondary" className={classes.addNewListIcon} />
                </Grid>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align={'center'}>
                    ADD NEW LIST
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
