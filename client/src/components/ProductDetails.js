import React, { useState, useEffect } from 'react';

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
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            defaultValue={product.name}
            onChange={handleInputChange}
          />
           <input
            type="text"
            name="image"
            placeholder="Product Image URL"
            defaultValue={product.image}
            onChange={handleInputChange}
          />
           <input
            type="text"
            name="description"
            placeholder="Product Description"
            defaultValue={product.description}
            onChange={handleInputChange}
          />
           <input
            type="text"
            name="category"
            placeholder="Product Category"
            defaultValue={product.category}
            onChange={handleInputChange}
          />
           <input
            type="number"
            name="brand_id"
            placeholder="Product Brand ID"
            defaultValue={product.brand_id}
            onChange={handleInputChange}
          />
           <input
            type="number"
            name="price"
            placeholder="Product Price"
            defaultValue={product.price}
            onChange={handleInputChange}
          />
          {/* Add more input fields for other properties */}
          <button onClick={updateProduct}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{product.name}</h1>
          <img src={product.image} alt={product.name} />
          <p>Brand ID: {product.brand_id}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          {/* Display other product properties */}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
}

export default ProductDetails;