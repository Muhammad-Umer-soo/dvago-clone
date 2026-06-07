"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/Config/Supabase";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Categories() {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    getCat();
  }, []);

  const getCat = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    console.log(data, error);
    setProduct(data);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative max-w-[90vw] mx-auto">
      <div className="my-6">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="group absolute right-12 top-0 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md rounded-full p-2 hover:bg-lime-500 hover:text-white transition"
        >
          <FiChevronLeft />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md rounded-full p-2 hover:bg-lime-500 hover:text-white transition"
        >
          <FiChevronRight />
        </button>
      </div>

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-10 py-3"
      >
        {product.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/categories/${item.slug}`)}
            className="shrink-0 w-45 h-50 flex flex-col justify-between border rounded-xl bg-white cursor-pointer hover:shadow-lg transition"
          >
            <div className="flex items-center justify-center">
              <img className="rounded-2xl" src={item.imgurl} alt="image" />
            </div>

            <div className="text-center px-2">
              <h3 className="text-sm font-medium">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
