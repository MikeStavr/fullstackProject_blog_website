import { Link, useNavigate } from "react-router-dom";
import { pageData } from "./pageData";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    <NavigationMenu className="bg-primary fixed w-screen top-0 left-0 h-20 p-2">
      <NavigationMenuList>
        {pageData.map((page) => {
          return (
            <NavigationMenuItem key={page.id}>
              <Link key={page.id} to={page.path}>
                <NavigationMenuLink
                  key={page.id}
                  className={navigationMenuTriggerStyle()}
                >
                  {page.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
        <NavigationMenuLink
          onClick={handleLogout}
          className={"ml-2 bg-red-500 " + navigationMenuTriggerStyle()}
        >
          Logout
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
