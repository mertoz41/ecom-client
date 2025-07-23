"use client";
import { addToCart, removeFromCart } from "@/utils/cartActions";
import { useCartStore } from "@/app/store/cartStore";
import { useToastStore } from "@/app/store/toastStore";
export default function CartFavoriteButtons({
  variantId,
}: {
  variantId: string;
}) {
  const updateCart = useCartStore((state) => state.updateCart);
  const cart = useCartStore((state) => state.cart);
  const addToast = useToastStore((s) => s.addToast);

  const addVariantToCart = async (id: string) => {
    const newCart = await addToCart(id, 1);
    updateCart(newCart);
  };
  const foundItem = cart?.items.find((item) => item.variant._id === variantId);
  const cartAction = (id: string) => {
    if (foundItem) {
      removeVariantFromCart(id);
      addToast({ message: "Item removed from cart", type: "success" });
    } else {
      addVariantToCart(id);
      addToast({ message: "Item added to cart!", type: "success" });
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
