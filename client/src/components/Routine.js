import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Routine({ user, products }) {
  console.log('User:', user, 'Products:', products);
  const [routine, setRoutine] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      fetch(`/user_products/${user.id}`)
        .then((response) => response.json())
        .then((data) => setRoutine(data));
    }
  }, [user, products]);
  
  const addToRoutine = (e) => {
    const productId = parseInt(e.target.value);
    if (!user || !productId) {
      console.error("User or product is undefined.");
      return;
    }
    const product = products.find((p) => p.id === productId);
    console.log('Selected product:', product); // Added console.log
    const updatedProduct = { ...product, user_id: user.id, step: currentStep };
    setRoutine([...routine, updatedProduct]);
  };
  
  const saveRoutine = () => {
    const dataToSend = routine.map(({ id, user_id, step }) => ({
      product_id: parseInt(id),
      user_id: parseInt(user_id),
      step_id: parseInt(step),
    }));
    console.log("Data to send:", dataToSend);
    console.log('Routine data:', routine); // Added console.log

    fetch('/user_products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        history.push('/user_products');
      });
  };

  return (
    <div>
      <h1>Makeup Routine</h1>
      <ul>
        {routine.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
      <div>
        <h2>Add Product to Routine</h2>
        <select onChange={addToRoutine}>
          <option value="">Select a product...</option>
            {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
        </select>
      </div>
      <button onClick={saveRoutine}>Save Routine</button>
      <button onClick={() => setCurrentStep(currentStep + 1)}>Next Step</button>
    </div>
  );
}

export default Routine;