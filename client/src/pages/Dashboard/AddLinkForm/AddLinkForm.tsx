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
import { List } from '../../../interface/List';
import { createProduct } from '../../../helpers/APICalls/product';
import { Product } from '../../../interface/Product';
interface Props {
  listData: List[];
  updateLists: () => Promise<void>;
}

export default function AddLinkForm({ listData, updateLists }: Props): JSX.Element {
  const classes = useStyles();

  const [selectInput, setSelectInput] = useState(listData.length > 0 ? listData[0].name : '');
  const [urlInput, setUrlInput] = useState('');

  const handleSelectChange = (event: any) => {
    setSelectInput(event.target.value);
  };
  const handleUrlInput = (event: any) => {
    setUrlInput(event.target.value);
  };

  const handleSubmit = async () => {
    const productDetails = {
      url: urlInput,
      name: 'temp name',
      price: 0,
      pictureUrl: '',
    } as unknown as Product;

    await createProduct(productDetails, selectInput);
    await updateLists();
  };

  return (
    <Grid className={classes.addLinkFormSection} container sm={10}>
      <Typography variant="h5" className={classes.addLinkFormTitle} align={'center'}>
        Add new item:
      </Typography>
      <form onSubmit={handleSubmit} className={classes.addLinkForm} noValidate autoComplete="off">
        <Grid container>
          <TextField
            id="standard-basic"
            label="Paste your link here"
            variant="standard"
            className={classes.urlFormInput}
            InputProps={{ disableUnderline: true }}
            value={urlInput}
            onChange={handleUrlInput}
          />
          <FormControl variant="standard" className={classes.selectField}>
            <InputLabel id="list-select-field">Select list</InputLabel>
            <Select
              labelId="list-select-field"
              id="demo-simple-select-filled"
              value={selectInput}
              onChange={handleSelectChange}
              disableUnderline={true}
            >
              {listData.map((list: List) => {
                return (
                  <MenuItem key={list.name} value={list._id}>
                    {list.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} className={classes.formButton} color="secondary" variant="contained">
            Add
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
