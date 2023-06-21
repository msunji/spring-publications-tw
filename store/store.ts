import { create } from "zustand";
import { CartItemType } from '@/types/types';

type CartState = {
  cart: Array<CartItemType>;
  totalItems: number;
  totalCost: number;
}

type CartActions = {
  addToCart: (cartItem:CartItemType) => any;
  removeFromCart: (cartItemId:string) => any;
  clearCart: () => void;
  updateQty: (updateType:string) => any;
}

const initialState:CartState = {
  cart: [],
  totalItems: 0,
  totalCost: 0
}

const getTotalItems = (cart:Array<CartItemType>) => {
  return cart.reduce((prev, curr) => prev + curr.quantity, 0);
}

const getTotalCost = (cart:Array<CartItemType>) => {
  return cart
  .map(item => {
    return item.quantity * item.price
  })
  .reduce((prev, curr) => prev + curr, 0);
}

export const useCartStore = create<CartState & CartActions>()((set) => ({
  ...initialState,
  addToCart: (cartItem:CartItemType) => {
    set((state) => {
      const cart = [...state.cart];
      const existingItemIdx = cart.findIndex(item => item.id === cartItem.id);
      if (existingItemIdx !== -1) {
        cart[existingItemIdx].quantity++;
      } else {
        cart.push(cartItem)
      }
      return {
        cart,
        totalItems: getTotalItems(cart),
        totalCost: getTotalCost(cart)
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
        totalItems: getTotalItems(cart),
        totalCost: getTotalCost(cart)
      }
    })
  },
  clearCart: () => {
    set(initialState)
  },
  updateQty: (updateType:string) => set()
  // addItem
  // decreaseItem
}));