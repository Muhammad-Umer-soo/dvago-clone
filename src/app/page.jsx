import Products from "@/components/Products";
import Cart from "@/components/Cart";
import Categories from "@/components/Categories";
import Banners from "@/components/Banners";
import Advertise from "@/components/Advertise"
export default function Home() {
  return (
    <>
      <Cart />
      <Advertise/>
      <Categories />
      <Banners/>
      <Products />
      <Banners/>
    </>
  );
}
