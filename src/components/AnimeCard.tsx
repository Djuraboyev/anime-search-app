import React from 'react';
import { Link } from 'react-router-dom';

interface AnimeCardProps {
  id: number;
  title: string;
  imageUrl: string;
  rating?: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ id, title, imageUrl, rating }) => {
  return (
    <Link to={`/anime/${id}`} className="w-40 flex-shrink-0 transform hover:scale-105 transition-transform">
      <div className="rounded overflow-hidden shadow-md">
        <img src={imageUrl} alt={title} className="w-full h-60 object-cover rounded-md" />
        <div className="p-2 text-sm text-white">
          <h3 className="font-semibold line-clamp-2">{title}</h3>
          {rating && <p className="text-yellow-400">⭐ {rating}</p>}
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
