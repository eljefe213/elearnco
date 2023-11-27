interface Photo {
  id: string;
  urls: {
    regular: string;
  };
}

class UnsplashApi {
  private apiKey: string;
  private apiUrl = "https://api.unsplash.com/search/photos";
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchPhotos(
    query: string,
    page: number,
    perPage: number
  ): Promise<[Photo[], number]> {
    const encodedWord = query.replace(/\s+/g, "+").toLowerCase();
    const response = await fetch(
      `${this.apiUrl}?query=${encodedWord}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${this.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const responseData = await response.json();
    const photos = responseData.results;
    const totalPages = responseData.total_pages;
    return [photos, totalPages];
  }
}

export default UnsplashApi;
