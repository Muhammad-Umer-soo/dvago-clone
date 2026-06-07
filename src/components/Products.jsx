"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "@/Context/cart";
import { OffCanvasContext } from "@/Context/canvas";
import { AuthContext } from "@/Context/Auth";
import { useRouter } from "next/navigation";
import { supabase } from "@/Config/Supabase";
import { FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Products() {
  const [product, setProduct] = useState([]);
  const router = useRouter();
  const scrollRef = useRef(null);
  const { user } = useContext(AuthContext);
  const { setOpenCanvas } = useContext(OffCanvasContext);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await supabase.from("products").select("*");
    setProduct(data.data);
  };

  const addToCart = async (product) => {
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: existing } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .single();

    if (existing) {
      await supabase
        .from("cart_items")
        .update({
          quantity: existing.quantity + 1,
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
      });
    }
    dispatch({
      type: "addProduct",
      data: product,
    });

    setOpenCanvas(true);
  };
  // Scroll handler
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="relative max-w-[90vw] mx-auto">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="group absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md rounded-full p-2 hover:bg-lime-500 hover:text-white transition"
        >
          <FiChevronLeft size={20} />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-10 py-3"
        >
          {product.map((v) => (
            <div key={v.id} className="flex flex-col gap-1">
              <div
                onClick={() => router.push(`/product-page/${v.id}`)}
                className="group min-w-46 bg-white border border-gray-400 rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
              >
                <span className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {v.type}
                </span>
                <img
                  src={v.imgurl}
                  alt={v.name}
                  className="h-40 w-fit object-contain"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(v);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 bg-lime-500 text-white p-3 rounded-full"
                >
                  <FiShoppingCart />
                </button>
              </div>
              <div>
                <h3 className="mt-3 font-semibold text-lg line-clamp-2">
                  {v.name}
                </h3>
                <p className="text-lime-500 font-bold mt-2">Rs. {v.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md rounded-full p-2 hover:bg-lime-500 hover:text-white transition"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </>
  );
}

export default Products;
