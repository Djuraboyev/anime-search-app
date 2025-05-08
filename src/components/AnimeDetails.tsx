import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  useTheme
} from '@mui/material';

const AnimeDetails: React.FC = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
      } catch (error) {
        console.error('Failed to fetch anime details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!anime) {
    return <Typography variant="h6" align="center">Anime not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardMedia
          component="img"
          image={anime.images.jpg.large_image_url}
          alt={anime.title}
          height="500"
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {anime.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {anime.type} | Episodes: {anime.episodes} | Score: {anime.score}
          </Typography>
          <Typography variant="body1" paragraph>
            {anime.synopsis}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AnimeDetails;
