import { create } from "zustand";
import { CartItemType } from '@/types/types';

type CartState = {
  cart: Array<CartItemType>;
  totalItems: number;
  totalCost: number;
}

type CartActions = {
  addToCart: any;
}

export const useCartStore = create<CartState & CartActions>()((set) => ({
  cart: [],
  totalCost: 0,
  totalItems: 0,
  addToCart: (cartItem:CartItemType) => {
    set((state) => {
      const cart = [...state.cart];
      const itemExists = cart.findIndex(item => item.id === cartItem.id);
      console.log(itemExists);
      if (itemExists !== -1) {
        cart[itemExists].quantity++;
      } else {
        cart.push(cartItem)
      }
      return { cart }
    })
  },
  // removeFromCart
  // clearCart
  // addItem
  // decreaseItem
}));