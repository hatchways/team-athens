import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5px 15px',
  },
  rootGrid: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
  },
  description: {
    marginLeft: '10px',
  },
  link: {
    color: 'grey',
  },
  oldPrice: {
    textDecoration: 'line-through',
    fontWeight: 'bolder',
  },
  newPrice: {
    color: 'red',
    fontWeight: 'bolder',
  },
  closeIconContainer: {
    textAlign: 'right',
  },
  cover: {
    width: 150,
    height: 150,
    margin: '5px',
  },
  rootCard: {
    display: 'flex',
    marginBottom: '15px',
  },
  progress: {
    width: 150,
    transform: 'translate(50px, 30px)',
  },
}));

export default useStyles;
