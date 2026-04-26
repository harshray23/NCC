
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreditCard, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import { useUser, useDoc } from "@/firebase"
import type { User as UserDef } from "@/lib/definitions"

export function UserNav() {
  const { user: authUser } = useUser();
  const { data: profile } = useDoc<UserDef>(authUser?.uid ? `users/${authUser.uid}` : '');

  const userRole = profile?.role || "cadet";
  const profileLink = `/${userRole}/profile`;
  const settingsLink = `/${userRole}/settings`;
  const billingLink = `/${userRole}/billing`;
  
  const displayName = profile?.displayName || "Authorized User";
  const userEmail = profile?.email || authUser?.email || "secure@ncc.gov.in";
  const avatarUrl = profile?.avatarUrl;
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-white/10 hover:border-primary/50 transition-all p-0 overflow-hidden">
          <Avatar className="h-full w-full">
            <AvatarImage src={avatarUrl} alt={displayName} className="object-cover" />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 border-white/10 backdrop-blur-xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-black text-white uppercase tracking-tighter">{displayName}</p>
            <p className="text-[10px] leading-none text-muted-foreground uppercase tracking-widest truncate">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="focus:bg-primary focus:text-primary-foreground cursor-pointer">
            <Link href={profileLink} className="flex items-center w-full">
              <User className="mr-2 h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Dossier</span>
            </Link>
          </DropdownMenuItem>
          { userRole === 'admin' &&
            <DropdownMenuItem asChild className="focus:bg-primary focus:text-primary-foreground cursor-pointer">
              <Link href={billingLink} className="flex items-center w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Requisitions</span>
              </Link>
            </DropdownMenuItem>
          }
          <DropdownMenuItem asChild className="focus:bg-primary focus:text-primary-foreground cursor-pointer">
            <Link href={settingsLink} className="flex items-center w-full">
              <Settings className="mr-2 h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Comms Config</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem asChild className="focus:bg-destructive focus:text-white cursor-pointer">
          <Link href="/landing" className="flex items-center w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
