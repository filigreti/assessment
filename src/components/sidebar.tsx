"use client";

import { cn } from "@/lib/utils";
import { PinLeftIcon } from "@radix-ui/react-icons";
import { useAnimate, usePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/svg/logo.svg";
import logo2 from "../assets/svg/logo-2.png";

import { NAV_ITEMS } from "@/app/constants/route";

const SideBar = ({
  searchParams,
}: {
  [key: string]: string | string[] | undefined;
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const pathName = usePathname();

  const toggleSideBar = async () => {
    setToggle(!toggle);

    if (!toggle) {
      animate("#pin", { rotate: "180deg" });
      animate("span", { opacity: 0, pointerEvents: "none" });
      animate(scope.current, { width: 70 });
    } else {
      animate("#pin", { rotate: "0deg" });
      animate(scope.current, { width: 260 });
      animate("span", { opacity: 1, pointerEvents: "auto" });
    }
  };

  return (
    <div
      ref={scope}
      className=" border-r dark: min-h-[100dvh] sticky top-0  h-[100dvh] max-w-[260px] w-full   py-10 "
    >
      <div className=" flex items-center relative">
        {/* <Image
          id="logo-image"
          src={logo}
          className=" -ml-3 relative"
          width={100}
          height={38}
          alt="logo"
        />
        <Image
          id="logo-image-two"
          src={logo2}
          className=" -ml-3 relative hidden"
          width={100}
          height={38}
          alt="logo"
        /> */}
        <div
          id="nav"
          onClick={toggleSideBar}
          className="absolute right-0 bottom-[-5px] w-8 h-6  rounded-l-md text-white z-3 cursor-pointer hover:bg-gray-500 bg-gray-400 flex items-center justify-center"
        >
          {<PinLeftIcon id="pin" />}
        </div>
      </div>
      <ul className=" mt-10 flex flex-col gap-y-2 ">
        {NAV_ITEMS.map((route, index) => (
          <li key={index}>
            <Link
              id="icon-containers"
              href={route.link}
              className={cn(
                `flex items-center    py-[0.75rem] mx-4  `,
                pathName.startsWith(route.link) &&
                  "  bg-slate-100 rounded-md shadow   hover:bg-gradient-to-r from-purple-500 to-pink-500 group ",
                route.disabled && "!pointer-events-none"
              )}
            >
              <div
                id="icon"
                className=" flex items-center justify-center px-[10px] "
              >
                {React.cloneElement(route.icon as React.ReactElement, {
                  className: pathName.startsWith(route.link)
                    ? `text-black stroke-width-2 fill-current `
                    : `text-stone-400`,
                })}
              </div>
              <span
                className={cn(
                  " text-xs text-gray-400 pl-5 group-hover:text-white",
                  pathName.startsWith(route.link) && "text-gray-900"
                )}
              >
                {route.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
