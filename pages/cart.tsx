import { useEffect, useState } from "react";
import { CartItemType } from '@/types/types';
import { useCartStore } from '@/store/store';
import { CartItems } from '@/components/cartItems';

export default function Page() {
  const { cart, clearCart } = useCartStore();

  const [cartState, setCartState] = useState<Array<CartItemType>>();

  useEffect(() => {
    setCartState(cart);
  }, [cart])


  return (
    <section>
      <div className="container">
        <h1>購物車</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <div className="divider">
        </div>
        <div>
          <button onClick={() => clearCart()}>Clear Cart</button>
        </div>
        <div>
          {
            cartState?.length ? (<CartItems />) : (<div>Cart is Empty</div>)
          }
        </div>
      </div>

    </section>
  )
}