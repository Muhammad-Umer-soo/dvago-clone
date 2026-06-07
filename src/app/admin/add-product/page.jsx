"use client";
import React, { useState } from "react";
import Productmodal from "@/Components/Productmodal";
export default function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addProduct = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="m-3 flex justify-end">
        <button
          onClick={addProduct}
          className="bg-blue-600 p-4 text-2xl rounded-md text-white"
        >
          Add New Product
        </button>
      </div>

      <div className="relative overflow-x-auto bg-gray-200 shadow-xs rounded-base border border-gray-300 mx-3 rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-white bg-blue-600 border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Price
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Product Image
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-neutral-primary border-b border-default">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">231</td>
            </tr>
            <tr className="bg-neutral-primary border-b border-default">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4">423</td>
            </tr>
            <tr className="bg-neutral-primary">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4">121</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Productmodal isModalOpen={isModalOpen} setModalClose={closeModal} />
    </div>
  );
}
