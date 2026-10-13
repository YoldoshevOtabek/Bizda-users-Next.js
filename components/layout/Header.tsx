"use client";

import { useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  DownOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Input, Badge, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

const languageItems: MenuProps["items"] = [
  {
    key: "en",
    label: "English",
  },
  {
    key: "uz",
    label: "O'zbek",
  },
  {
    key: "ru",
    label: "Русский",
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white ">
      <div className="h-[60px] ">
        <div className="mx-auto flex h-full max-w-[1220px] items-center justify-between px-5 border-b border-[#eeeeee] ">
          {/* LEFT */}
          <div className="flex h-full items-center gap-5">
            {/* LOGO */}
            <Link
              href="/"
              
            >
              <Image
                src="/logo.png"
                alt="DealPart"
                width={105}
                height={30}
                priority
              />
             
            </Link>

            <div className="h-6 w-[1px] bg-[#bdbdbd]" />

            {/* LOCATION */}
            <button className="hidden items-center gap-2 sm:flex">
              <EnvironmentOutlined className="text-[19px] text-black" />

              <div className="flex flex-col text-left leading-[13px]">
                <span className="text-[12px] text-[#777]">Deliver to</span>

                <span className="text-[14px] font-medium text-[#111]">
                  Your address
                </span>
              </div>
            </button>

            <div className="hidden h-6 w-[1px] bg-[#eeeeee] sm:block" />

            {/* LANGUAGE */}
            <Dropdown
              menu={{
                items: languageItems,
              }}
              trigger={["click"]}
            >
              <button className="hidden items-center gap-1 text-[14px] font-medium sm:flex">
                🇺🇸 EN
                <DownOutlined className="text-[12px]" />
              </button>
            </Dropdown>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* SEARCH */}
            <div className="hidden md:block">
              <Input
                placeholder="What are you looking for"
               
                suffix={
                  <div className="flex h-[28px] items-center gap-1 rounded-full bg-white px-3 text-[11px] text-black shadow-sm">
                    <SearchOutlined />
                    Search
                  </div>
                }
                className="
                  !h-[32px]
                  !w-[280px]
                  !rounded-full
                  !border-none
                  !bg-[#eef9ec]
                  !px-3
                  !shadow-none
                "
              />
            </div>

            {/* USER */}
            <button className="text-[17px] text-black hover:text-[#43ad6f]">
              <UserOutlined />
            </button>

            {/* CART */}
            <Link
              href="/cart"
              className="flex items-center gap-1 text-[13px] font-medium text-black hover:text-[#43ad6f]"
            >
              <ShoppingCartOutlined className="text-[17px]" />
              <span className="hidden sm:inline">Cart</span>
            </Link>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="ml-1 text-[18px] md:hidden"
            >
              {mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </div>

     

      {/* ================= NAVBAR ================= */}

                <Navbar/>
      {/* ================= MOBILE NAV ================= */}
                <MobileNavbar 
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                />
    </header>
  );
}
