import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5px 15px',
  },
  rootGrid: {
    flexGrow: 1,
  },
  image: {
    width: '50px',
    maxHeight: '50px',
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
}));

export default useStyles;
