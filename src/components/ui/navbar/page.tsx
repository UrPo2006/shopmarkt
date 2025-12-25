"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { Loader, ShoppingCartIcon, User2Icon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FaHeart } from "react-icons/fa";
import { WishListContext } from "../Context/WishListContext";



import Switch from "../Switch/Switch";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/ui/LogoutButton/LogoutButton";
import Logo from "../SantaHat/SantaHat";
import HatUser from "../HatUser/HatUser";
export default function Navbar() {
  const session = useSession()
  console.log(session)
  const { cartData, isLoading } = useContext(CartContext);
const { wishList } = useContext(WishListContext);
  return (
    <>
      <nav className="py-4 text-2xl font-semibold   z-50 bg-gray-300/30 backdrop-blur-md shadow-md  w-full fixed top-0">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between ">
          
            <Logo/>
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col sm:flex-row text-center gap-2 sm:gap-5">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/Brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/Categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {/*  */}
            <div className="flex items-center gap-1 mt-2 ">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <HatUser/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   {session.status=='authenticated' && <> <Link href="/profile">
                    <DropdownMenuItem>
                      <h3>Profile</h3>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/allorders">
                    <DropdownMenuItem>
                      <h3>Your Orders</h3>
                    </DropdownMenuItem>
                  </Link>
                 
                 <DropdownMenuItem><LogoutButton /></DropdownMenuItem> </> }
                 {session.status=='unauthenticated' && <>
                 
                  <Link href="/login">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link href="/register">
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>
                  </>
                 }
                 

                </DropdownMenuContent>
              </DropdownMenu>

             {session.status=='authenticated' && <><div className="relative pr-3">
               <>
                <Link href="/cart">
                  {" "}
                  <ShoppingCartIcon />
                  <Badge className="absolute -top-3 left-3  dark:bg-black  text-red-50  h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                    {isLoading ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      cartData?.numOfCartItems??0
                    )}
                  </Badge>
                </Link>
               </>
              </div>



               <div className="relative pr-3">
                <>
                <Link  href={'/WishList'}>
              
                 <FaHeart className="text-red-700 cursor-pointer "/>
                  <Badge className="absolute -top-3 left-5   text-red-50 dark:bg-black   h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                    {isLoading ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                     wishList?.count ?? 0
                    )}
                   
                    {/* {  wishList?.count ?? 0} */}
                  </Badge>
                </Link>
                </>
               
              </div> 
              </> }

              <Switch/>
            
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}