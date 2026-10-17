import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

type MobileNavbarProps = {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileNavbar({mobileOpen,setMobileOpen}:MobileNavbarProps) {
  return (
    <div>
         {mobileOpen && (
        <div className="border-t border-[#eeeeee] bg-white md:hidden">
          <div className="px-5 py-4">
            {/* MOBILE SEARCH */}
            <div className="mb-5">
              <Input
                placeholder="What are you looking for"
                prefix={<SearchOutlined />}
                className="
                  !h-[38px]
                  !rounded-full
                  !border-[#e5e5e5]
                "
              />
            </div>

            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#43ad6f]"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-black"
              >
                Product
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-black"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-black"
              >
                Contact
              </Link>

              <hr className="border-[#eeeeee]" />

              <Link
                href="/explore"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-black"
              >
                Explore
              </Link>

              <Link
                href="/deals"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-black"
              >
                Deals
              </Link>

              <Link
                href="/saved"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-black"
              >
                Saved
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
