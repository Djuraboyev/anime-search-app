import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, CircularProgress, Typography, Button } from '@mui/material';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime details:', error);
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!anime) {
    return <Typography variant="h6">Anime not found</Typography>;
  }

  return (
    <Container>
      <Button onClick={() => window.history.back()} variant="outlined">
        Back to Search
      </Button>
      <Typography variant="h3" gutterBottom>
        {anime.title}
      </Typography>
      <img src={anime.images.jpg.large_image_url} alt={anime.title} style={{ maxWidth: '100%' }} />
      <Typography variant="body1" paragraph>
        <strong>Synopsis:</strong> {anime.synopsis}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Rating:</strong> {anime.rating}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Episodes:</strong> {anime.episodes}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Premiered:</strong> {anime.premiered}
      </Typography>
    </Container>
  );
};

export default DetailPage;
