
"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bell, CalendarClock, Shield } from "lucide-react"
import { useUser, useDoc, useCollection } from "@/firebase"
import type { User as UserDef, Camp, CampRegistration } from "@/lib/definitions"
import { query, where, collection } from "firebase/firestore"
import { useFirestore } from "@/firebase"
import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CadetDashboardPage() {
  const { user: authUser } = useUser();
  const firestore = useFirestore();
  
  const cadetPath = authUser?.uid ? `users/${authUser.uid}` : '';
  const { data: profile, loading: profileLoading } = useDoc<UserDef>(cadetPath);

  const { data: registrations, loading: regsLoading } = useCollection<CampRegistration>("registrations", {
    q: (ref) => query(ref, where('uid', '==', authUser?.uid || ''))
  });

  const { data: camps } = useCollection<Camp>("camps");

  const recentNotifications = [
    { id: 1, text: "ATC camp registration has been accepted.", date: "2 days ago" },
    { id: 2, text: "New camp 'Basic Leadership Camp (BLC)' is now open for registration.", date: "4 days ago" },
    { id: 3, text: "Please update your contact information on the profile page.", date: "1 week ago" },
  ];

  if (profileLoading) {
    return (
      <div className="space-y-10">
        <PageHeader title="SYNCHRONIZING..." description="Accessing personnel dashboard..." />
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-[300px] w-full bg-white/5" />
          <Skeleton className="h-[300px] w-full bg-white/5" />
        </div>
      </div>
    );
  }

  const displayName = profile?.displayName || "Cadet";

  return (
    <div className="space-y-10">
      <PageHeader
        title={`Welcome, Cadet ${displayName}!`}
        description="Operational summary and real-time status reports."
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-primary/10 border border-primary/20">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black text-primary tracking-widest uppercase">Verified Active Duty</span>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
            <div className="space-y-1">
              <CardTitle className="text-sm font-black tracking-widest uppercase font-headline flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-primary" />
                REQUISITION STATUS
              </CardTitle>
              <CardDescription className="text-[10px] uppercase tracking-widest">Active training registrations</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest hover:bg-primary/20">
              <Link href="/cadet/camps">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {regsLoading ? (
                 <p className="text-[10px] uppercase tracking-widest text-muted-foreground animate-pulse">Scanning database...</p>
              ) : registrations && registrations.length > 0 ? registrations.map(reg => {
                const camp = camps?.find(c => c.id === reg.campId);
                return (
                  <li key={reg.id} className="flex items-center justify-between p-4 rounded bg-white/5 border border-white/5 group hover:border-primary/30 transition-all">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-white uppercase tracking-tight">{camp?.name || 'Training Camp'}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest">{camp?.location || 'Base HQ'}</p>
                    </div>
                    <Badge variant={reg.status === 'accepted' ? 'default' : reg.status === 'pending' ? 'secondary' : 'destructive'}
                      className={`text-[9px] font-black uppercase tracking-[0.2em] ${reg.status === 'accepted' ? 'bg-primary text-primary-foreground' : ''}`}
                    >
                      {reg.status}
                    </Badge>
                  </li>
                );
              }) : (
                <div className="py-12 text-center opacity-30">
                  <CalendarClock className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-[10px] uppercase tracking-[0.3em]">No active requisitions</p>
                </div>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5 pb-6">
            <CardTitle className="text-sm font-black tracking-widest uppercase font-headline flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              COMMS CHANNEL
            </CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest">Priority unit announcements</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-6">
              {recentNotifications.map(notif => (
                <li key={notif.id} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 pt-1">
                    <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(132,189,0,0.5)] group-hover:scale-125 transition-transform" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-white/80 leading-relaxed uppercase tracking-tight">{notif.text}</p>
                    <p className="text-[9px] text-primary/40 font-bold uppercase tracking-widest">{notif.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
