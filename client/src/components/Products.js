import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <form onSubmit={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={newProduct.name}
          onChange={handleNewProductChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Product description"
          value={newProduct.description}
          onChange={handleNewProductChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product price"
          value={newProduct.price}
          onChange={handleNewProductChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Product image URL"
          value={newProduct.image}
          onChange={handleNewProductChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Product category"
          value={newProduct.category}
          onChange={handleNewProductChange}
        />
          <input
          type="number"
          name="brand_id"
          placeholder="Product Brand ID"
          value={newProduct.brand_id}
          onChange={handleNewProductChange}
        />
        <button>Add Product</button>
    </form>
    <div className="product-list">
  {productsToShow.map((product) => (
    <ProductCard key={product.id} product={product} onDelete={deleteProduct} />
  ))}
</div>
    </div>
  );
}

export default Products;