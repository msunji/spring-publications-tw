import { useCartStore } from '@/store/store';
import { useState } from "react";
import Image from 'next/image';
import { CartItemType } from '@/types/types';

export function CartItems() {
  const cartItems:Array<CartItemType> = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQty = useCartStore(state => state.updateQty);

  return (
    <div>
      {
        cartItems.map(({id, title, price, quantity, author, thumbnailSrc }) => (
          <div key={id} className="flex py-4 border-b border-base-200 justify-between flex-wrap last:border-none">
            <div>
              <Image 
                src={thumbnailSrc} 
                width={80} 
                height={90} 
                alt={`${title}`} 
                className="mr-8" />
            </div>

            <div className="flex flex-1 justify-between items-center gap-4">
              <div>
                <div>
                  <span className="text-lg">
                      <b>{title}</b>
                    </span>
                  </div>
                  <div><small>${price}</small></div>
                  <div>
                     <a className="cursor-pointer text-error text-sm underline" onClick={() => removeFromCart(id)}>刪除</a>
                  </div>
                </div>
                <div className="flex flex-row relative">
                      <button data-action="decrement" className="qty-btn rounded-e-none rounded-l-lg w-8" onClick={() => updateQty(id, "dec")}>
                        <span className="m-auto text-3xl font-thin">-</span>
                      </button>
                      <input type="number" placeholder="1" value={quantity} name="qty-input-number" className="input input-bordered text-center rounded-none focus:outline-none px-0 w-12 text-md" readOnly />
                      <button data-action="increment" className="qty-btn rounded-l-none rounded-r-lg w-8" onClick={() => updateQty(id, "inc")}>
                        <span className="m-auto text-3xl font-thin">+</span>
                      </button>
                </div>
              </div>
            </div>
        ))
      }
    </div>
  )
}