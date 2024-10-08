'use client'
import { BiExpand, BiGridSmall,BiSearchAlt } from "react-icons/bi";
import DropdownUser from "./dashboard-user";
import { Button } from "../ui/button";

const Header =  (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-md border border-stroke hover:bg-green-700 bg-green-800 p-1.5  shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
           
            <BiExpand className="block h-7 w-7 text-white" />
          </Button>
          
        </div>

        <div className="hidden sm:block">
        
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
           

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser  />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
