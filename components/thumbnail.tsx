import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/types';

export default function Thumbnail ({ ...props }: Book) {
  const { id, title, author, price } = props;

  let thumbnailSrc;

  if (props.thumbnail && typeof Array.isArray(props.thumbnail)) {
    thumbnailSrc = props.thumbnail[0].thumbnails.large.url;
  } else {
    thumbnailSrc = "/images/PlaceholderCover.jpg";
  }

  return (
    <Link href={`/products/${id}`}>
      <div className="transition-transform hover:scale-90">
        <Image
          className="mb-2"
          src={thumbnailSrc}
          width={450}
          height={650}
          style={{objectFit: "cover"}}
          alt={`Cover for ${title}`} />
        <div className="flex justify-between font-bold">
          <p>{ title }</p>
          <p>NT${ price }</p>
        </div>
        <p className="text-sm">{ author }</p>
      </div>
    </Link>
  )
}