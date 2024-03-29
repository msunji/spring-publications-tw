import { HeroType } from '@/types/types';
import Link from 'next/link';

type HeroProps = {
  content: HeroType
}

export default function Hero({ content }: HeroProps) {
  const { header, subtitle, image, link } = content;

  return (
    <div className={`hero min-h-full bg-cover`} style={{ backgroundImage: `url('${image}')`}}>
      <div className="custom-hero-overlay"></div>
      <div className="py-20 md:py-40 hero-content text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{header}</h1>
          <p className="mb-5">{subtitle}</p>
          <Link href={link}>
            <button className="btn bg-transparent border-white border-2 text-white btn-wide md:btn-lg hover:bg-white hover:text-neutral">看看所有的商品</button>
          </Link>
        </div>
      </div>
    </div>
  )
}