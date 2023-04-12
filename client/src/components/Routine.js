import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


function Routine() {
  const [routine, setRoutine] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const history = useHistory();

  useEffect(() => {
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToRoutine = (product) => {
    const updatedProduct = { ...product, step: currentStep };
    setRoutine([...routine, updatedProduct]);
  };

  const saveRoutine = () => {
    fetch('/user_products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(routine),
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
        <select onChange={(e) => addToRoutine(products.find(product => product.id === parseInt(e.target.value)))}>
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