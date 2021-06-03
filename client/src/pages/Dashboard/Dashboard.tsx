import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import LogoImage from './../../Images/logo.png';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddIcon from '@material-ui/icons/Add';

import ClothesImage from '../../Images/clothes.png';
import FurnitureImage from '../../Images/furniture.png';
import LuxuryImage from '../../Images/luxury.png';
import NavBar from './NavBar/NavBar';
import AddLinkForm from './AddLinkForm/AddLinkForm';

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
      <NavBar loggedInUser={loggedInUser} />
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
        <AddLinkForm />

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
