"use client";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BiChevronDown, BiLogOut, BiSolidLockAlt, BiSolidUser } from "react-icons/bi";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { ChangePasswordField } from "../user/change-password";
import UserProfile from "../user/user-profile";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const user = useCurrentUser();
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <span
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex no-underline items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name}
          </span>
          <span className="block text-xs text-green-700">{"admin"}</span>
        </span>

        <Avatar>
          <AvatarImage src="/user.png" />
          <AvatarFallback className="text-xl font-semibold">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <BiChevronDown className={`h-5 w-5 text-green-700 ${dropdown ? 'rotate-180' : 'rotate-90'}`}/>
        </span>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-7 md:right-0 mt-4 z-[100000] flex w-52 md:w-62.5 flex-col rounded-md border border-stroke bg-slate-100 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col border-b border-stroke gap-y-5 px-3 py-3 ">
          <li>
           <UserProfile/>
          </li>

          <li>
           <ChangePasswordField/>
          </li>
          <Separator/>
          <li>
           <AlertLogoutDialog/>
          </li>
        </ul>
      
      </div>
    </div>
  );
};

export default DropdownUser;


export function AlertLogoutDialog() {

  // cosnt session = useSession() from @next-auth/react
  const router = useRouter()

    const onClick = async () =>{
       
      // or we can do using the signout from @next-auth/react
        await logout()
        router.replace("/auth/login")
    }
     return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full text-muted-foreground flex gap-x-5"><BiLogOut className="w-5 h-5 text-green-700" />Logout</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>Are you sure you want to logout?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClick}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }