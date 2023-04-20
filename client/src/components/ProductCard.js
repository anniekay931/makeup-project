import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';


function ProductCard({ product, onDelete }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/products/${product.id}`}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt="Product"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.category}
          </Typography>
          <Typography variant="h6">${product.price}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" onClick={() => onDelete(product.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;





