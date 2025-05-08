import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import { Grid, Typography, Box } from '@mui/material';

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: { image_url: string };
  };
  score?: number;
}

interface Props {
  title: string;
  apiUrl: string;
}

const AnimeListSection: React.FC<Props> = ({ title, apiUrl }) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl);
        setAnimeList(res.data.data);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <Box px={4} py={6}>
      <Typography variant="h5" color="white" fontWeight="bold" mb={3}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {animeList.map((anime) => (
          <Grid item key={anime.mal_id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <AnimeCard
              id={anime.mal_id}
              title={anime.title}
              imageUrl={anime.images.jpg.image_url}
              rating={anime.score}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AnimeListSection;
