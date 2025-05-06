import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/anime/1'); 
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://example.com/banner.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h3" gutterBottom>
         Welcome to Anime Search App
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          More Details
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
