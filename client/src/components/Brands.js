import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch('/brands')
      .then((response) => response.json())
      .then((data) => setBrands(data));
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h2" align="center" gutterBottom>
        Brands
      </Typography>
      <Grid container spacing={4}>
        {brands.map((brand) => (
          <Grid item key={brand.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {brand.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Brands;