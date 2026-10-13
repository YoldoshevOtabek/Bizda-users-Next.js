"use client";

import Link from "next/link";
import { Carousel } from "antd";
import { BannerItem } from "./types/type";



export default function BannerCarousel({
  banners,
}: {
  banners: BannerItem[];
}) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4">
      <Carousel
        autoplay
        autoplaySpeed={4000}
        dots
        infinite={banners.length > 1}
      >
        {banners.map((banner) => (
          <div key={banner.id}>
            <div
              className="relative flex min-h-[260px] items-center overflow-hidden rounded-2xl bg-cover bg-center px-6 py-10 sm:min-h-[360px] sm:px-12 md:min-h-[420px] md:px-16"
            >
              <picture className="absolute inset-0"> <source media="(max-width: 639px)" srcSet={banner.mobileImage || banner.image} /> <img src={banner.image} alt={banner.title} className="h-full min-h-[260px] w-full object-cover sm:min-h-[360px] md:min-h-[420px]" /> </picture>
              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10 max-w-[600px] text-white">
                <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                  {banner.title}
                </h2>

                <p className="mb-7 text-base sm:text-lg md:text-xl">
                  {banner.subtitle}
                </p>

                <Link
                  href={banner.link || "/products"}
                  className="inline-flex rounded-lg bg-[#43ad6f] px-6 py-3 font-semibold text-white transition hover:bg-[#35965c]"
                >
                  {banner.buttonText || "Shop Now"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}