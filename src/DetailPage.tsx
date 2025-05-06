import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime details:', error);
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-white">Загрузка...</div>;
  }

  if (!anime) {
    return <div className="text-center mt-20 text-white">Аниме не найдено</div>;
  }

  return (
    <div className="flex justify-center bg-black text-white py-12 px-4 min-h-screen">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-10">
        {/* POSTER */}
        <div className="md:w-1/3">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="rounded-lg w-full"
          />
          <button
            onClick={() => navigate(-1)}
            className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded transition"
          >
            Назад
          </button>
        </div>

        {/* INFO */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">{anime.title}</h1>
          <p className="text-gray-300">{anime.synopsis}</p>

          <div className="flex flex-wrap gap-4">
            <div className="w-[150px] bg-gray-800 p-4 rounded">
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-xl font-bold">{anime.score ?? 'N/A'}</p>
            </div>
            <div className="w-[150px] bg-gray-800 p-4 rounded">
              <p className="text-sm text-gray-400">Popularity</p>
              <p className="text-xl font-bold">{anime.popularity}</p>
            </div>
            <div className="w-[150px] bg-gray-800 p-4 rounded">
              <p className="text-sm text-gray-400">Members</p>
              <p className="text-xl font-bold">{anime.members}</p>
            </div>
          </div>

          <div className="text-sm text-gray-400 space-y-2 pt-4">
            <p><strong>Episodes:</strong> {anime.episodes}</p>
            <p><strong>Premiered:</strong> {anime.season} {anime.year}</p>
            <p><strong>Rating:</strong> {anime.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
