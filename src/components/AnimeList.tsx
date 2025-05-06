import React, { useState } from 'react';
import { Anime } from '../types';

interface AnimeListProps {
  animes: Anime[];
}

const AnimeList: React.FC<AnimeListProps> = ({ animes }) => {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full p-4">
      {animes.map((anime) => (
        <div
          key={anime.mal_id}
          onClick={() => setSelectedAnime(anime)}
          className="bg-[#1e1e4b] p-2 rounded-md cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full h-60 object-cover rounded"
          />
          <h2 className="text-white text-sm mt-2 text-center">
            {anime.title.length > 30 ? anime.title.slice(0, 30) + '...' : anime.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default AnimeList;