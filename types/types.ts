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
  thumbnail: Array<Thumbnail> | null;
  price: number;
  desc: string | null;
}