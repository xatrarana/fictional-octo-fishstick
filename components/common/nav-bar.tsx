import React from "react";
import logo from "@/public/logo/triLogo.webp";
import Image from "next/image";
import ResponsiveBar from "./responsive-bar";
import { GetActiveFlashNews } from "@/actions/flash-news";
import { getGroupsByOrder } from "@/data/group";
import Link from "next/link";
import { getCategories } from "@/actions/category";
const NavBar = async () => {
  const flashNews = await GetActiveFlashNews();
  const groups = await getGroupsByOrder();

  const response = await getCategories();




  return (
    <header className=" px-1  shadow-sm ">
      <div className="max-w-7xl mx-auto mt-2 flex items-center justify-between relative">
        <Link href={'/'} className=" flex items-center">
          <Image
            src={logo}
            alt="Logo"
            className="object-cover rounded-sm"
            width={320}
            height={100}
            priority
          />
        </Link>
        <ResponsiveBar groups={groups} categories={response.categories} />
      </div>
      <div className="flex">
        <div className="w-full flex items-center overflow-hidden h-8 bg-gradient-to-r from-white-50 to-slate-50">
          <div className="animate-marquee flex  items-center  w-full ">
            {flashNews.length > 0 &&
              flashNews.map((news, index) => (
                <div key={index} className="mr-2">
                  <p className="text-center text-sm text-green-700 whitespace-nowrap">
                    {news.message}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-green-800 text-center py-1 px-2">
          <h5 className="text-sm text-white">Notice</h5>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
