import apiClient from "./apiClient";
import { getCartIdFromCookie } from "./cart";
export const getCartItems = async () => {
  const cartId = getCartIdFromCookie();
  if (!cartId) return null;

  try {
    const res = await apiClient.get(`/api/cart/${cartId}`);
    return res.data; // returns cart with populated items
  } catch (error) {
    console.error("Failed to get cart:", error);
    return null;
  }
};

export const addToCart = async (variantId: string, quantity = 1) => {
  try {
    const cartId = getCartIdFromCookie();
    // Now send the add-to-cart request
    const res = await apiClient.post("/api/cart/add", {
      cartId,
      variantId,
      quantity,
    });
    return res.data; // Optionally return updated cart
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (variantId: string) => {
  const cartId = getCartIdFromCookie();
  if (!cartId) return;

  try {
    const res = await apiClient.post("/api/cart/remove", {
      cartId,
      variantId,
    });

    return res.data; // updated cart
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    throw error;
  }
};
