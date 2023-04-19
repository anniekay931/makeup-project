import React, { useEffect, useState, useContext } from "react";
import UserContext from "./UserContext";
import AddUserProduct from "./AddUserProduct";

function UserProducts() {
  const { user } = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/user_products/${user.id}`)
        .then((resp) => resp.json())
        .then((data) => setUserProducts(data));
    }
  }, [user]);

  console.log("User in UserProducts", user);

  const handleUserProductAdded = (userProduct) => {
    setUserProducts((prevUserProducts) => [...prevUserProducts, userProduct]);
  };

return (
  <div>
    <h1>Your Saved Routines</h1>
    {user && <AddUserProduct onUserProductAdded={(newUserProducts) => setUserProducts([...userProducts, ...newUserProducts])} />}
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