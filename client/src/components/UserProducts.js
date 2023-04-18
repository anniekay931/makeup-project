import React, { useEffect, useState } from "react";

function UserProducts({ user }) {
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/user_products/${user.id}`)
        .then((resp) => resp.json())
        .then((data) => setUserProducts(data));
    }
  }, [user]);

return (
  <div>
    <h1>Your Saved Routines</h1>
    <ul>
      {userProducts.map((userProduct, index) => (
        <li key={index}>
          {userProduct.product.name} - Step {userProduct.step_id}
        </li>
      ))}
    </ul>
  </div>
);
}

export default UserProducts;