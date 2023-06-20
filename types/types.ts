// export type Thumbnail = {
//   id: string;
//   width: number;
//   height: number;
//   url: string;
//   filename: string;
//   size: number;
//   type: string;
//   thumbnails: {
//     small: {
//       url: string,
//       width: number,
//       height: number
//     },
//     large: {
//       url: string,
//       width: number,
//       height: number
//     },
//     full: {
//       url: string,
//       width: number,
//       height: number
//     }
//   }
// }

export type Book = {
  id: string;
  title: string;
  author: string;
  quantity: number;
  categories?: Array<string>;
  thumbnail?: string;
  price: number;
  desc?: string;
}

export type HeroType = {
  id: string;
  header: string;
  subtitle: string;
  image?: string;
  link: string;
}

export type CartItemType = {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
}