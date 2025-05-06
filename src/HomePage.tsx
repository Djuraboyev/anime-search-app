import React from 'react';
import HeroSection from './components/HeroSection';
import AnimeListSection from './components/AnimeListSection';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <HeroSection />
      <AnimeListSection
        title="🔥 Popular"
        apiUrl="https://api.jikan.moe/v4/top/anime"
      />
      <AnimeListSection
        title="📈 Now in Trend"
        apiUrl="https://api.jikan.moe/v4/seasons/now"
      />
      <AnimeListSection
        title="⭐ Top Ranking"
        apiUrl="https://api.jikan.moe/v4/top/anime?filter=favorite"
      />
    </div>
  );
};

export default HomePage;
