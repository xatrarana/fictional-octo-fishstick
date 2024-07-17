import React from 'react'
import logo from "@/public/logo/triLogo.webp"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { aboutComponents } from '@/constant/nav-components'
import Image from 'next/image'
const NavBar = () => {
  return (
    <header className='bg-green-800 py-2 px-1'>
      <div className='max-w-7xl mx-auto'>
        <Image src={logo} alt="Logo" className='object-cover rounded-sm' width={320} height={100}/>
      </div>
     <div className='max-w-7xl mx-auto mt-2 '>
     <NavigationMenu>
        <NavigationMenuList className='flex flex-col items-start md:lg:items-center md:lg:flex-row'>
          <NavigationMenuItem className='no-underline'>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={cn("no-underline",navigationMenuTriggerStyle())}>
                मुख्य पृष्ठ
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger >हाम्रा सेवाहरु</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-1 min-w-[200px]">
                {aboutComponents.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={cn("no-underline",navigationMenuTriggerStyle())}>
                सन्देश
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={cn("no-underline",navigationMenuTriggerStyle())}>
                सुचना
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={cn("no-underline",navigationMenuTriggerStyle())}>
                ग्यालरी
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={cn("no-underline",navigationMenuTriggerStyle())}>
                सम्पर्क
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
     </div>
    </header>

  )
}
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

export default NavBar