export const fetchAnimeDetails = async (animeTitle: string) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeTitle}&limit=1`);
        const data = await response.json();
        return data.data[0];  
    } catch (error) {
        console.error("Error fetching anime data:", error);
        return null;
    }
};