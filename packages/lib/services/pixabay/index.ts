import { GenericObject } from "schemas";

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

  private async fetchData(
    url: string,
    params: Record<string, any>
  ): Promise<any> {
    const queryString = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    const fullUrl = `${url}?${queryString}`;

    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }

  async searchPhotos(
    query: string,
    page: number,
    type = "photo",
    perPage: number,
    lang: string
  ): Promise<[Photo[], number]> {
    const encodedWord = query.replace(/\s+/g, "+").toLowerCase();
    const params = {
      key: this.apiKey,
      q: encodedWord,
      image_type: type,
      per_page: perPage,
      page: page,
      lang,
    };

    const response = await this.fetchData(this.apiUrl, params);

    const photos = response.hits as Photo[];
    const totalHits = response.totalHits as number;
    const totalPages = Math.ceil(Number(totalHits) / perPage);
    return [photos, totalPages];
  }

  async searchVideos(query: string, page: number): Promise<Video[]> {
    const params = {
      key: this.apiKey,
      q: query,
      video_type: "film",
      per_page: 10,
      page: page,
    };

    const response = (await this.fetchData(this.apiUrl, params)) as {
      hits: GenericObject[];
    };

    return response.hits.map((hit: GenericObject) => ({
      id: hit.id,
      videoURL: hit.videos.large.url,
      duration: hit.duration,
      previewURL: hit.previewURL,
      tags: hit.tags,
      user: hit.user,
    }));
  }
}

export default PixabayApi;
