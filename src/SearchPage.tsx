import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Grid,
  CircularProgress,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  IconButton,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { debounce } from 'lodash';
import { useThemeToggle } from './theme/ThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AnimeDetails from './components/AnimeDetails';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [animeResults, setAnimeResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedAnimeTitle, setSelectedAnimeTitle] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toggleTheme } = useThemeToggle();
  const theme = useTheme();

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    const fetchAnime = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
          params: { q: query, page },
        });
        setAnimeResults(response.data.data);
        setTotalPages(response.data.pagination.last_visible_page);
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [query, page]);

  const handleSearchChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  }, 300);

  const handleCardClick = (animeTitle: string) => {
    setSelectedAnimeTitle(animeTitle);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#121212', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg" sx={{ maxWidth: '1200px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={toggleTheme}>
            {theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>

        <TextField
          label="Search Anime"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
          placeholder="e.g. Naruto, One Piece..."
          sx={{
            mb: 4,
            backgroundColor: theme.palette.background.paper,
            input: { color: theme.palette.text.primary },
          }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : animeResults.length === 0 && query ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No results found for “{query}”
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {animeResults.map((anime) => (
              <Grid item key={anime.mal_id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { boxShadow: 6, transform: 'scale(1.03)' },
                  }}
                  onClick={() => handleCardClick(anime.title)}
                >
                  <CardMedia
                    component="img"
                    height="350"
                    image={anime.images.jpg.image_url}
                    alt={anime.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" noWrap>
                      {anime.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedAnimeTitle && (
          <Box sx={{ mt: 4 }}>
            <AnimeDetails animeTitle={selectedAnimeTitle} />
          </Box>
        )}

        {animeResults.length > 0 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SearchPage;
