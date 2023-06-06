export type Thumbnail = {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: {
      url: string,
      width: number,
      height: number
    },
    large: {
      url: string,
      width: number,
      height: number
    },
    full: {
      url: string,
      width: number,
      height: number
    }
  }
}

export type Book = {
  id: string;
  title: string;
  author: string;
  categories?: Array<string>;
  thumbnail?: Array<Thumbnail>;
  price: number;
  desc?: string;
}