import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onDelete }) {
  return (
    <div className="product-card">
      <img className="product-image" src={product.image} alt="Product" />
      <div className="product-details">
        <h3 className="product-name">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button className="delete-product" onClick={() => onDelete(product.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;