import Link from 'next/link';
import Image from 'next/image';
import { getBookId } from '@/lib/airtable';
import { Book } from '@/types/types';
 
export default function Page({ data } : { data:Book }) {
  const { title, author, price, desc } = data;

  let thumbnailSrc;

  if (data.thumbnail && typeof Array.isArray(data.thumbnail)) {
    thumbnailSrc = data.thumbnail[0].thumbnails.large.url;
  } else {
    thumbnailSrc = "/images/PlaceholderCover.jpg";
  }

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
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-lightGreyBlue mb-5">作者: {author}</p>
            <p className="text-lg font-semibold text-primary">NT$ {price}</p>
          </div>
          <div className="divider" />
          <div>
            <p className="text-sm mb-5 text-lightGreyBlue">內容簡介</p>
            <p className="text-lg">{desc}</p>
          </div>
          <div className="flex items-end">
            <div className="form-control mr-5">
              <div className="qty-input">
                <label htmlFor="qty-input-number" className="font-semibold">數量</label>
                <div className="flex flex-row gap-2">
                  <button data-action="decrement">
                    <span className="m-auto text-3xl font-thin">-</span>
                  </button>
                  <input type="text" placeholder="0" value="0" name="qty-input-number" className="input input-bordered font-semibold max-w-[80px] text-center" />
                  <button data-action="increment">
                    <span className="m-auto text-3xl font-thin">+</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="grow-1 w-full">
              <button className="btn btn-secondary btn-block">Add to Cart</button>
            </div>
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
