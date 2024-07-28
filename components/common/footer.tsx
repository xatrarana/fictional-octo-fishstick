import Link from "next/link";
import React from "react";
import Image from "next/image";
import AI from "@/public/logo/AI.png";
import {
  BiSolidEnvelopeOpen,
  BiSolidPhoneCall,
  BiSolidMapPin,
  BiLogoFacebook,
  BiLogoWhatsapp,
  BiLogoTwitter,
  BiLogoInstagramAlt,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import samll from "@/public/logo/small.webp";
import qr from "@/public/logo/qr.webp";
import { otherLinks, useFulLinks } from "@/constant/nav-components";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFooterData } from "@/data/footer";
import { cn } from "@/lib/utils";

const date = new Date();

const Footer = async () => {
  const response = await getFooterData();
  const { data } = response;
  return (
    <footer className="flex  flex-col bg-green-800 pt-4">
      <div
        className={cn([
          "footer grid  gap-3 grid-cols-1  md:grid-cols-2 lg:grid-cols-6 w-full max-w-7xl mx-auto p-2  md:p-5",
          `${
            data?.paymentHeader
              ? "lg:grid-cols-6"
              : "lg:grid-cols-5 md:grid-cols-4"
          }`,
        ])}
      >
        <div className="md:col-span-2 lg:col-span-2">
          <Link
            href={"/"}
            className={`flex items-center no-underline ${
              data?.secondaryLogoUrl ? "gap-x-3" : "gap-x-0"
            } w-full `}
          >
            {data?.secondaryLogoUrl && (
              <Image
                width={70}
                height={70}
                loading="lazy"
                className="invert brightness-0"
                src={data.secondaryLogoUrl || samll}
                alt={data?.name}
              />
            )}

            <h3 className="text-white text-xl font-semibold  lg:font-semibold lg:text-2xl md:text-xl">
              {data?.name}
            </h3>
          </Link>

          <div className="text-sm font-normal text-md flex flex-col gap-y-3 text-white mt-4">
            {data?.address && (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={
                  data?.mapUrl ??
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    data?.address || ""
                  )}`
                }
                className="flex items-center gap-x-2"
              >
                <BiSolidMapPin className="h-5 w-5 text-white" />
                ठेगाना: {data?.address}
              </Link>
            )}
            {data?.email && (
              <Link
                href={`mailto:${data?.email}`}
                className="flex items-center gap-x-2"
              >
                <BiSolidEnvelopeOpen className="h-5 w-5 text-white" /> ईमेल:{" "}
                {data?.email}
              </Link>
            )}
            {data?.whatsappNumber && (
              <Link
                href={`https://wa.me/${data?.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-x-2"
              >
                <BiSolidPhoneCall className="h-5 w-5 text-white" /> whatsapp:{" "}
                {data?.whatsappNumber}
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-2 md:lg:col-span-1">
          <h3 className=" text-white text-md md:lg:text-lg  font-semibold">
            उपयोगी लिङ्कहरू
          </h3>
          {useFulLinks.map((nav) => {
            return (
              <Link
                key={nav.name}
                className="text-gray-100 no-underline hover:text-yellow-400 text-md "
                href={nav.href}
              >
                {nav.name}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-y-2 md:lg:col-span-1">
          <h3 className="text-white md:lg:text-lg font-semibold text-md">
            अरू लिङ्कहरू
          </h3>
          {otherLinks.map((nav) => {
            return (
              <Link
                key={nav.name}
                className="text-gray-100 no-underline hover:text-yellow-400 text-md "
                href={nav.href}
              >
                {nav.name}
              </Link>
            );
          })}
        </div>

        <div className="md:lg:col-span-1">
          <h3 className="text-white md:lg:text-lg font-semibold text-md">
            सामाजिक लिङ्कहरू
          </h3>
          {
            <div className="flex items-center flex-wrap gap-5 mt-4">
              {data?.facebookUrl && (
                <div className="bg-gray-100 flex items-center justify-center rounded-full">
                  <Link
                    target="_blank"
                    href={data?.facebookUrl ?? "https://facebook.com/"}
                    aria-label="Facebook"
                  >
                    <BiLogoFacebook className="h-7 w-7 text-green-500 p-0.5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                </div>
              )}
              {data?.twitterUrl && (
                <div className="bg-gray-100 flex items-center justify-center rounded-full">
                  <Link
                    target="_blank"
                    href={data?.twitterUrl ?? "https://twitter.com/"}
                    aria-label="Twitter"
                  >
                    <BiLogoTwitter className="h-7 w-7 text-green-500 p-0.5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              )}
              {data?.whatsappNumber && (
                <div className="bg-gray-100 flex items-center justify-center rounded-full">
                  <Link
                    target="_blank"
                    href={data?.whatsappNumber ?? "https://whatsapp.com/"}
                    aria-label="Whatsapp"
                  >
                    <BiLogoWhatsapp className="h-7 w-7 text-green-500 p-0.5" />
                    <span className="sr-only">Whatsapp</span>
                  </Link>
                </div>
              )}
              {data?.instagramUrl && (
                <div className="bg-gray-100 flex items-center justify-center rounded-full">
                  <Link
                    target="_blank"
                    href={data?.instagramUrl ?? "https://instagram.com/"}
                    aria-label="Instagram"
                  >
                    <BiLogoInstagramAlt className="h-7 w-7 text-green-500 p-0.5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </div>
              )}
              {data?.linkedinUrl && (
                <div className="bg-gray-100 flex items-center justify-center rounded-full">
                  <Link
                    target="_blank"
                    href={data?.linkedinUrl ?? "https://whatsapp.com/"}
                    aria-label="Linkedin"
                  >
                    <BiLogoLinkedinSquare className="h-7 w-7 text-green-500 p-0.5" />
                    <span className="sr-only">Linkedin</span>
                  </Link>
                </div>
              )}
            </div>
          }
        </div>

        <div className="flex items-center justify-center flex-col md:lg:col-span-1">
          {(data?.paymentHeader || data?.paymentLogoUrl) && (
            <>
              <h3 className="font-semibold text-lg text-white">
                {data.paymentHeader}
              </h3>
            {
              data?.paymentLogoUrl && (
                <Image
                  src={data.paymentLogoUrl}
                  alt="payment"
                  width={100}
                  height={100}
                  className="object-fit"
                />
              )
            }
            </>
          )}
        </div>
      </div>
      <aside className="w-full flex flex-col md:lg:flex-row items-center mt-5 mb-3 justify-center gap-3">
        <div className="flex items-center flex-col md:lg:flex-row justify-center gap-2">
          <span className="text-gray-200">
            Copyright &copy; {date.getFullYear()}
          </span>
          <Link href={"/"} className="font-bold no-underline text-white">
            {data?.name && data.name}
          </Link>
        </div>

        <div className="group relative ">
          <ToolTipItem text={"Powered by Aarshia Infotech Pvt. Ltd."}>
            <Link href={"https:/aiz.com.np"} className="group" target="_blank">
              <Image
                src={AI}
                alt="AI"
                width={30}
                height={30}
                className="objec-fit"
              />
            </Link>
          </ToolTipItem>
        </div>

        <div></div>
      </aside>
    </footer>
  );
};

export default Footer;

export const ToolTipItem = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
