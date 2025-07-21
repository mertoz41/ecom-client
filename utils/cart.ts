// utils/cart.ts
import Cookies from "js-cookie";

const CART_COOKIE_KEY = "cartId";

export const getCartIdFromCookie = (): string | undefined => {
  return Cookies.get(CART_COOKIE_KEY);
};

export const saveCartIdToCookie = (cartId: string) => {
  Cookies.set(CART_COOKIE_KEY, cartId, {
    expires: 7, // days
    path: "/", // available site-wide
  });
};

export const removeCartIdCookie = () => {
  Cookies.remove(CART_COOKIE_KEY);
};
