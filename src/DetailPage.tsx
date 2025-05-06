import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';
import axios from 'axios';

interface Anime {
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  genres: { name: string }[];
  episodes: number;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    return <CircularProgress />;
  }

  if (!anime) {
    return <Typography>Аниме не найдено</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {anime.title}
      </Typography>
      <img src={anime.images.jpg.image_url} alt={anime.title} style={{ width: '100%', maxWidth: '300px' }} />
      <Typography variant="body1" gutterBottom>
        {anime.synopsis}
      </Typography>
      <Typography variant="h6">Рейтинг: {anime.score}</Typography>
      <Typography variant="h6">Эпизоды: {anime.episodes}</Typography>
      <Box sx={{ mt: 2 }}>
        {anime.genres.map((genre) => (
          <Chip key={genre.name} label={genre.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
    </Box>
  );
};

export default DetailPage;
