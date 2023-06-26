import { useEffect, useState } from "react";
import { CartItemType } from '@/types/types';
import { useCartStore } from '@/store/store';
import { CartItems } from "@/components/cartItems";
import CartForm from "@/components/cartForm";
import Link from 'next/link';
import Image from 'next/image';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center my-8">
      <Image
      src="/images/empty-cart.svg"
      width={240}
      height={240}
      alt="Illustration of person with empty cart"
      className="mb-6"
      />
      <h2>你的購物車是空的</h2>
    </div>
  )
}

export default function Page() {
  const { cart, totalCost, clearCart } = useCartStore();

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
            {
              cartState?.length ? (<CartItems />) : (<EmptyCart />)
            }
          </div>
          <div className=" border-base-200 py-5 justify-end flex border-t border-base-400">
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
          <CartForm />
        </div>
      </section>
    </>

  )
}