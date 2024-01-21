import Image from "next/image";
import * as React from "react";
import logo from "../../assets/svg/logo.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Customer, UserType } from "@/models";
import { Button } from "@/components/ui/button";
import { cookieData, loginUser } from "../actions";
import { cookies } from "next/headers";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const LoginPage = async () => {
  let parsedData: Pick<Customer, "username" | "userType"> | undefined;
  const loginData = await cookieData();

  if (loginData) {
    parsedData = JSON.parse(loginData) as Pick<
      Customer,
      "username" | "userType"
    >;
  }

  return (
    <div className=" min-h-[100dvh] flex ">
      <div className="blue-gradient flex-1">
        <dotlottie-player
          src="https://lottie.host/aa0b0802-8837-4039-8914-649fa43ec27f/lfhGrgAldE.json"
          background="transparent"
          speed="1"
          className="w-[300] h-[400] object-cover"
          loop
          autoplay
        ></dotlottie-player>
      </div>
      <div className="flex-1  ">
        <div className="w-[35dvw] mx-auto my-20  ">
          <Image
            src={logo}
            className=" -ml-3"
            width={100}
            height={38}
            alt="logo"
          />
          <form action={loginUser} className="mt-[12rem] max-w-[30rem]">
            <h1 className=" text-[1.7rem] font-bold">Log In</h1>
            <p className="pt-6 pb-10 text-stone-400 text-sm">
              Enter your email and select your user type to login to our
              dashboard
            </p>
            <div className="grid w-full items-center gap-1.5">
              <Label className="  text-stone-500" htmlFor="email">
                Username
              </Label>
              <Input
                className="mt-2 py-6 text-sm "
                type="string"
                placeholder="Username"
                name="username"
                defaultValue={parsedData?.username}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mt-5">
              <Label className="  text-stone-500">User Type</Label>
              <Select defaultValue={parsedData?.userType} name="userType">
                <SelectTrigger className="w-full py-6 mt-2">
                  <SelectValue placeholder="Select User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserType.Business}>Business</SelectItem>
                  <SelectItem value={UserType.Retail}>Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-12 w-full py-6">Button</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
