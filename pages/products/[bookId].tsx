import Link from 'next/link';
import Image from 'next/image';
import { getBookId } from '@/lib/airtable';
import { Book } from '@/types/types';
 
export default function Page({ data } : { data:Book }) {

  const { title, author, price, desc } = data;

  const thumbnailSrc = "thumbnail" in data ? data.thumbnail[0].thumbnails.large.url : "/images/PlaceholderCover.jpg";
  return (
    <section>
      <div className="text-sm breadcrumbs mb-5">
        <ul>
          <li><Link href="/">首頁</Link></li>
          <li>{title}</li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Image
              className="mb-2"
              src={thumbnailSrc}
              width={450}
              height={650}
              style={{objectFit: "cover"}}
              alt={`Cover for ${title}`} />
        </div>
        <div className="space-y-10 md:py-10">
          <div>
            <h1 className="text-3xl mb-2">{title}</h1>
            <p className="text-sm mb-5">{author}</p>
            <p className="text-lg">NT$ {price}</p>
          </div>
          <div>
            <p className="text-sm mb-5 text-lightGreyBlue">內容簡介</p>
            <p className="text-lg">{desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps({ params } : { params: { bookId: string }}) {
  const { bookId } = params;
  try {
    const res = await getBookId(bookId);
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
