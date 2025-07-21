"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PiBag } from "react-icons/pi";

import Image from "next/image";

const cartItems = [
  {
    id: 1,
    name: "Corduroy Hoodie",
    price: 110,
    quantity: 1,
    image: "/images/shirt2.jpg",
  },
  {
    id: 2,
    name: "Worker Wool Jacket",
    price: 100,
    quantity: 1,
    image: "/images/shirt3.jpg",
  },
];

export default function CartDrawer({ buttonSize }: { buttonSize: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer p-2 rounded "
      >
        <PiBag size={buttonSize} />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/35" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 max-w-full flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-200"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md bg-white shadow-xl flex flex-col">
                    <div className="flex items-center justify-between px-4 py-4 border-b">
                      <h2 className="text-lg font-semibold">Your Cart</h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <PiBag size={30} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b pb-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded border"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">${item.price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span className="font-medium">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          // Navigate to checkout or perform action
                        }}
                        className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
                      >
                        Continue to Checkout
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
