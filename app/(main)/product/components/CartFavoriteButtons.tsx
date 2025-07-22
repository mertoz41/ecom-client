"use client";
import { addToCart, removeFromCart } from "@/utils/cartActions";
import { useCartStore } from "@/app/store/cartStore";
export default function CartFavoriteButtons({
  variantId,
}: {
  variantId: string;
}) {
  const updateCart = useCartStore((state) => state.updateCart);
  const cart = useCartStore((state) => state.cart);
  const addVariantToCart = async (id: string) => {
    const newCart = await addToCart(id, 1);
    updateCart(newCart);
  };
  console.log(cart)
  const foundItem = cart?.items.find((item) => item.variant._id === variantId);
  const cartAction = (id: string) => {
    if (foundItem) {
      removeVariantFromCart(id);
    } else {
      addVariantToCart(id);
    }
  };
  const removeVariantFromCart = async (id: string) => {
    const newCart = await removeFromCart(id);
    updateCart(newCart);
  };
  return (
    <div className="flex flex-col gap-3 mb-6">
      <button
        onClick={() => cartAction(variantId)}
        className="w-full cursor-pointer bg-black text-white py-3 rounded font-semibold hover:bg-gray-900"
      >
        {foundItem ? " Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
