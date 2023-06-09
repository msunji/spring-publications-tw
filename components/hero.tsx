import { HeroType } from '@/types/types';
import Link from 'next/link';

type HeroProps = {
  content: HeroType
}

export default function Hero({ content }: HeroProps) {
  const { header, subtitle, image, link } = content;

  return (
    <div className={`hero min-h-full bg-cover`} style={{ backgroundImage: `url('${image[0].thumbnails.large.url}')`}}>
      <div className="hero-overlay bg-opacity-65"></div>
      <div className="py-20 md:py-40 hero-content text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{header}</h1>
          <p className="mb-5">{subtitle}</p>
          <Link href={link}>
            <button className="btn btn-primary">See Books</button>
          </Link>
        </div>
      </div>
    </div>
  )
}