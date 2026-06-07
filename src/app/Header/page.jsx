"use client";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaFirstOrderAlt } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useContext, useState, useEffect } from "react";
import { OffCanvasContext } from "@/Context/canvas";
import { CartContext } from "@/Context/cart";
import { supabase } from "@/Config/Supabase";
import { Register } from "@/components/Register";
import { Login } from "@/components/Login";

export default function Header() {
  const { setOpenCanvas } = useContext(OffCanvasContext);
  const { cart } = useContext(CartContext);
  const [addCategories, setAddCategories] = useState([]);

  // ── Modal state ──
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const totalItems = cart?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, parent_id")
      .order("name");
    if (error) return console.error(error.message);
    setAddCategories(data);
  };

  const getChildren = (parentId) =>
    addCategories.filter((cat) => cat.parent_id === parentId);

  const rootCategories = addCategories.filter((cat) => cat.parent_id === null);

  return (
    <>
      <header className="sticky w-full z-20 top-0 shadow-xl bg-white">

        {/* Top Nav */}
        <nav className="border-b border-gray-100">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl px-4 py-3">

            {/* Logo */}
            <a href="/">
              <img src="https://www.dvago.pk/assets/dvago-logo.svg" className="h-10" alt="DVAGO" />
            </a>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button className="border-2 border-lime-600 text-lime-600 font-semibold text-sm rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-lime-600 hover:text-white transition">
                <IoQrCodeOutline size={18} /> Download the App
              </button>

              <button className="bg-lime-500 text-white font-semibold text-sm rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-lime-600 transition">
                <FaFirstOrderAlt size={16} /> Instant Order
              </button>

              {/* Cart */}
              <button
                onClick={() => setOpenCanvas(true)}
                className="relative bg-lime-500 text-white rounded-xl p-2.5 hover:bg-lime-600 transition"
              >
                <FiShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Profile → opens Login modal */}
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gray-100 text-gray-600 rounded-xl p-2.5 hover:bg-gray-200 transition"
              >
                <CgProfile size={20} />
              </button>
            </div>
          </div>
        </nav>

        {/* Nav Dropdowns */}
        <nav className="border-b border-gray-100">
          <ul className="flex justify-around max-w-7xl mx-auto px-4">
            {rootCategories.map((parent) => {
              const subs = getChildren(parent.id);
              return (
                <li key={parent.id} className="relative group">
                  <button className="inline-flex items-center gap-1 px-3 py-4 text-sm font-semibold text-gray-700 hover:text-lime-600 transition whitespace-nowrap">
                    {parent.name}
                    <svg className="w-3.5 h-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>

                  {subs.length > 0 && (
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl border border-gray-100 rounded-b-xl min-w-56 z-50">
                      <ul className="py-2">
                        {subs.map((sub) => {
                          const children = getChildren(sub.id);
                          return (
                            <li key={sub.id} className="relative group/sub">
                              <div className="flex justify-between items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-lime-50 hover:text-lime-600 cursor-pointer transition">
                                {sub.name}
                                {children.length > 0 && (
                                  <svg className="w-3 h-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                                  </svg>
                                )}
                              </div>

                              {children.length > 0 && (
                                <div className="absolute left-full top-0 hidden group-hover/sub:block bg-white shadow-xl border border-gray-100 rounded-xl min-w-56 z-50">
                                  <ul className="py-2">
                                    {children.map((child) => (
                                      <li key={child.id}
                                        className="px-4 py-2.5 text-sm text-gray-600 hover:bg-lime-50 hover:text-lime-600 cursor-pointer transition">
                                        {child.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* ── Modals ── */}
      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
      />

      <Register
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
      />
    </>
  );
}