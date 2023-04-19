import React, { useState, useContext } from "react";
import UserContext from "./UserContext"

function AddUserProduct({ onUserProductAdded }) {
  const { user } = useContext(UserContext);  
  const [productId, setProductId] = useState("");
  const [stepId, setStepId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!user) {
      console.error("User is not defined.");
      return;
    }
  
    const newUserProduct = {
      user_id: user.id,
      product_id: parseInt(productId),
      step_id: parseInt(stepId),
    };

    console.log("User in AddUserProduct:", user);
  
    fetch("/user_products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([newUserProduct]),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setProductId("");
          setStepId("");
          onUserProductAdded(data); // Call the function passed as prop
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product ID:
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </label>
      <label>
        Step ID:
        <input
          type="number"
          value={stepId}
          onChange={(e) => setStepId(e.target.value)}
        />
      </label>
      <button type="submit">Add User Product</button>
    </form>
  );
}

export default AddUserProduct;