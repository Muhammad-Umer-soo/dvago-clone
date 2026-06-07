"use client";
import React from "react";
import { object, string, number } from "yup";
import { useFormik } from "formik";
import { supabase } from "@/Config/Supabase";

function Productmodal({ isModalOpen, setModalClose }) {
  console.log(supabase, "Supabase");
  const ProductSchema = object({
    name: string().required(),
    price: number().required(),
    stock: number().required(),
    imgurl: string().required(),
    category_id: number().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      stock: 0,
      imgurl: "",
      category_id: 0,
    },
    onSubmit: async (data) => {
      console.log(data);
      const resp = await supabase.from("products").insert([data]);
      if (resp.error) {
        alert(resp.error.message);
      } else {
        alert("Product Add successfully");
      }
      console.log(resp);
    },
    validationSchema: ProductSchema,
  });
  function setModalClosed() {
    setModalClose();
  }
  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={` ${
        isModalOpen ? "block" : "hidden"
      } bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative top-[30%] left-[35%]  p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white border border-default rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">
              Add New Product
            </h3>
            <button
              onClick={setModalClosed}
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={formik.handleSubmit} className="pt-4 md:pt-6">
            <div className="mb-4">
              <label
                for="email"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="example@company.com"
                required
              />
              <p className="text-red-700">{formik.errors.name}</p>
            </div>
            <div className="mb-4">
              <label
                for="price"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Price
              </label>
              <input
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                id="password"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="•••••••••"
                required
              />
              <p className="text-red-700">{formik.errors.price}</p>
            </div>
            <div className="mb-4">
              <label
                for="stock"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Stock
              </label>
              <input
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                id="password"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="•••••••••"
                required
              />
              <p className="text-red-700">{formik.errors.stock}</p>
            </div>

            <div>
              <label
                for="Imageurl"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Image Url
              </label>
              <input
                name="imgurl"
                value={formik.values.imgurl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="password"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="https://"
                required
              />
              <p className="text-red-700">{formik.errors.imgurl}</p>
            </div>
            <button
              type="submit"
              className="mt-4 text-white bg-blue-600  rounded-md box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Productmodal;
