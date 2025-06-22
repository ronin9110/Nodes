"use client";

import { sidebarLinks } from "@/constants/index.js";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function LeftSidebar() {
  const pathName = usePathname();
  const {userId}= useAuth()

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((i) => {

          const isActive =
            (pathName.includes(i.route) && i.route.length > 1) ||
            pathName == i.route;

          return (
            <Link
              href={i.route == "/profile" ? `${i.route}/${userId}` : i.route}
              key={i.label}
              className={`leftsidebar_link ${isActive ? "bg-white   " : ""}`}
            >
              <Image
                src={i.imgURL}
                alt={i.label}
                width={24}
                height={24}
                className={` ${isActive ? "invert " : ""}`}
              />
              <p
                className={` max-lg:hidden ${
                  isActive ? "text-black text-body-semibold" : "text-light-1 "
                }`}
              >
                {i.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6 ">
        <SignedIn>
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex cursor-pointer gap-4 px-4 ">
              <Image
                src={"/assets/logout.svg"}
                alt="Logout"
                width={25}
                height={25}
              />
              <p className={`text-light-1 max-lg:hidden `}>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}
