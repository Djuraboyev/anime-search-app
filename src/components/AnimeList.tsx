import React, { useState } from 'react'; 
import { Anime } from '../types';

interface AnimeListProps {
  animes: Anime[];
}

const AnimeList: React.FC<AnimeListProps> = ({ animes }) => {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null); 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:col-span-2">
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
            <h2 className="text-white text-sm mt-2">
              {anime.title.length > 30 ? anime.title.slice(0, 30) + '...' : anime.title}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-[#1e1e4b] p-4 rounded-md text-white h-[500px] overflow-y-auto">
        {selectedAnime ? (
          <>
            <h2 className="text-xl font-bold mb-2">{selectedAnime.title}</h2>
            <p>{selectedAnime.synopsis || 'Описание недоступно.'}</p>
          </>
        ) : (
          <p className="text-gray-400">Нажмите на аниме, чтобы увидеть описание.</p>
        )}
      </div>
    </div>
  );
};

export default AnimeList;
