import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import AI from '@/public/logo/AI.png'
import { BiSolidEnvelopeOpen, BiSolidPhoneCall, BiSolidMapPin, BiLogoFacebook, BiLogoWhatsapp, BiLogoTwitter } from "react-icons/bi";
import samll from "@/public/logo/small.webp"
import qr from "@/public/logo/qr.webp"
import { otherLinks, useFulLinks } from '@/constant/nav-components';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const date = new Date()

const Footer = () => {

  return (
    <footer className="flex  flex-col bg-green-800 pt-4">
      <div className='footer grid  gap-3 grid-cols-1  md:grid-cols-2 lg:grid-cols-6 w-full max-w-7xl mx-auto p-2  md:p-5'>

        <div className='md:col-span-2 lg:col-span-2'>
          <Link href={'/'} className='flex items-center no-underline gap-x-3 w-full '>
            {
              <Image width={70} height={70} className='invert brightness-0' src={samll} alt={"data.companyName"} />
            }
            <h3 className='text-white text-md  lg:font-semibold lg:text-2xl md:text-xl'>{"Trijyoti Saving and Credit Co-operative Ltd."}</h3>
          </Link>

          <div className='text-sm font-normal text-md flex flex-col gap-y-3 text-white mt-4'>
            <p className='flex items-center gap-x-2'> <BiSolidMapPin className='h-5 w-5 text-white' />ठेगाना:  {"data.companyAddress"}</p>
            <p className='flex items-center gap-x-2' > <BiSolidEnvelopeOpen className='h-5 w-5 text-white' /> ईमेल: {"data.companyEmail"}</p>
            <p className='flex items-center gap-x-2' > <BiSolidPhoneCall className='h-5 w-5 text-white' /> whatsapp: {"data.whatsapp"}</p>
          </div>

        </div>

        <div className='flex flex-col gap-y-2 md:lg:col-span-1'>
          <h5 className=" text-white text-md md:lg:text-lg  font-semibold">उपयोगी लिङ्कहरू</h5>
          {
            useFulLinks.map((nav) => {
              return (
                <Link key={nav.name} className='text-gray-100 no-underline hover:text-yellow-400 text-md ' href={nav.href}>{nav.name}</Link>
              )
            })
          }
        </div>

        <div className='flex flex-col gap-y-2 md:lg:col-span-1'>
          <h5 className="text-white md:lg:text-lg font-semibold text-md">अरू लिङ्कहरू</h5>
          {
            otherLinks.map((nav) => {
              return (
                <Link key={nav.name} className='text-gray-100 no-underline hover:text-yellow-400 text-md ' href={nav.href}>{nav.name}</Link>
              )
            })
          }
        </div>

        <div className='md:lg:col-span-1'>
          <h5 className="text-white md:lg:text-lg font-semibold text-md">सामाजिक लिङ्कहरू</h5>
          {
            <div className="flex items-center gap-5 mt-4">
              {
                <div className='bg-gray-100 flex items-center justify-center rounded-full'>
                  <Link target='_auto' href={"data.facebook"}>
                    <BiLogoFacebook className='h-9 w-9 text-green-500 p-0.5' />
                  </Link>
                </div>
              }
              {
                <div className='bg-gray-100 flex items-center justify-center rounded-full'>
                  <Link href={"data.youtube"}>
                    <BiLogoTwitter className='h-9 w-9 text-green-500 p-0.5' />
                  </Link>
                </div>
              }
              {
                <div className='bg-gray-100 flex items-center justify-center rounded-full'>
                  <Link href={` https://wa.me/${"data.whatsapp"}`}>
                    <BiLogoWhatsapp className='h-9 w-9 text-green-500 p-0.5' />
                  </Link>
                </div>
              }

            </div>

          }


        </div>

        <div className='flex items-center justify-center flex-col md:lg:col-span-1'>
          <span className='font-bold text-lg text-white '> Scan to Pay</span>
          <Image priority src={qr} className='h-auto w-auto' alt='scan to pay' height={100} width={100} />
        </div>

      </div>
      <aside className='w-full flex flex-col md:lg:flex-row items-center mt-5 mb-3 justify-center gap-3'>


        <div className='flex items-center flex-col md:lg:flex-row justify-center gap-2'>
          <span className='text-gray-200'>Copyright &copy; {date.getFullYear()}
          </span>
          <Link href={'/'} className='font-bold no-underline text-white'>{"Trijyoti Saving and Credit Co-operative Ltd."}</Link>
        </div>


        <div className='group relative '>
          <ToolTipItem text={'Powered by Aarshia Infotech Pvt. Ltd.'}>
            <Link href={"https:/aiz.com.np"} className='group' target='_blank'>
            <Image src={AI} alt='AI' width={30} height={30} className='objec-fit'/>
            </Link>
          </ToolTipItem>
        </div>

        <div>

        </div>
      </aside>
    </footer>
  )
}

export default Footer


export const ToolTipItem = ({ children, text }: { children: React.ReactNode, text: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {
            children
          }
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}