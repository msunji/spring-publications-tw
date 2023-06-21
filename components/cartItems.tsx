import { useCartStore } from '@/store/store';

export function CartItems() {
  const cartItems = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQty = useCartStore(state => state.updateQty);

  return (
    <div>
      {
        cartItems.map(({id, title, price, quantity, author}) => (
          <div key={id}>
            <div>{title}</div>
            <button onClick={() => updateQty(id, "inc")}>+</button>
            <button onClick={() => updateQty(id, "dec")}>-</button>
            <button onClick={() => removeFromCart(id)}>Remove from Cart</button>
          </div>
        ))
      }
    </div>
  )
}