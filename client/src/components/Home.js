import React from 'react';
import { Container, Typography } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h2" align="center" gutterBottom>
        Welcome To Purer Pores
      </Typography>
      <Typography variant="h5" align="center">
        Adult acne ends here! Explore skincare products from a wide variety of brands, build your skincare routine, and stick to it.
      </Typography>
    </Container>
  );
}

export default Home;