import { getBooks } from '@/lib/airtable'
import { Book } from '@/types/types'
import { Inter } from 'next/font/google'
import Thumbnail from '@/components/thumbnail'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data } : { data: Array<Book>}) {
  return (
    <section>
      <div>
        <h1 className="flex flex-row before:border-b before:flex-1 before:m-auto before:mr-6 before:border-neutral-300 before:max-w-[40%] after:flex-1 after:border-b after:m-auto after:ml-6 after:max-w-[40%] after:border-neutral-300 mb-10 text-center text-3xl text-sec">全部商品</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8">
          { data.map((book:Book) => <Thumbnail key={book.id} {...book} />
          )}
        </div>
      </div>
    </section>
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
