import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header/page";
import Footer from "./Footer/page";
import { OffCanvasProvider } from "@/Context/canvas";
import { CartProvider } from "@/Context/cart";
import { AuthProvider } from "@/Context/Auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DVAGO",
  description: "Medicine Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <OffCanvasProvider>
              <Header />
              {children}
              <Footer />
            </OffCanvasProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
