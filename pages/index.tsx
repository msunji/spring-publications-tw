import { getBooks } from '@/lib/airtable'
import { Book } from '@/types/types'
import { Inter } from 'next/font/google'
import Thumbnail from '@/components/thumbnail';
import Featured from '@/components/featured';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data } : { data: Array<Book>}) {
  return (
    <>
      <Featured />
      <section>
        <div className="container mx-auto">
          <div className="divider mb-20"><h1 className="text-center text-3xl">全部商品</h1></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((book:Book) => <Thumbnail key={book.id} {...book} />
              )}
          </div>

        </div>
      </section>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await getBooks();
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
