"use client";
import { AuthContext } from "@/Context/Auth";
import { useContext } from "react";
import { CartContext } from "@/Context/cart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { state: cart, dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!user) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Please login first</h2>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Products */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-4 flex gap-4"
            >
              <img
                src={item.imgurl}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>

                <p className="text-lime-600 font-bold">Rs. {item.price * item.quantity}</p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "decreaseQty",
                        id: item.id,
                      })
                    }
                    className="w-8 h-8 border rounded"
                  >
                    -
                  </button>

                  <span>Qty: {item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "increaseQty",
                        id: item.id,
                      })
                    }
                    className="w-8 h-8 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  dispatch({
                    type: "deleteProduct",
                    data: item,
                  })
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white border rounded-xl p-6 h-fit">
          <h2 className="font-bold text-xl mb-4">Order Summary</h2>

          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>

          <button
            onClick={() => router.push("/Order-page/Orders")}
            className="w-full bg-lime-500 text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
