import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Anime {
  title: string;
  synopsis: string;
  score: number;
  images: {
    jpg: { image_url: string };
  };
  episodes: number;
  year: number;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(res.data.data);
      } catch (err) {
        console.error('Oops mistake downloading Anime:', err);
      }
    };
    fetchAnime();
  }, [id]);

  if (!anime) return <div className="text-white p-4">Загрузка...</div>;

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full md:w-64 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
          <p className="mb-4">{anime.synopsis || 'Empty.'}</p>
          <p>🎯 Ranking: {anime.score || 'N/A'}</p>
          <p>📺 Episode: {anime.episodes || '??'}</p>
          <p>📅 Year: {anime.year || '??'}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
