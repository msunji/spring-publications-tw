import { useEffect, useState } from "react";
import { CartItemType } from '@/types/types';
import { useCartStore } from '@/store/store';
import { CartItems } from '@/components/cartItems';
import Link from 'next/link';

const emptyCart = () => {}

export default function Page() {
  const { cart, totalItems, totalCost, clearCart } = useCartStore();

  const [cartState, setCartState] = useState<CartItemType[]>();

  useEffect(() => {
    setCartState(cart);
  }, [cart])

  return (
    <>
      <section className="section-divider">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h1 className="mb-0">購物車</h1>
            <Link href="/view-products">繼續購物</Link>
          </div>
          <div>
            <div>
              {
                cartState?.length ? (<CartItems />) : (<div>Cart is Empty</div>)
              }
            </div>
          </div>
          <div className=" border-base-200 py-5 justify-end flex">
            <div>
              <p className="text-right text-lg">
                <span className="mr-5 text-xl"><b>Subtotal</b></span> NT${totalCost}.00<br />
              </p>
              <p className="text-sm text-secondary">✱ Does not include shipping fee</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h1>Contact Details</h1>
          <form className="max-w-[50%]">
            <label className="block mb-2">
              <span className="block text-sm font-medium text-slate-700 mb-1">Full Name</span>
              <input type="text" value="Full Name" className="input input-bordered w-full rounded"/>
            </label>
            <label className="block mb-2">
              <span className="block text-sm font-medium text-slate-700 mb-1">Email</span>
              <input type="text" value="Email"  className="input input-bordered w-full rounded mb-2"/>
            </label>
            <button className="btn btn-primary">
              Submit Order
            </button>
          </form>
        </div>
      </section>
    </>

  )
}