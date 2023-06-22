import { getBooks, getHero } from '@/lib/airtable'
import { Book, HeroType } from '@/types/types'
import Hero from '@/components/hero';
import Link from 'next/link';
import ProductGrid from '@/components/productGrid';

export default function Home({ data, heroContent } : { data: Array<Book>, heroContent: HeroType }) {
  return (
    <>
      <Hero content={heroContent}/>
      <section>
        <div className="container mx-auto">
          <div className="divider mb-20 flex"><h1 className="text-center mb-0">我們的商品</h1></div>
          <ProductGrid productData={data} />
          <div className="text-center">
            <Link href="/view-products">
              <button className="btn btn-primary">See All Books</button>
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
