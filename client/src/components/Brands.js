import React, { useEffect, useState } from 'react';

function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch('/brands')
      .then((response) => response.json())
      .then((data) => setBrands(data));
  }, []);

  return (
    <div>
      <h1>Brands</h1>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Brands;