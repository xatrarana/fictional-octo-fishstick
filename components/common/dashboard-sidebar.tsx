"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BiSolidMessage,
  BiSolidCopy,
  BiSolidLogOut,
  BiSearchAlt,
  BiMessage,
  BiSolidDashboard,
  BiChevronDown,
  BiSolidCog,
  BiImageAlt,
  BiImage,
  BiHelpCircle,
  BiInfoCircle,
  BiSolidInfoCircle,
  BiSolidBuilding,
  BiSolidFile,
  BiSolidImage,
} from "react-icons/bi";
import { signOut } from "next-auth/react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-64  flex-col overflow-y-hidden bg-gray-800 duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-3 px-3 py-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-y-5">
              <li>
                <Link
                  href="/admin/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 ${
                    pathname.includes("calender") && "bg-green-700 text-white"
                  }`}
                >
                  <BiSolidDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/about"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 ${
                    pathname.includes("about") && "bg-green-700 text-white"
                  }`}
                >
                  <BiSolidInfoCircle className="h-5 w-5" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/org"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 ${
                    pathname.includes("org") && "bg-green-700 text-white"
                  }`}
                >
                  <BiSolidBuilding className="h-5 w-5" />
                  Organization
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/banner"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 ${
                    pathname.includes("calender") && "bg-green-700 text-white"
                  }`}
                >
                  <BiImage className="h-5 w-5" />
                  Banner
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/notice"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 ${
                    pathname.includes("notice") && "bg-green-700 text-white"
                  }`}
                >
                  <BiSolidFile className="h-5 w-5" />
                  Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/gallery"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 ${
                    pathname.includes("gallery") && "bg-green-700 text-white"
                  }`}
                >
                  <BiSolidImage className="h-5 w-5" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/enquiry"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 ${
                    pathname.includes("calender") && "bg-green-700 text-white"
                  }`}
                >
                  <BiSolidMessage className="h-5 w-5" />
                  Enquiry
                </Link>
              </li>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/settings" || pathname.includes("settings")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group no-underline relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-green-800  ${
                          (pathname === "/path" ||
                            pathname.includes("forms")) &&
                          "bg-green-700 "
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BiSolidCog className="h-5 w-5 text-white" />
                        Settings
                        <BiChevronDown
                          className={`absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-2 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/admin/user"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 py-2  ${
                                pathname === "/admin/user" &&
                                "text-white bg-green-700"
                              }`}
                            >
                              User Setup
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/smtp"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 py-2  ${
                                pathname === "/admin/smtp" &&
                                "text-white bg-green-700"
                              }`}
                            >
                              SMTP Setup
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/footer"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 py-2  ${
                                pathname === "/admin/footer" &&
                                "text-white bg-green-700"
                              }`}
                            >
                              Footer setup
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/topbar"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-white no-underline duration-300 ease-in-out hover:bg-green-800 py-2  ${
                                pathname === "/admin/topbar" &&
                                "text-white bg-green-700"
                              }`}
                            >
                              Top Bar setup
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => React.ReactNode;
  activeCondition: boolean;
}

export const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};
