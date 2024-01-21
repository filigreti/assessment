"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "./ui/button";

import React from "react";

const TopHeader = ({ data }: any) => {
  return (
    <div className=" w-full  flex justify-between items-center  ">
      <div className="flex items-center  w-[65%] ">
        <Icon
          icon="healthicons:magnifying-glass"
          className=" absolute w-5 h-5 mt-[3px] text-gray-400 ml-4 "
        />
        <input
          autoComplete="off"
          id="name"
          placeholder="Search..."
          className=" h-12 w-full pl-12 shadow-sm border  rounded-sm bg-transparent top-nav-input outline-none  !focus:ring-0  text-[0.85rem]   dark:placeholder:text-gray-500  font-sans font-medium "
        />
      </div>
      <div className="md:flex justify-between hidden 2xl:col-span-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center">
              <Avatar className=" text-white card-shadow  ">
                <AvatarImage src="https://picsum.photos/200/300" />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
              <p className=" text-xs font-bold text-stone-600 ml-2   capitalize">
                {data?.username}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56  mr-4 card-shadow">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className=" hover:">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=" hover:">
              <Link href="/login">
                Logout
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopHeader;
