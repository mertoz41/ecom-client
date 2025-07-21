import { create } from "zustand";
import { getCartItems, addToCart, removeFromCart } from "@/utils/cartActions";
import { getCartIdFromCookie, saveCartIdToCookie } from "@/utils/cart";
import apiClient from "@/utils/apiClient";

type CartItem = {
  variantId: string;
  quantity: number;
  variant: any; // You can define a Variant interface if needed
};

interface CartState {
  cart: {
    _id: string;
    items: CartItem[];
  } | null;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    let cartId = getCartIdFromCookie();
    if (!cartId) {
      const createRes = await apiClient.post("/cart/create");
      cartId = createRes.data.cartId;
      saveCartIdToCookie(cartId);
    }
    const cart = await getCartItems();
    set({ cart, loading: false });
  },

  addItem: async (variantId, quantity = 1) => {
    set({ loading: true });
    const updatedCart = await addToCart(variantId, quantity);
    set({ cart: updatedCart, loading: false });
  },

  removeItem: async (variantId) => {
    set({ loading: true });
    const updatedCart = await removeFromCart(variantId);
    set({ cart: updatedCart, loading: false });
  },
}));
