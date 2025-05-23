"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ArrowRightLeft,
  ChevronUp,
  LucideProps,
  User,
  User2,
  Wrench,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { deleteCookie } from "cookies-next/client";

type ItemSideBar = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type GroupSideBar = {
  title: string;
  items: ItemSideBar[];
};

// Menu items.
const groupsSideBar: GroupSideBar[] = [
  {
    title: "Ferramentas",
    items: [{ title: "Empréstimos", url: "/lends", icon: ArrowRightLeft }],
  },
  {
    title: "Gerenciamento",
    items: [
      { title: "Ferramentas", url: "/tools", icon: Wrench },
      { title: "Usuários", url: "/users", icon: User },
    ],
  },
];

export function AppSidebar() {
  const actualPath = usePathname();
  // TODO: changes this logic to an isolate place
  const router = useRouter();
  const signOut = () => {
    deleteCookie("session");
    router.push("/login");
  };
  return (
    <Sidebar>
      <SidebarHeader className="font-bold">RGIT</SidebarHeader>
      <SidebarContent>
        {groupsSideBar.map((group: GroupSideBar) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item: ItemSideBar) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={actualPath === item.url}
                    >
                      <Link key={item.title} href={item.url}>
                        <item.icon />
                        <p className="hidden md:block">{item.title}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <User2 /> Usuário
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
