import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Anime {
  title: string;
  synopsis: string;
  images: {
    jpg: { large_image_url: string };
  };
}

const HeroSection: React.FC = () => {
  const [anime, setAnime] = useState<Anime | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get('https://api.jikan.moe/v4/top/anime?limit=10');
        const randomIndex = Math.floor(Math.random() * res.data.data.length);
        setAnime(res.data.data[randomIndex]);
      } catch (err) {
        console.error('Ошибка загрузки аниме:', err);
      }
    };

    fetchAnime();
  }, []);

  if (!anime) return <div className="text-white text-center mt-10">Загрузка...</div>;

  return (
    <div
      className="relative w-full h-[80vh] bg-cover bg-center flex items-end text-white"
      style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="relative z-10 p-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
        <p className="text-sm text-gray-200 line-clamp-3">{anime.synopsis}</p>
        <div className="mt-4 flex gap-4">
          <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Смотреть</button>
          <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black">Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
