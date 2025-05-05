import React from 'react';
import HeroSection from './components/HeroSection';
import AnimeListSection from './components/AnimeListSection';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <HeroSection />
      <AnimeListSection
        title="🔥 Популярное"
        apiUrl="https://api.jikan.moe/v4/top/anime"
      />
      <AnimeListSection
        title="📈 Сейчас в тренде"
        apiUrl="https://api.jikan.moe/v4/seasons/now"
      />
      <AnimeListSection
        title="⭐ Топ рейтинга"
        apiUrl="https://api.jikan.moe/v4/top/anime?filter=favorite"
      />
    </div>
  );
};

export default HomePage;
