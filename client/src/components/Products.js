import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    brand_id: '',
    category: '',
  });

  useEffect(() => {
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSearchTermChange = (event) => {
    console.log('Search term before update:', searchTerm);
    setSearchTerm(event.target.value);
    console.log('Search term after update:', event.target.value);
  };

  const handleNewProductChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const addProduct = (event) => {
    event.preventDefault();
    fetch('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((addedProduct) => {
        setProducts([...products, addedProduct]);
      });
  };

  const deleteProduct = (id) => {
    fetch(`/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== id));
        } else {
          console.log('Failed to delete the product');
        }
      });
  };

  // Filter products based on search term
  const productsToShow = products.filter((product) =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h2" align="center" gutterBottom>
        Products
      </Typography>
      <Box mb={4} display="flex" justifyContent="center">
        <TextField
          label="Search products"
          value={searchTerm}
          onChange={handleSearchTermChange}
          variant="outlined"
          style={{ width: '50%' }}
        />
      </Box>
      <form onSubmit={addProduct}>
        <Box mb={2} display="flex" justifyContent="space-around" flexWrap="wrap">
          <TextField
            label="Product name"
            name="name"
            value={newProduct.name}
            onChange={handleNewProductChange}
            variant="outlined"
            style={{ width: '30%', marginBottom: '1rem' }}
          />
          <TextField
            label="Product description"
            name="description"
            value={newProduct.description}
            onChange={handleNewProductChange}
            variant="outlined"
            style={{ width: '30%', marginBottom: '1rem' }}
          />
          <TextField
            label="Product price"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
            variant="outlined"
            type="number"
            style={{ width: '30%', marginBottom: '1rem' }}
          />
          <TextField
            label="Product image URL"
            name="image"
            value={newProduct.image}
            onChange={handleNewProductChange}
            variant="outlined"
            style={{ width: '30%', marginBottom: '1rem' }}
          />
          <TextField
            label="Product category"
            name="category"
            value={newProduct.category}
            onChange={handleNewProductChange}
            variant="outlined"
            style={{ width: '30%', marginBottom: '1rem' }}
          />
          <TextField
            label="Product Brand ID"
            name="brand_id"
            value={newProduct.brand_id}
            onChange={handleNewProductChange}
            variant="outlined"
            type="number"
            style={{ width: '30%', marginBottom: '1rem' }}
          />
        </Box>
        <Box mb={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" type="submit">
            Add Product
          </Button>
        </Box>
      </form>
      <Grid container spacing={4}>
        {productsToShow.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard key={product.id} product={product} onDelete={deleteProduct} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Products;