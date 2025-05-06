import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';

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
        console.error('Mistake in Downloading:', err);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl text-white font-bold mb-3">{title}</h2>
      <div className="flex gap-4 overflow-x-auto">
        {animeList.map(anime => (
          <AnimeCard
            key={anime.mal_id}
            id={anime.mal_id}
            title={anime.title}
            imageUrl={anime.images.jpg.image_url}
            rating={anime.score}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeListSection;