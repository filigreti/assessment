import { Routes } from "@/models";
import { FcHome, FcHeatMap, FcSettings } from "react-icons/fc";

export const NAV_ITEMS: Routes[] = [
  {
    name: "Overview",
    link: "/dashboard",
    icon: <FcHome />,
  },
  // {
  //   name: "Analytics",
  //   link: "/dashboard/analytics",
  //   icon: <FcHeatMap />,
  //   disabled: true,
  // },
  // {
  //   name: "Settings",
  //   link: "/dashboard/settings",
  //   icon: <FcSettings />,
  //   disabled: true,
  // },
];
