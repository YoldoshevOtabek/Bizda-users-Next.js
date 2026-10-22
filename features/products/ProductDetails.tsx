
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Package,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Product } from "./types/products";


interface ProductDetailProps {
  product: Product;
}

interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);

  const image =
    product.images?.find((item) => item.isMain)?.url ||
    product.images?.[0]?.url ||
    "";

  const stock = Math.max(
    0,
    Number(product.availableStock ?? product.stock ?? 0)
  );

  const price = Number(product.price ?? 0);
  const oldPrice = Number(product.oldPrice ?? 0);
  const totalPrice = price * quantity;

  const increaseQuantity = () => {
    setQuantity((current) => {
      if (current >= stock) return current;
      setMessage("");
      return current + 1;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
    setMessage("");
  };

  const addToCart = () => {
    if (stock <= 0) {
      setMessage("Kechirasiz, mahsulot hozirda mavjud emas.");
      setAdded(false);
      return;
    }

    if (quantity > stock) {
      setMessage(`Omborda faqat ${stock} ta mahsulot mavjud.`);
      setAdded(false);
      return;
    }

    try {
      const savedCart = localStorage.getItem("cart");
      const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

      const existingIndex = cart.findIndex(
        (item) => item.productId === product.id
      );

      if (existingIndex !== -1) {
        const existingQuantity = Number(cart[existingIndex].quantity) || 0;
        const newQuantity = existingQuantity + quantity;

        if (newQuantity > stock) {
          setMessage(
            `Savatda ${existingQuantity} ta bor. Jami ${stock} tadan oshmasligi kerak.`
          );
          setAdded(false);
          return;
        }

        cart[existingIndex] = {
          ...cart[existingIndex],
          quantity: newQuantity,
          price,
          stock,
        };
      } else {
        cart.push({
          productId: product.id,
          name: product.name,
          slug: product.slug || product.id,
          price,
          quantity,
          image,
          stock,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      setAdded(true);
      setMessage(`${quantity} ta mahsulot savatga qo‘shildi!`);
    } catch {
      setAdded(false);
      setMessage("Savatga qo‘shishda xatolik yuz berdi.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 dark:bg-[#0A0C0C] dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600 dark:text-gray-400"
        >
          <ArrowLeft size={18} />
          Mahsulotlarga qaytish
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Mahsulot rasmi */}
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#111414] sm:min-h-[480px] sm:p-10">
            {image ? (
              <Image
                src={image}
                alt={product.name}
                width={600}
                height={600}
                unoptimized
                className="max-h-[420px] w-full object-contain"
              />
            ) : (
              <Package size={100} className="text-gray-300" />
            )}
          </div>

          {/* Mahsulot ma'lumotlari */}
          <div className="flex flex-col">
            <div className="mb-4 flex flex-wrap gap-2">
              {product.isNew && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                  Yangi
                </span>
              )}

              {Number(product.discountPercent) > 0 && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/15 dark:text-red-400">
                  -{product.discountPercent}%
                </span>
              )}

              {product.isFeatured && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                  Tavsiya etiladi
                </span>
              )}
            </div>

            <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
              {product.brand?.name || "Brend ko‘rsatilmagan"}
            </p>

            <h1 className="text-2xl font-bold leading-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Star size={17} className="fill-amber-400 text-amber-400" />
                {Number(product.averageRating ?? 0).toFixed(1)}
              </span>
              <span>
                {product.reviewsCount ?? 0} ta sharh
              </span>
              {product.sku && <span>SKU: {product.sku}</span>}
            </div>

            <div className="my-6 rounded-2xl bg-white p-5 dark:bg-[#111414]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {formatPrice(price)}
                </span>

                {oldPrice > price && (
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(oldPrice)}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className={stock > 0 ? "text-green-600" : "text-red-500"}>
                  {stock > 0
                    ? `Omborda ${stock} ta mavjud`
                    : "Mahsulot qolmagan"}
                </span>
              </div>
            </div>

            {/* Miqdor tanlash */}
            <div className="mb-5">
              <p className="mb-3 text-sm font-semibold">Mahsulot soni</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#111414]">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Mahsulot sonini kamaytirish"
                    className="rounded-l-xl p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-white/10"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="min-w-12 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    aria-label="Mahsulot sonini oshirish"
                    className="rounded-r-xl p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-white/10"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stock > 0 ? `Maksimal: ${stock} ta` : "Mavjud emas"}
                </span>
              </div>
            </div>

            {/* Umumiy narx */}
            <div className="mb-5 flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-white/10">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Jami ({quantity} ta)
              </span>
              <span className="text-xl font-bold">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* Savatga qo'shish */}
            <button
              type="button"
              onClick={addToCart}
              disabled={stock <= 0}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <ShoppingCart size={21} />
              {stock > 0 ? "Savatga qo‘shish" : "Mahsulot mavjud emas"}
            </button>

            {message && (
              <div
                role="status"
                className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm ${
                  added
                    ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {added && <CheckCircle2 size={18} className="shrink-0" />}
                <span>{message}</span>
              </div>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-white/10">
                <Truck className="shrink-0 text-blue-600" size={23} />
                <div>
                  <p className="text-sm font-semibold">Yetkazib berish</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Buyurtma asosida
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-white/10">
                <ShieldCheck
                  className="shrink-0 text-blue-600"
                  size={23}
                />
                <div>
                  <p className="text-sm font-semibold">Sifat kafolati</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mahsulot ma'lumotlari
                  </p>
                </div>
              </div>
            </div>

            {/* Tavsif */}
            <div className="mt-8">
              <h2 className="mb-3 text-xl font-bold">
                Mahsulot haqida
              </h2>
              <p className="whitespace-pre-line leading-7 text-gray-600 dark:text-gray-300">
                {product.description ||
                  product.shortDescription ||
                  "Mahsulot tavsifi mavjud emas."}
              </p>
            </div>

            {/* Qo'shimcha ma'lumotlar */}
            <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 px-4 dark:divide-white/10 dark:border-white/10">
              {product.category?.name && (
                <div className="flex justify-between gap-4 py-4 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Kategoriya
                  </span>
                  <span className="text-right font-medium">
                    {product.category.name}
                  </span>
                </div>
              )}

              {product.sku && (
                <div className="flex justify-between gap-4 py-4 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    SKU
                  </span>
                  <span className="font-medium">{product.sku}</span>
                </div>
              )}

              {product.barcode && (
                <div className="flex justify-between gap-4 py-4 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Shtrix-kod
                  </span>
                  <span className="font-medium">{product.barcode}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
