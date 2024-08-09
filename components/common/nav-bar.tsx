import React from "react";
import Image from "next/image";
import ResponsiveBar from "./responsive-bar";
import { GetActiveFlashNews } from "@/actions/flash-news";
import { getGroupsByOrder } from "@/data/group";
import Link from "next/link";
import { getCategories } from "@/actions/category";
import { getChairmanDetails } from "@/data/member";
import { GetDetailsData } from "@/data/org";
import { BiSolidEnvelope, BiSolidMap, BiSolidPhoneCall } from "react-icons/bi";
const NavBar = async () => {
  const flashNews = await GetActiveFlashNews();

  const org = await GetDetailsData();

  const groups = await getGroupsByOrder();

  const response = await getCategories();

  const chairman = await getChairmanDetails();

  return (
    <header className=" shadow-sm ">
      <div className=" min-h-12 bg-green-800 flex flex-col md:flex-row  gap-y-2 p-2 md:gap-x-5  md:items-center justify-start md:justify-end pr-5">
        {org && (
          <div className="flex items-center  gap-x-5">
            <BiSolidEnvelope className="inline-block text-white" />
            <Link href={`mailto:${org.email}`} className="text-white text-sm">
              {org.email}
            </Link>
          </div>
        )}
        {org && (
          <div className="flex items-center  gap-x-5">
            <BiSolidMap className="inline-block text-white" />
            <span className="text-white text-sm">{org.address}</span>
          </div>
        )}
        {org && (
          <div className="flex items-center  gap-x-5">
            <BiSolidPhoneCall className="inline-block text-white" />
            <span className="text-white text-sm">{org.landline}</span>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto mt-2 flex items-center justify-between relative">
        <Link href={"/"} className=" flex items-center">
          {org?.primaryLogoUrl && (
            /* eslint-disable-next-line */
            <img
              src={org.primaryLogoUrl}
              alt="Logo"
              className="object-cover rounded-sm hidden lg:inline-block"
              width={320}
              height={100}
            />
          )}
          {org?.secondaryLogoUrl && (
            /* eslint-disable-next-line */
            <img
              src={org.secondaryLogoUrl}
              alt="Logo"
              className="object-cover rounded-sm lg:hidden p-2"
              width={50}
              height={50}
            />
          )}
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
