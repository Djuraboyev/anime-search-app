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
  IconButton,
  Container,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { useThemeToggle } from '../theme/ThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const SearchPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [animeResults, setAnimeResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const { toggleTheme } = useThemeToggle();
  const theme = useTheme();

  const fetchAnime = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get('https://api.jikan.moe/v4/anime', {
        params: { q: query, page },
      });
      setAnimeResults(response.data.data);
      setTotalPages(response.data.pagination.last_visible_page);
    } catch (error) {
      console.error('Failed to fetch anime:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, [query, page]);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton onClick={toggleTheme}>
            {theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>

        <TextField
          label="Search for anime"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              setQuery(input);
              setPage(1);
            }
          }}
          placeholder="e.g. Naruto, One Piece..."
          sx={{
            input: { color: theme.palette.mode === 'light' ? '#000' : '#fff' },
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#333',
            borderRadius: 1,
            mb: 4,
          }}
        />

        <Typography
          variant="h5"
          sx={{
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)',
            fontWeight: 'bold',
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.4)',
            display: 'inline-block',
            p: 1,
            borderRadius: 1,
            mb: 2,
          }}
        >
          🔥 Popular
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!loading && animeResults.length === 0 && query && (
          <Typography variant="h6" align="center" mt={4}>
            No results found for “{query}”
          </Typography>
        )}

        <Grid container spacing={3} justifyContent="center">
          {animeResults.map((anime) => (
            <Grid item key={anime.mal_id} xs={6} sm={4} md={3} lg={2.4}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
              >
                <CardMedia
                  component="img"
                  image={anime.images.jpg.image_url}
                  alt={anime.title}
                  height="320"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" noWrap>
                    {anime.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {animeResults.length > 0 && (
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
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
