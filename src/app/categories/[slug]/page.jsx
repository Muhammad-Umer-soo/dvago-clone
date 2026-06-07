"use client";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "@/Context/cart";
import { OffCanvasContext } from "@/Context/canvas";
import { supabase } from "@/Config/Supabase";
import { useParams } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

function Categories() {
  const router = useParams();
  const [product, setProduct] = useState([]);
  const { setOpenCanvas } = useContext(OffCanvasContext);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    if (router?.slug) {
      getdetails();
    }
  }, [router?.slug]);

  const getdetails = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug,
        type
      )
    `)
    .eq("categories.slug", router.slug);

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (!error) setProduct(data);
};

  const addToCart = (data) => {
    dispatch({ type: "addProduct", data });
    console.log("Opening canvas");
    setOpenCanvas(true);
  };

  return (
    <div className="relative max-w-[90vw] mx-auto grid grid-cols-5 gap-4">
      {product.map((v) => (
        <div key={v.category_id} className="group flex flex-col">
          <div className="group min-w-46 bg-white border border-gray-400 rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition">
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
  );
}

export default Categories;
