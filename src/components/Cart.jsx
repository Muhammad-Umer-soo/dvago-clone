"use client";
import React, { useContext, useEffect } from "react";
import { OffCanvasContext } from "@/Context/canvas";
import { CartContext } from "@/Context/cart";
import { AuthContext } from "@/Context/Auth";
import { supabase } from "@/Config/Supabase";
import { useRouter } from "next/navigation";

function Cart() {
  const { isOpenCanvas, setOpenCanvas } = useContext(OffCanvasContext);
  const { state, dispatch } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  console.log(state);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, []); //       remember to correct

  const checkout = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const subtotal = state.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_price: subtotal,
      })
      .select()
      .single();

    if (error) {
      console.log(error);
      return;
    }

    const orderItems = state.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { err } = await supabase.from("order_items").insert(orderItems);

    if (err) {
      console.log(err);
      return;
    }

    dispatch({
      type: "deleteAllProduct",
    });

    alert("Order placed successfully");

    router.push("/Order-page/Orders");
  };

  function setDrawerClose() {
    setOpenCanvas(false);
  }
  function getSubTotal() {
    const price = state.reduce((acc, num) => {
      return acc + num.price * num.quantity;
    }, 0);
    console.log("test");
    return price;
  }
  function deleteData(data) {
    dispatch({
      type: "deleteProduct",
      data: data,
    });
  }

  function deleteAllProduct() {
    dispatch({
      type: "deleteAllProduct",
    });
  }

  if (!user) {
    return <div className="p-6">Please login to view your cart.</div>;
  }

  return (
    <div>
      <div
        id="drawer-right-example"
        className={` ${
          isOpenCanvas ? "fixed" : "hidden"
        } bg-white top-0 shadow-xl right-92 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full w-96`}
      >
        <div className="flex h-full flex-col overflow-y-auto bg-white ">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2
                id="drawer-title"
                className="text-lg font-medium text-gray-900"
              >
                Shopping cart
              </h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  onClick={setDrawerClose}
                  type="button"
                  command="close"
                  commandfor="drawer"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Close panel</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    data-slot="icon"
                    aria-hidden="true"
                    className="size-6"
                  >
                    <path
                      d="M6 18 18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {state.map((v, i) => {
                    return (
                      <li key={v.id} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={v.imgurl}
                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{v.name}</a>
                              </h3>
                              <p className="ml-4">Rs. {v.price * v.quantity}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Salmon</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "decreaseQty",
                                    id: v.id,
                                  })
                                }
                                className="w-7 h-7 border rounded"
                              >
                                -
                              </button>

                              <span>{v.quantity}</span>

                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "increaseQty",
                                    id: v.id,
                                  })
                                }
                                className="w-7 h-7 border rounded"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                onClick={() => deleteData(v)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{getSubTotal()}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <a
                onClick={checkout}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <button
                  onClick={deleteAllProduct}
                  type="button"
                  command="close"
                  commandfor="drawer"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Clear Cart
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
