import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Background = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(https://images.pexels.com/photos/5706026/pexels-photo-5706026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', // 'url(https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  zIndex: -1,
});

const BorderContainer = styled(Container)({
  border: '2px solid #F08080',
  borderRadius: '15px',
  padding: '2rem',
  marginTop: '2rem',
});

const GradientOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, rgba(255,229,229,0.8) 0%, rgba(255,255,255,0.8) 100%)',
  zIndex: -1,
});

const AnimatedTypography = styled(Typography)(({ theme }) => ({
  animation: `${fadeIn} 2s ease-in-out`,
  color: theme.palette.text.primary,
}));

function Home() {
  return (
    <>
      <Background />
      <GradientOverlay />
      <BorderContainer maxWidth="md">
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
          <AnimatedTypography variant="h2" align="center" gutterBottom>
            Welcome To Purer Pores
          </AnimatedTypography>
          <AnimatedTypography variant="h5" align="center">
            Adult acne ends here! Explore skincare products from a wide variety of brands, build your skincare routine, and stick to it.
          </AnimatedTypography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0hnmpDR2fBiqwvGMh66ln8TmWOUIW78-qPQ&usqp=CAU"
              alt="Cute Icon"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          </div>
        </Container>
      </BorderContainer>
    </>
  );
}

export default Home;