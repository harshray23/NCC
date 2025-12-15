import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCamps, mockRegistrations } from "@/lib/placeholder-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Bell, CalendarClock } from "lucide-react"

export default function CadetDashboardPage() {
  const upcomingRegistrations = mockRegistrations.filter(r => r.cadetId === '1' && (r.status === 'Pending' || r.status === 'Accepted'));
  const recentNotifications = [
    { id: 1, text: "ATC camp registration has been accepted.", date: "2 days ago" },
    { id: 2, text: "New camp 'Basic Leadership Camp (BLC)' is now open for registration.", date: "4 days ago" },
    { id: 3, text: "Please update your contact information on the profile page.", date: "1 week ago" },
  ];

  return (
    <>
      <PageHeader
        title="Welcome, Cadet Aarav!"
        description="Here's a summary of your upcoming activities and notifications."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="grid gap-1">
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-accent" />
                Upcoming Events & Camps
              </CardTitle>
              <CardDescription>Your registered camps and their status.</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/cadet/camps">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingRegistrations.length > 0 ? upcomingRegistrations.map(reg => {
                const camp = mockCamps.find(c => c.id === reg.campId);
                return (
                  <li key={reg.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                    <div>
                      <p className="font-semibold">{reg.campName}</p>
                      <p className="text-sm text-muted-foreground">{camp?.location} | {new Date(camp?.startDate || '').toLocaleDateString()}</p>
                    </div>
                    <Badge variant={reg.status === 'Accepted' ? 'default' : reg.status === 'Pending' ? 'secondary' : 'destructive'}
                      className={reg.status === 'Accepted' ? 'bg-green-600 text-white' : ''}
                    >
                      {reg.status}
                    </Badge>
                  </li>
                );
              }) : <p className="text-muted-foreground text-sm">No upcoming registered camps.</p>}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              Recent Notifications
            </CardTitle>
            <CardDescription>Stay updated with the latest announcements.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentNotifications.map(notif => (
                <li key={notif.id} className="flex items-start gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="text-sm">{notif.text}</p>
                    <p className="text-xs text-muted-foreground">{notif.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
