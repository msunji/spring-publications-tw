import { getBooks, getHero } from '@/lib/airtable'
import { Book, HeroType } from '@/types/types'
import { Inter } from 'next/font/google'
import Thumbnail from '@/components/thumbnail';
import Hero from '@/components/hero';
import Link from 'next/link';
import ProductGrid from '@/components/productGrid';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data, heroContent } : { data: Array<Book>, heroContent: HeroType }) {
  return (
    <>
      <Hero content={heroContent}/>
      <section>
        <div className="container mx-auto">
          <div className="divider mb-20"><h1 className="text-center text-3xl">我們的商品</h1></div>
          <div className="mb-20 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProductGrid productData={data} />
          </div>
          <div className="text-center">
            <Link href="/view-products">
              <button className="btn">See All Books</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await getBooks("Product List", "{Publish} = 1", 8);
    const data = JSON.parse(JSON.stringify(res));
    const heroContent = await getHero();
    return {
      props: {
        data,
        heroContent
      }
    }
  } catch (err) {
    return {
      props: {
        err: "Something went wrong"
      }
    }
  }
}
