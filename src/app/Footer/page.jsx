import React from "react";

export default function page() {
  return (
    <>
      <footer className="bg-neutral-primary-soft w-full">
        <div className="py-4">
          <div className="md:flex md:justify-around p-8  bg-lime-600 w-full size-100 text-white">
            <div className="mb-6 md:mb-0 w-7xl h-7xl">
              <a href="/">
                <img src="https://www.dvago.pk/assets/dvago-logo.svg" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                  Resources
                </h2>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <a href="https://flowbite.com/" className="hover:underline">
                      Flowbite
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                      Tailwind CSS
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                  Follow us
                </h2>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/4eeurUVvTy"
                      className="hover:underline"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                  Legal
                </h2>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3 text-red-600 px-5">
            <span>
              Disclaimer Our official website is www.dvago.pk and our official
              mobile app is Dvago – Pharmacy & Health by Novacare (Pvt) Ltd.We
              are not liable for orders placed through unauthorized
              platforms.Stay vigilant against scams. Report any fraudulent
              websites, apps, or numbers falsely claiming association with Dvago
              to (021) 11-11-38246 immediately. Thank you.
            </span>
            <br />
            <span className="text-sm text-body sm:text-center">
              © 2026 Dvago – A Brand by Nova Care (Pvt) Ltd.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
