import React from 'react';
import { Anime } from '../types';
import { Link } from 'react-router-dom';

interface AnimeListProps {
  animes: Anime[];
}

const AnimeList: React.FC<AnimeListProps> = ({ animes }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-4">
      {animes.map((anime) => (
        <Link
          to={`/anime/${anime.mal_id}`}
          key={anime.mal_id}
          className="bg-[#1e1e4b] rounded-md overflow-hidden shadow hover:scale-105 transition-transform cursor-pointer"
        >
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-2">
            <h2 className="text-white text-sm">
              {anime.title.length > 40 ? anime.title.slice(0, 40) + '...' : anime.title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AnimeList;
