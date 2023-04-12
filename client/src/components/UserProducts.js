import React, { useEffect, useState } from 'react';

function UserProducts() {
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/user_products')
      .then((response) => response.json())
      .then((data) => setUserProducts(data));
  }, []);

  return (
    <div>
      <h1>User Products</h1>
      <ul>
        {userProducts.map((userProduct) => (
          <li key={userProduct.id}>{userProduct.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserProducts;