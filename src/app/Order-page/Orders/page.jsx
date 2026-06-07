"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/Auth";
import { supabase } from "@/Config/Supabase";

export default function OrdersPage() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  const getOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          id,
          quantity,
          price,
          products (
            id,
            name,
            imgurl
          )
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setOrders(data);
    }
  };

  if (!user) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Please login to view orders</h2>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            No orders found.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border rounded-xl p-5 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Order #{order.id}</h3>

                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lime-600">
                      Rs. {order.total_price}
                    </p>

                    <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {order.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="mt-4 bg-lime-500 text-white px-4 py-2 rounded-lg"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}

      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Order #{selectedOrder.id}</h2>

              <button onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className="space-y-4">
              {selectedOrder?.order_items?.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.products.imgurl}
                    alt={item.products.name}
                    className="w-20 h-20 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.products.name}</h3>

                    <p>Qty: {item.quantity}</p>

                    <p className="text-lime-600 font-bold">Rs. {item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rs. {selectedOrder.total_price}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
