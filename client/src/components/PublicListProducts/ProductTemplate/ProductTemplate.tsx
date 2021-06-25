import { Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Product } from '../../../interface/Product';
import useStyles from './useStyles';

interface Props {
  product: Product;
}

const ProductTemplate = ({ product }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.rootCard}>
      <div className={classes.cover}>
        <CardMedia image={product.pictureUrl} className={classes.cover} />
      </div>
      <div>
        <CardContent>
          <Typography component="h6" variant="h6">
            {product.name.substring(0, 60)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <a className={classes.link} href={product.url} target="_blank" rel="noreferrer">
              {product.url.substring(0, 40)}
            </a>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <strong className={classes.newPrice}>{product.price}</strong>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductTemplate;
