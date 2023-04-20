import React from 'react';
import { Container, Typography } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h2" align="center" gutterBottom>
        Welcome To Purer Pores
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0hnmpDR2fBiqwvGMh66ln8TmWOUIW78-qPQ&usqp=CAU"
          alt="Cute Icon"
          style={{ maxWidth: '100%', maxHeight: '200px' }}
        />
      </div>
      <Typography variant="h5" align="center">
        Adult acne ends here! Explore skincare products from a wide variety of brands, build your skincare routine, and stick to it.
      </Typography>
    </Container>
  );
}

export default Home;