import { MenuOutlined } from "@ant-design/icons"
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function Navbar() {
  const pathname = usePathname();
  return (
     <div className="hidden h-[46px] md:block">
     <div className="mx-auto flex h-full max-w-[1220px] items-center justify-between px-5 border-b border-[#eeeeee]">
       {/* LEFT NAV */}
       <nav className="flex items-center gap-5">
         <button className="flex items-center gap-1 text-[16px] text-[#222] transition hover:text-[#43ad6f]">
           <MenuOutlined className="text-[16px]" />
           Menu
         </button>

         <span className="h-4 w-[1px] bg-[#bdbdbd]" />

         <Link
           href="/explore"
           className="text-[16px] text-[#333] hover:text-[#43ad6f]"
         >
           Explore
         </Link>

         <Link
           href="/deals"
           className="text-[16px] text-[#333] hover:text-[#43ad6f]"
         >
           Deals
         </Link>

         <Link
           href="/saved"
           className="text-[16px] text-[#333] hover:text-[#43ad6f]"
         >
           Saved
         </Link>
       </nav>

       {/* RIGHT NAV */}
<nav className="flex h-full items-center gap-8">
  <Link
    href="/"
    className={`relative flex h-full items-center text-[16px] font-medium transition ${
      pathname === "/"
        ? "text-[#43ad6f]"
        : "text-[#222] hover:text-[#43ad6f]"
    }`}
  >
    Home

    {pathname === "/" && (
      <span className="absolute bottom-[14px] left-0 h-[1px] w-full bg-[#43ad6f]" />
    )}
  </Link>

  <Link
    href="/products"
    className={`relative flex h-full items-center text-[16px] font-medium transition ${
      pathname === "/products"
        ? "text-[#43ad6f]"
        : "text-[#222] hover:text-[#43ad6f]"
    }`}
  >
    Product

    {pathname === "/products" && (
      <span className="absolute bottom-[14px] left-0 h-[1px] w-full bg-[#43ad6f]" />
    )}
  </Link>

  <Link
    href="/about"
    className={`relative flex h-full items-center text-[16px] font-medium transition ${
      pathname === "/about"
        ? "text-[#43ad6f]"
        : "text-[#222] hover:text-[#43ad6f]"
    }`}
  >
    About Us

    {pathname === "/about" && (
      <span className="absolute bottom-[14px] left-0 h-[1px] w-full bg-[#43ad6f]" />
    )}
  </Link>

  <Link
    href="/contact"
    className={`relative flex h-full items-center text-[16px] font-medium transition ${
      pathname === "/contact"
        ? "text-[#43ad6f]"
        : "text-[#222] hover:text-[#43ad6f]"
    }`}
  >
    Contact

    {pathname === "/contact" && (
      <span className="absolute bottom-[14px] left-0 h-[1px] w-full bg-[#43ad6f]" />
    )}
  </Link>
</nav>
     </div>
   </div>
  )
}
