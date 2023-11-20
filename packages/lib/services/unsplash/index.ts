import axios from "axios";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
}
interface ApiResponse {
  results: Photo[];
  total_pages: number;
}
const UNSPLASH_KEY = process.env.UNSPLASH_KEY as string;
class UnsplashApi {
  constructor(private accessKey: string) {}

  async searchPhotos(
    query: string,
    page: number,
    perPage: number
  ): Promise<[Photo[], number]> {
    const url = "https://api.unsplash.com/search/photos";

    const encodedWord = query.replace(/\s+/g, "+").toLowerCase();
    const response = await axios.get<ApiResponse>(url, {
      params: {
        query: encodedWord,
        page,
        per_page: perPage,
      },
      headers: {
        Authorization: `Client-ID ${this.accessKey}`,
      },
    });
    const photos = response.data.results;
    const totalPages = response.data.total_pages;
    return [photos, totalPages];
  }
}

export default UnsplashApi;
