import Link from "next/link";
import { getProducts } from "@/services/productService";
import {
  Package,
  Boxes,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { Product } from "./types/products";

function formatPrice(price: number) {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
}

export default async function Products() {
  const res = await getProducts();

  const products: Product[] = Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res)
      ? res
      : [];

  if (products.length === 0) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <Package size={30} className="text-gray-400" />
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Mahsulotlar topilmadi
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Hozircha mahsulot mavjud emas.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Mahsulotlar
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Elektron turdagi barcha mahsulotlar shu yerda
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
          <Boxes size={18} className="text-indigo-600" />
          <span>Jami:</span>
          <span className="font-bold text-gray-900">
            {products.length} ta
          </span>
        </div>
      </div>

    
      

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const mainImage =
            product.images?.find((image) => image.isMain) ??
            product.images?.[0];

          const stock =
            product.availableStock ?? product.stock ?? 0;

          return (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-5">
                {mainImage?.url ? (
                  <img
                    src={mainImage.url}
                    alt={mainImage.alt || product.name}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Package size={64} className="text-gray-300" />
                )}

                {/* Product status */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {product.isNew && (
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Yangi
                    </span>
                  )}

                  {product.isFeatured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      <Star size={12} />
                      Tavsiya
                    </span>
                  )}

                  {!product.isActive && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                      Faol emas
                    </span>
                  )}
                </div>

                {product.discountPercent > 0 && (
                  <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                {/* Brand and category */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                    {product.brand?.name || "Brendsiz"}
                  </span>

                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    {product.category?.name || "Kategoriyasiz"}
                  </span>
                </div>

                {/* Name */}
                <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-900 transition group-hover:text-indigo-600">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                  {product.shortDescription ||
                    product.description ||
                    "Mahsulot tavsifi mavjud emas."}
                </p>

                {/* SKU */}
                <p className="mt-3 text-xs text-gray-400">
                  SKU: {product.sku || "—"}
                </p>

                {/* Price */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="flex min-h-12 flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </p>

                      {product.oldPrice > product.price && (
                        <p className="mt-1 text-xs text-gray-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </p>
                      )}
                    </div>

                    <span
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                        stock <= 5
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {stock > 0 ? `${stock} dona` : "Tugagan"}
                    </span>
                  </div>
                </div>

                {/* View button */}
                <Link
                  href={`/products/${ product.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
                >
                  Mahsulotni ko‘rish
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}