import Form from "../Form";
import CartItems from "../CartItems";

export default function CheckoutPage() {
  return (
    <div className="grid grid-cols-1 text-black lg:grid-cols-2 min-h-screen">
      <div className="p-8 space-y-6 bg-white">
        <h1 className="text-2xl font-semibold">Checkout</h1>

        <Form />
      </div>

      <CartItems />
    </div>
  );
}
