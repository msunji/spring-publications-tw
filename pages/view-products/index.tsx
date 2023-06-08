import { useState } from 'react';
import { getBooks } from '@/lib/airtable';
import { Book } from '@/types/types';
import Thumbnail from '@/components/thumbnail';
import Link from 'next/link';

type BookProps = {
  bookData: Array<Book>
}

type PageProps = {
  products: Array<Book>,
  currentPage: number,
  totalProducts: number,
  pageLimit: number,
}

export const per_page=10;

const Paginated = ({ products, currentPage, totalProducts, pageLimit } : PageProps) => {
  return (
    <div>test</div>
  )
}

const ProductGrid = ({ bookData }: BookProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
      {bookData.map((book:Book) => <Thumbnail key={book.id} {...book} />)}
    </div>
  )
}

export default function Page({ data } : { data: Array<Book> }) {
  const [currPage, setCurrPage] = useState(1);
  const maxProducts = 10;
  const numProducts = data.length;
  const numPages = Math.ceil(numProducts / maxProducts);
  console.log(numPages);


  return (
    <section>
      <div className="container mx-auto">
        <h1>全部商品</h1>
        <>
          { data ? (<ProductGrid bookData={data} />) : (<p>Error Loading Data</p>) }
        </>
        <div className="text-center">
          <div className="join page-select">
            <Link href={`/view-products?=page=1`}><button className="join-item btn btn-active ">1</button></Link>
            <Link href={`/view-products?=page=2`}><button className="join-item btn">2</button></Link>
            <Link href={`/view-products?=page=3`}><button className="join-item btn">3</button></Link>
            <Link href={`/view-products?=page=4`}><button className="join-item btn">4</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps() {
  try {
    const res = await getBooks("Product List", "{Publish} = 1");
    const data = JSON.parse(JSON.stringify(res));
    return {
      props: {
        data
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
