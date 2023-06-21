import { create } from "zustand";
import { CartItemType } from '@/types/types';

type CartState = {
  cart: Array<CartItemType>;
  totalItems: number;
  // totalCost: () => number;
  totalCost: number;
}

type CartActions = {
  addToCart: (cartItem:CartItemType) => any;
  removeFromCart: (cartItemId:string) => any;
  clearCart: () => void;
}

export const useCartStore = create<CartState & CartActions>()((set, get) => ({
  cart: [],
  totalCost: 0,
  totalItems: 0,
  addToCart: (cartItem:CartItemType) => {
    set((state) => {
      const cart = [...state.cart];
      const existingItemIdx = cart.findIndex(item => item.id === cartItem.id);
      if (existingItemIdx !== -1) {
        cart[existingItemIdx].quantity++;
      } else {
        cart.push(cartItem)
      }
      const updatedTotalItems = cart.reduce((prev, curr) => prev + curr.quantity, 0);
      return {
        cart,
        totalItems: updatedTotalItems
      }
    })
  },
  removeFromCart: (cartItemId:string) => {
    set((state) => {
      const cart = [...state.cart];
      const itemToRemoveIdx = cart.findIndex(item => item.id === cartItemId);
      if (itemToRemoveIdx !== -1) {
        cart.splice(itemToRemoveIdx, 1);
      }
      const updatedTotalItems = cart.reduce((prev, curr) => prev + curr.quantity, 0);
      return {
        cart,
        totalItems: updatedTotalItems
      }
    })
  },
  clearCart: () => set({ cart: [] })
  // addItem
  // decreaseItem
}));