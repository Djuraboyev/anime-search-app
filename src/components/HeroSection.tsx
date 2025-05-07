import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(https://wallpapercave.com/wp/wp5128398.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Anime Search App
      </Typography>
      <TextField
        placeholder="Search anime..."
        variant="outlined"
        InputProps={{
          sx: {
            width: '1200px',
            maxWidth: '100%',
            backgroundColor: '#fff',
            color: '#000',
            input: { color: '#000' }, 
          },
        }}
      />
    </Box>
  );
};

export default HeroSection;

