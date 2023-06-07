import { getBooks } from '@/lib/airtable';
import { Book } from '@/types/types';
import Thumbnail from '@/components/thumbnail';

type BookProps = {
  bookData: Array<Book>
}

export const per_page=10;

const ProductGrid = ({ bookData }: BookProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
      {bookData.map((book:Book) => <Thumbnail key={book.id} {...book} />)}
    </div>
  )
}

export default function Page({ data } : { data: Array<Book> }) {
  return (
    <section>
      <div className="container mx-auto">
        <h1>全部商品</h1>
        <>
          { data ? (<ProductGrid bookData={data} />) : (<p>Error Loading Data</p>) }
        </>
        <div className="text-center">
          <div className="join page-select">
            <button className="join-item btn btn-active ">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
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
