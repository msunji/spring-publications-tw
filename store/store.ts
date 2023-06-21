import { create } from "zustand";
import { CartItemType } from '@/types/types';

// Set types
type CartState = {
  cart: Array<CartItemType>;
  totalItems: number;
  totalCost: number;
}

type CartActions = {
  addToCart: (cartItem:CartItemType) => any;
  removeFromCart: (cartItemId:string) => any;
  updateQty: (cartItemId:string, updateType:"inc" | "dec") => any;
  clearCart: () => void;
}

// Set initial state - empty cart, 0 cost
const initialState:CartState = {
  cart: [],
  totalItems: 0,
  totalCost: 0
}

// Helper functions for calculating the total number of items in cart and total cost
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

// Create cart store
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
      return {
        cart,
        totalItems: getTotalItems(cart),
        totalCost: getTotalCost(cart)
      }
    })
  },
  updateQty: (cartItemId: string, updateType: "inc" | "dec") => {
    set((state) => {
      const cart = [...state.cart];
      const itemIdx = cart.findIndex(item => item.id === cartItemId);
      if (itemIdx !== -1) {
        if (updateType === "inc") {
          cart[itemIdx].quantity += 1;
        } else {
          cart[itemIdx].quantity -= 1;
          if (cart[itemIdx].quantity === 0) {
            cart.splice(itemIdx, 1)
          }
        }
      }
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
}));