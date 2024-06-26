import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";
import { Cart } from "./cart";
import { useContext } from "react";
import { GlobalContext } from "@/App";
import { ROLE } from "@/types";

export function NavBar() {

  const context = useContext(GlobalContext);
  if (!context) throw Error("context is missing")
  const { state, handleRemoveUser } = context

  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }
  return (
    <div className="bg-gray-100/80 backdrop-blur-sm text-customColor font-bold py-4 px-6 flex justify-between items-center dark:bg-gray-800/80 dark:text-gray-200 mb-3">
      <div>
      <img className="w-16 h-16" src="images/logo1.png" />
      </div>
      <NavigationMenu >
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem className="flex space-x-4">
            <Link to="/">
              <NavigationMenuLink className="hover:text-headerColor dark:hover:text-gray-400 block">
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {state.user?.role === ROLE.Admin && (
            <NavigationMenuItem className="flex">
              <Link to="/dashboard">
                <NavigationMenuLink className="hover:text-headerColor dark:hover:text-gray-400 block">
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>)}
          {!state.user && (
            <NavigationMenuItem className="flex">
              <Link to="/signup">
                <NavigationMenuLink className="hover:text-headerColor dark:hover:text-gray-400 block">
                  Signup
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
          {!state.user && (
            <NavigationMenuItem className="flex">
              <Link to="/login">
                <NavigationMenuLink className="hover:text-headerColor dark:hover:text-gray-400 block">
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
          {state.user && (

            <Link className="hover:text-headerColor" onClick={handleLogout} to={"/"}> Logout</Link>
          )}
           <NavigationMenuItem className="flex space-x-4">
            <Link to="/moreInfo">
              <NavigationMenuLink className="hover:text-headerColor dark:hover:text-gray-400 block">
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Cart />
    </div>
  )
}