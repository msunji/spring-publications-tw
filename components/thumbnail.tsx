import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/types';

export default function Thumbnail ({ ...props }: Book) {
  const { id, title, author, price } = props;
  let thumbnailSrc;
  if (props.thumbnail) {
   thumbnailSrc = props.thumbnail;
 } else {
   thumbnailSrc = "/images/PlaceholderCover.jpg";
 }
  return (
    <Link href={`/products/${id}`}>
      <div className="transition-transform hover:scale-95">
        <Image
          className="mb-5"
          src={thumbnailSrc}
          width={300}
          height={400}
          style={{objectFit: "cover"}}
          alt={`Cover for ${title}`} />
        <div className="flex justify-between gap-2">
          <div>
            <p className="text-secondary text-sm">{ author }</p>
            <p className="font-bold text-md md:text-xl">{ title }</p>
          </div>
          <p className="text-md md:text-lg self-end">${ price }</p>
        </div>
      </div>
    </Link>
  )
}