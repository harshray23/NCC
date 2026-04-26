import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Tent, CalendarCheck, LogOut, User, CalendarPlus } from "lucide-react"
import { Logo } from "@/components/logo"
import { PortalHeader } from "@/components/portal-header"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background military-grid">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-border">
            <Logo imageSrc="/emblem.jpg" className="scale-125" />
          </SidebarHeader>
          <SidebarContent className="px-4 py-6">
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" className="h-11">
                  <Link href="/admin">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Command Center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage Cadets" className="h-11">
                  <Link href="/admin/cadets">
                    <Users className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Personnel Roster</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage Camps" className="h-11">
                  <Link href="/admin/camps">
                    <Tent className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Training Camps</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Manage Events" className="h-11">
                  <Link href="/admin/events">
                    <CalendarPlus className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Unit Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Mark Attendance" className="h-11">
                  <Link href="/admin/attendance">
                    <CalendarCheck className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-border">
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile" className="h-11 opacity-70 hover:opacity-100">
                  <Link href="/admin/profile">
                    <User className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Staff Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Log Out" className="h-11 text-destructive hover:bg-destructive/10">
                  <Link href="/landing">
                    <LogOut className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Terminate Session</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-transparent">
          <PortalHeader />
          <main className="flex-1 p-6 sm:p-8 lg:p-10">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
