import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package, Sparkles } from "lucide-react";
import { Brand } from "./types/brand";



interface BrandsProps {
  brands: Brand[];
}

export default function Brands({ brands }: BrandsProps) {
  const activeBrands = brands.filter((brand) => brand.isActive);

  return (
    <section className="bg-white py-16 text-gray-900 dark:bg-[#0A0C0C] dark:text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Mashhur brendlar
            </h2>

            
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Jami{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {activeBrands.length} ta brend
            </span>
          </p>
        </div>

        {/* Brands */}
        {activeBrands.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {activeBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5 dark:border-white/10 dark:bg-[#111414] dark:hover:border-green-500/40 sm:p-5"
              >
                {/* Logo */}
                <div className="mb-5 flex h-24 items-center justify-center rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logosi`}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-gray-400">
                      {brand.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-base font-semibold transition-colors group-hover:text-green-600 dark:group-hover:text-green-400">
                    {brand.name}
                  </h3>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-gray-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-500"
                  />
                </div>

                {/* Products count */}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Package size={14} />
                  <span>
                    {brand._count?.products ?? 0} ta mahsulot
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center dark:border-white/10">
            <Package size={36} className="mx-auto mb-3 text-gray-400" />

            <h3 className="font-semibold">
              Hozircha brendlar mavjud emas
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Keyinroq yana tekshirib ko‘ring.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}