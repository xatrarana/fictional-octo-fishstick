'use client'
import { BiGridSmall,BiSearchAlt } from "react-icons/bi";
import DropdownUser from "./dashboard-user";

const Header =  (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-md border border-stroke bg-green-500 p-1.5  shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
           
            <BiGridSmall className="block h-7 w-7 text-white" />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <BiSearchAlt className="w-5 h-5 text-green-500" />
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 focus:outline-none xl:w-125"
              />
            </div>
          </form>
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
