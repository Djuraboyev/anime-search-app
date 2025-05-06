import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative h-64 md:h-96 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://cdn.myanimelist.net/images/anime/1764/126627l.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Добро пожаловать в AnimeZone
          </h1>
          <p className="text-white mb-6 text-sm md:text-base">
            Исследуйте лучшие аниме прямо сейчас
          </p>
          <Link
            to="/anime/1"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm md:text-base"
          >
            Смотреть сейчас
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
