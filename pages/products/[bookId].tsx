import { useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBookId } from '@/lib/airtable';
import { Book } from '@/types/types';
import { useCartStore } from '@/store/store';
import { CartItemType } from '@/types/types';


export default function Page({ data } : { data:Book }) {
  const cart = useCartStore(state => state.cart);
  const addToCart = useCartStore(state => state.addToCart);
  const { id, title, author, price, desc } = data;
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState("加入購物車");
  const [addCart, setAddCart] = useState(false);

  let thumbnailSrc;
   if (data.thumbnail) {
    thumbnailSrc = data.thumbnail;
  } else {
    thumbnailSrc = "/images/PlaceholderCover.jpg";
  }

  const cartItem:CartItemType = {
    id,
    title,
    author,
    price,
    thumbnailSrc,
    quantity: qty
  }

  const incrementQty = () => {
    setQty(qty+1);
  }
  const decrementQty = () => {
    if (qty <= 0) return 0;
    setQty(qty-1);
  }
  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val < 0) return e.preventDefault();
    setQty(val);
  }
  const addProduct = (product:CartItemType) => {
    addToCart(product);
    setAdding(true);
    setStatus("加入中!");
    setTimeout(() => {
      setAdding(false);
      setStatus("加入購物車")
    }, 3000);
  }

  return (
    <section>
      <div className="container">
        <div className="text-sm breadcrumbs mb-10">
          <ul>
            <li>
              <Link href="/">首頁</Link>
            </li>
            <li>
              <Link href="/view-products">全部商品</Link>
            </li>
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
          <div className="space-y-4 md:py-10">
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-lightGreyBlue mb-5">作者: {author}</p>
              <p className="text-lg font-semibold text-primary">NT$ {price}</p>
            </div>
            <div className="flex flex-wrap items-end gap-5 border-b pb-8 border-base-200">
              <div className="form-control">
                <div className="qty-input grow">
                  <label htmlFor="qty-input-number" className="text-secondary mb-2 block">數量</label>
                  <div className="flex flex-row relative">
                    <button data-action="decrement" className="btn qty-btn rounded-e-none rounded-l-lg w-8" onClick={decrementQty}>
                      <span className="m-auto text-3xl font-thin">-</span>
                    </button>
                    <input type="number" placeholder="1" value={qty} onChange={handleQtyChange} name="qty-input-number" className="input input-bordered text-center rounded-none focus:outline-none w-14" />
                    <button data-action="increment" className="btn qty-btn rounded-l-none rounded-r-lg w-8" onClick={incrementQty}>
                      <span className="m-auto text-3xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="grow">
                <button className={`btn btn-block ${adding ? "btn-success" : "btn-primary"}`} onClick={() => addProduct(cartItem)}><span className="text-lg">{status}</span></button>
              </div>
            </div>
            <div>
              <p className="text-sm mb-5 text-lightGreyBlue">內容簡介</p>
              <p className="text-lg">{desc}</p>
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
