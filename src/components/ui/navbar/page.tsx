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
    <nav className="py-4 text-2xl font-semibold z-50 bg-gray-300/30 backdrop-blur-md shadow-md w-full fixed top-0">
  <div className="container mx-auto">
    <div className="flex items-center justify-between">

  
      <Logo />

     
      <div className="relative hidden md:flex items-center gap-6">

       
<div
  className="
    flex
    justify-center
    items-between
    
    absolute
    end-90
    w-200
    gap-6
  "
>
         <NavigationMenu >
          <NavigationMenuList  className="
    flex
    items-center
    justify-center
    gap-10
    font-semibold
  ">
            <NavigationMenuItem>
              <NavigationMenuLink asChild >
                <Link href="/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild >
                <Link href="/Brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild >
                <Link href="/Categories">Categories</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
       </div>

       
        <div className="flex items-center gap-3">

    
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HatUser />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {session.status === "authenticated" ? (
                <>
                  <Link href="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href="/allorders">
                    <DropdownMenuItem>Your Orders</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link href="/register">
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          {session.status === "authenticated" && (
            <>
              <div className="relative">
                <Link href="/cart">
                  <ShoppingCartIcon />
                  <Badge className="absolute -top-3 left-3">
                    {isLoading ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      cartData?.numOfCartItems ?? 0
                    )}
                  </Badge>
                </Link>
              </div>

              <div className="relative">
                <Link href="/WishList">
                  <FaHeart className="text-red-700" />
                  <Badge className="absolute -top-3 left-4">
                    {wishList?.count ?? 0}
                  </Badge>
                </Link>
              </div>
            </>
          )}

        
          <Switch />
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      <div className="flex md:hidden items-center gap-3">

        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-2 rounded-lg bg-black/40">
            ☰
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">

            {/* Navigation */}
            <Link href="/products">
              <DropdownMenuItem>Products</DropdownMenuItem>
            </Link>
            <Link href="/Brands">
              <DropdownMenuItem>Brands</DropdownMenuItem>
            </Link>
            <Link href="/Categories">
              <DropdownMenuItem>Categories</DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />

            {/* Auth */}
            {session.status === "authenticated" ? (
              <>
                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/allorders">
                  <DropdownMenuItem>Your Orders</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <Link href="/login">
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
                <Link href="/register">
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </Link>
              </>
            )}

            {session.status === "authenticated" && (
              <>
                <DropdownMenuSeparator />

                <Link href="/cart">
                  <DropdownMenuItem className="flex justify-between">
                    Cart
                    <Badge>{cartData?.numOfCartItems ?? 0}</Badge>
                  </DropdownMenuItem>
                </Link>

                <Link href="/WishList">
                  <DropdownMenuItem className="flex justify-between">
                    Wishlist
                    <Badge>{wishList?.count ?? 0}</Badge>
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Switch */}
        <Switch />
      </div>

    </div>
  </div>
</nav>

      
    </>
  );
}
  // <nav className="py-4 text-2xl font-semibold   z-50 bg-gray-300/30 backdrop-blur-md shadow-md  w-full fixed top-0">
  //       <div className="container mx-auto">
  //         <div className="flex flex-col sm:flex-row items-center justify-between ">
          
  //           <Logo/>
  //           <NavigationMenu>
  //             <NavigationMenuList className="flex flex-col sm:flex-row text-center gap-2 sm:gap-5">
  //               <NavigationMenuItem>
  //                 <NavigationMenuLink asChild>
  //                   <Link href="/products">products</Link>
  //                 </NavigationMenuLink>
  //               </NavigationMenuItem>
  //               <NavigationMenuItem>
  //                 <NavigationMenuLink asChild>
  //                   <Link href="/Brands">Brands</Link>
  //                 </NavigationMenuLink>
  //               </NavigationMenuItem>
  //               <NavigationMenuItem>
  //                 <NavigationMenuLink asChild>
  //                   <Link href="/Categories">Categories</Link>
  //                 </NavigationMenuLink>
  //               </NavigationMenuItem>
  //             </NavigationMenuList>
  //           </NavigationMenu>
  //           {/*  */}
  //           <div className="flex items-center gap-1 mt-2 ">
  //             <DropdownMenu>
  //               <DropdownMenuTrigger>
  //                 <HatUser/>
  //               </DropdownMenuTrigger>
  //               <DropdownMenuContent>
  //                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
  //                 <DropdownMenuSeparator />
  //                  {session.status=='authenticated' && <> <Link href="/profile">
  //                   <DropdownMenuItem>
  //                     <h3>Profile</h3>
  //                   </DropdownMenuItem>
  //                 </Link>
  //                 <Link href="/allorders">
  //                   <DropdownMenuItem>
  //                     <h3>Your Orders</h3>
  //                   </DropdownMenuItem>
  //                 </Link>
                 
  //                <DropdownMenuItem><LogoutButton /></DropdownMenuItem> </> }
  //                {session.status=='unauthenticated' && <>
                 
  //                 <Link href="/login">
  //                   <DropdownMenuItem>Login</DropdownMenuItem>
  //                 </Link>
  //                 <Link href="/register">
  //                   <DropdownMenuItem>Register</DropdownMenuItem>
  //                 </Link>
  //                 </>
  //                }
                 

  //               </DropdownMenuContent>
  //             </DropdownMenu>

  //            {session.status=='authenticated' && <><div className="relative pr-3">
  //              <>
  //               <Link href="/cart">
  //                 {" "}
  //                 <ShoppingCartIcon />
  //                 <Badge className="absolute -top-3 left-3  dark:bg-black  text-red-50  h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
  //                   {isLoading ? (
  //                     <Loader className="animate-spin h-4 w-4" />
  //                   ) : (
  //                     cartData?.numOfCartItems??0
  //                   )}
  //                 </Badge>
  //               </Link>
  //              </>
  //             </div>



  //              <div className="relative pr-3">
  //               <>
  //               <Link  href={'/WishList'}>
              
  //                <FaHeart className="text-red-700 cursor-pointer "/>
  //                 <Badge className="absolute -top-3 left-5   text-red-50 dark:bg-black   h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
  //                   {isLoading ? (
  //                     <Loader className="animate-spin h-4 w-4" />
  //                   ) : (
  //                    wishList?.count ?? 0
  //                   )}
                   
  //                   {/* {  wishList?.count ?? 0} */}
  //                 </Badge>
  //               </Link>
  //               </>
               
  //             </div> 
  //             </> }

  //             <Switch/>
            
  //           </div>
  //         </div>
  //       </div>
  //     </nav>