import Link from 'next/link'
import Image from 'next/image'
import { getBooks } from '@/lib/airtable'
import { Book } from '@/types/types'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function Book({ ...props }: Book) {
  const { id, title, author, price } = props;

  let thumbnailSrc;

  if (props.thumbnail && typeof Array.isArray(props.thumbnail)) {
    thumbnailSrc = props.thumbnail[0].thumbnails.large.url;
  } else {
    thumbnailSrc = "/images/PlaceholderCover.jpg";
  }

  return (
    <Link href={`/products/${id}`}>
      <div className="transition-transform hover:scale-90">
        <Image
          className="mb-2"
          src={thumbnailSrc}
          width={450}
          height={650}
          style={{objectFit: "cover"}}
          alt={`Cover for ${title}`} />
        <div className="flex justify-between font-bold">
          <p>{ title }</p>
          <p>NT${ price }</p>
        </div>
        <p className="text-sm">{ author }</p>
      </div>
    </Link>
  )
}

export default function Home({ data } : { data: Array<Book>}) {
  return (
    <section>
      <div>
        <h1 className="mb-10 text-center text-3xl">全部商品</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          { data.map((book:Book) => <Book key={book.id} {...book} />
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
