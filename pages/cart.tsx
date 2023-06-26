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

  console.log(totalCost);

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
              <p className="flex justify-between text-lg">
                <span className="mr-5 text-xl"><b>Subtotal</b></span> NT${totalCost}.00<br />
              </p>
              <p className="flex justify-between text-secondary"><span className="mr-5 text-xl mb-8"><b>Shipping</b></span> <span>NT$60.00</span></p>
              <p className="text-lg flex justify-between"><span className="mr-5 text-xl"><b>Total</b></span> <span>NT${totalCost + 60}.00</span></p>
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