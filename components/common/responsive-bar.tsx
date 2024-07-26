"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { BiMenu } from "react-icons/bi";
import { Category } from "@prisma/client";

type Group = {
  
    id: string;
    name: string;
    slug: string;
    status: boolean;
    displayOrder: number | null;
    createdAt: Date;
    updatedAt: Date;
}

type ResponsiveBarProps = {
  groups: Group[];
  categories: Category[];
}
const ResponsiveBar = ({groups,categories}:ResponsiveBarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleOnClick} variant={"ghost"} className="lg:hidden">
        <BiMenu className="w-6 h-6 text-green-700 font-bold flex items-center " />
      </Button>
      <NavigationMenu
        className={`${
          isOpen
            ? " block transition-all delay-75 absolute top-16 bg-white shadow-md mx-auto right-0 w-full max-w-3xl rounded-md z-50"
            : "hidden transition-all delay-75 lg:inline-block"
        }`}
      >
        <NavigationMenuList className="flex flex-col gap-y-4 mt-2 mt:lg:mt-0 items-start md:lg:items-center md:lg:flex-row">
          <NavigationMenuItem className="no-underline ">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "no-underline text-slate-800",
                  navigationMenuTriggerStyle()
                )}
              >
                मुख्य पृष्ठ
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {/* <NavigationMenuTrigger>हाम्रा सेवाहरु</NavigationMenuTrigger> */}
            <NavigationMenuTrigger>हाम्रो बारेमा</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-1 min-w-[200px]">
                <ListItem title="हाम्रो परिचय" href="/about"></ListItem>
                {groups.map((group) => (
                  <ListItem
                    key={group.id}
                    title={group.name}
                    href={`/team-types/${group.id}`}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>हाम्रा सेवाहरु</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-1 min-w-[300px]">
                <ListItem title="हाम्रो परिचय" href="/about"></ListItem>
                <ListItem title="Message from Chairman" href="/message/chairman"></ListItem>
                {categories.map((category) => (
                  <ListItem
                    key={category.id}
                    title={category.name}
                    href={`/schemes/${category.id}`}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn("no-underline", navigationMenuTriggerStyle())}
              >
                सुचना
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn("no-underline", navigationMenuTriggerStyle())}
              >
                ग्यालरी
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn("no-underline", navigationMenuTriggerStyle())}
              >
                सम्पर्क
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none  no-underline outline-none transition-colors hover:bg-accent hover:text-green-700 focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm  font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default ResponsiveBar;
