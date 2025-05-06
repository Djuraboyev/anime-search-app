export interface Anime {
    mal_id: number;
    title: string;
    synopsis?: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    score?: number;
    rank?: number;
    popularity?: number;
    members?: number;
  }
  