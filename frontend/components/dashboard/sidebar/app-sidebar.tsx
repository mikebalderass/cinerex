"use client";

import * as React from "react";
import {
  CalendarClock,
  LayoutDashboard,
  Film,
  Theater,
  Ticket,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Panel",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Películas",
      url: "/dashboard/movies",
      icon: Film,
    },
    {
      title: "Funciones",
      url: "/dashboard/functions",
      icon: CalendarClock,
    },
    {
      title: "Salas",
      url: "/dashboard/theaters",
      icon: Theater,
    },
    {
      title: "Boletos",
      url: "/dashboard/tickets",
      icon: Ticket,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-primary">
      <SidebarHeader className="bg-primary text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Ticket className="!size-5" />
                <span className="text-lg font-bold">CineRex</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-primary text-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-primary text-white">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
