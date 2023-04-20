import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, CardMedia } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const Background = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(https://images.pexels.com/photos/5706026/pexels-photo-5706026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  zIndex: -1,
});

const BorderContainer = styled(Container)({
  border: '2px solid #F08080',
  borderRadius: '15px',
  padding: '2rem',
  marginTop: '2rem',
  backgroundColor: 'white', // Add white background to the border container
});

function ProductDetails({ match }) {
  console.log('Product details component loaded');
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    fetch(`/products/${match.params.productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [match.params.productId]);

  const handleInputChange = (event) => {
    setUpdatedProduct({ ...updatedProduct, [event.target.name]: event.target.value });
  };

  console.log(updatedProduct)

  const updateProduct = () => {
    if (!product || !product.id) {
      console.error("Product or product ID is undefined");
      return;
    }

    fetch(`/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
        setIsEditing(false);
      });
  };

  const deleteProduct = () => {
    fetch(`/products/${product.id}`, {
      method: 'DELETE',
    }).then(() => {
      // Redirect to the products page after successful deletion
      window.location.href = '/products';
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Background />
      <BorderContainer maxWidth="md">
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      {isEditing ? (
        <Box>
          <TextField
            label="Product Name"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Product Image URL"
            name="image"
            value={updatedProduct.image}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Product Description"
            name="description"
            value={updatedProduct.description}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Product Category"
            name="category"
            value={updatedProduct.category}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Product Brand ID"
            name="brand_id"
            value={updatedProduct.brand_id}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Product Price"
            name="price"
            value={updatedProduct.price}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          {/* Add more TextField components for other properties */}
          <img
            src={product.image}
            alt={product.name}
            sx={{
              maxWidth: '100%',
              maxHeight: '300px',
            }}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={updateProduct}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
<Box>
        <Typography variant="h4" color="textSecondary">
          {product.name}
        </Typography>
        <img
          src={product.image}
          alt={product.name}
          sx={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '300px',
            margin: '1rem 0',
          }}
        />
        <Typography color="textSecondary">Brand ID: {product.brand_id}</Typography>
        <Typography color="textSecondary">Category: {product.category}</Typography>
        <Typography color="textSecondary">Description: {product.description}</Typography>
        <Typography color="textSecondary">Price: ${product.price}</Typography>
        {/* Display other product properties */}
        <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={deleteProduct}>
              Delete
            </Button>
        </Box>
      </Box>
    )}
        </Container>
      </BorderContainer>
    </>
  );
}

export default ProductDetails;

