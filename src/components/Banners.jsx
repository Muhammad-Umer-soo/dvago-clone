import React from "react";

export default function Banners() {
  return (
    <div className="w-full flex flex-col items-center gap-6 py-10">
      <div className="w-[80vw] flex gap-6">
        <img
          src="https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FAcidity%2520%2526%2520Heartburn%2520copy.jpg.jpeg&w=1400&q=75"
          alt="Image 2"
          className="w-1/2 h-auto rounded-xl object-cover"
        />
        <img
          src="https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FIndigestion%2520copy.jpg.jpeg&w=1400&q=75"
          alt="Image 3"
          className="w-1/2 h-auto rounded-xl object-cover"
        />
      </div>
      <div className="w-[80vw]">
        <img
          src="https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2Fcategory%2520small%2520web%2520banner.jpg&w=1400&q=75"
          alt="Image 1"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
