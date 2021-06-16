import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  cardBox: {
    width: '550px',
    maxWidth: '100%',
    marginTop: '4rem',
    height: '450px',
  },
  followButton: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '1px solid lightgrey',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  listItem: {
    padding: theme.spacing(3),
  },
  pageTitle: {
    fontWeight: 600,
    marginBottom: '2rem',
  },
}));

export default useStyles;
