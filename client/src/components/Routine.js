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
    // if (!user) {
    //  console.error("User is undefined.");
    //  return;
   // }
    
    const productId = parseInt(e.target.value);
    console.log(e.target.value)
    if (!productId) {
      console.error("Product is undefined.");
      return;
    }
    const product = products.find((p) => p.id === productId);
    console.log('Selected product:', product);
    const updatedProduct = { ...product, user_id: user.id, step: currentStep };
    setRoutine([...routine, updatedProduct]);
  };
  
  const saveRoutine = () => {
    const dataToSend = routine.map(({ id, user_id, step }) => ({
      product_id: parseInt(id),
      user_id: parseInt(user_id),
      step_id: parseInt(step),
    }));

    // const accessToken = localStorage.getItem('accessToken');

    console.log("Data to send:", dataToSend);
    console.log('Routine data:', routine); // Added console.log

    fetch('/routine', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
       // 'Authorization': `Bearer ${accessToken}`
      },
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