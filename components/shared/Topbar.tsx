import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { Organization } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
  return (
    <nav className="topbar ">
      <Link href={"/"} className="flex items-center gap-4">
        <Image src={"/assets/logo.svg"} className="invert" alt="Logo" width={40} height={40}/>
        <p className="text-heading3-bold text-light-1 max-xs:hidden" >Nodes</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer4">
                <Image src={"/assets/logout.svg"} alt="Logout" width={24} height={24}/>
              </div>
            </SignOutButton>
          </SignedIn>


        </div>

        <OrganizationSwitcher
        appearance={{
          baseTheme:dark,
           elements:{
            organizationSwitcherTrigger:"py-2 px-4"
           }
        }}
        />
      </div>
    </nav>
  );
}
