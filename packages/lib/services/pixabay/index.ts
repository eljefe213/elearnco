import axios from "axios";

interface IMedia {
  id: number;
  previewURL: string;
  tags: string[];
  user: string;
}
export interface Photo extends IMedia {
  imageURL: string;
}

export interface Video extends IMedia {
  videoURL: string;
  duration: number;
}

export class PixabayApi {
  private apiKey: string;
  private apiUrl = "https://pixabay.com/api/";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchPhotos(
    query: string,
    page: number,
    type = "photo",
    perPage: number,
    lang: string
  ): Promise<[Photo[], number]> {
    const encodedWord = query.replace(/\s+/g, "+").toLowerCase();
    const response = await axios.get(this.apiUrl, {
      params: {
        key: this.apiKey,
        q: encodedWord,
        image_type: type,
        per_page: perPage,
        page: page,
        lang,
      },
    });
    const photos = response.data.hits as Photo[];
    const totalHits = response.data.totalHits;
    const totalPages = Math.ceil(totalHits / perPage) as number;
    return [photos, totalPages];
  }

  async searchVideos(query: string, page: number): Promise<Video[]> {
    const response = await axios.get(this.apiUrl, {
      params: {
        key: this.apiKey,
        q: query,
        video_type: "film",
        per_page: 10,
        page: page,
      },
    });

    return response.data.hits.map((hit: any) => ({
      id: hit.id,
      url: hit.videos.large.url,
      title: hit.tags,
    }));
  }
}

export default PixabayApi;
