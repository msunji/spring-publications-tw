import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/types';

export default function Thumbnail ({ ...props }: Book) {
  const { id, title, author, thumbnail, price } = props;
  return (
    <Link href={`/products/${id}`}>
      <div className="transition-transform hover:scale-90">
        <Image
          className="mb-5"
          src={thumbnail}
          width={450}
          height={650}
          style={{objectFit: "cover"}}
          alt={`Cover for ${title}`} />
        <p className="font-bold text-xl">{ title }</p>
        <p className="mb-3 text-neutral-400">{ author }</p>
        <p className="text-lg font-semibold text-primary">${ price }</p>
      </div>
    </Link>
  )
}