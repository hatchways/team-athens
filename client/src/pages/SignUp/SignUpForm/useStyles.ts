import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 15,
    paddingLeft: '5px',
    fontWeight: 'bolder',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
    border: 'none',
    minHeight: '40px',
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    height: 56,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

export default useStyles;
