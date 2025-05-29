"use client";

import { sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Bottombar() {
  const router = useRouter();
  const pathName = usePathname();
  const { userId } = useAuth();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((i) => {
          const isActive =
            (pathName.includes(i.route) && i.route.length > 1) ||
            pathName === i.route 

          

          return (
            <Link
              href={i.route == "/profile" ? `${i.route}/${userId}` : i.route}
              key={i.label}
              className={`bottombar_link ${isActive ? "bg-white   " : ""}`}
            >
              <Image
                src={i.imgURL}
                alt={i.label}
                width={24}
                height={24}
                className={` ${isActive ? "invert" : ""}`}
              />
              <p
                className={`text-subtle-medium max-sm:hidden ${
                  isActive ? "text-black" : "text-light-1"
                }`}
              >
                {i.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
