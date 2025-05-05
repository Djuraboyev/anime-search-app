import { useState } from "react";
import { fetchAnimeDetails } from "../services/animeService";

const AnimeDetails = ({ animeTitle }: { animeTitle: string }) => {
    const [animeData, setAnimeData] = useState<any>(null);

    const loadAnimeDetails = async () => {
        const details = await fetchAnimeDetails(animeTitle);
        setAnimeData(details);
    };

    return (
        <div>
            <button onClick={loadAnimeDetails}>Show Anime Info</button>
            {animeData && (
                <div>
                    <h2>{animeData.title}</h2>
                    <p><strong>Episodes:</strong> {animeData.episodes}</p>
                    <p><strong>Release Date:</strong> {animeData.aired.string}</p>
                    <p><strong>Synopsis:</strong> {animeData.synopsis}</p>
                    <img src={animeData.images.jpg.image_url} alt={animeData.title} />
                </div>
            )}
        </div>
    );
};

export default AnimeDetails;