import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Grid,
  Container,
} from '@mui/material';

interface AnimeDetail {
  title: string;
  synopsis: string;
  images: {
    jpg: { image_url: string };
  };
  score?: number;
  genres: { name: string }[];
  year?: number;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!anime) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Anime not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom>
            {anime.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {anime.synopsis}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
            {anime.genres.map((genre) => (
              <Chip key={genre.name} label={genre.name} />
            ))}
          </Box>
          <Typography variant="subtitle1" mt={2}>
            <strong>Rating:</strong> {anime.score ?? 'N/A'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Year:</strong> {anime.year ?? 'N/A'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailPage;
