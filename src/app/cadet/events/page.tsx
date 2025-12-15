
"use client"
import * as React from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Info, MapPin } from "lucide-react"

// Mock data, will be replaced with Firestore data
const mockEvents = [
    { id: 'event-1', name: 'Independence Day Parade', location: 'Parade Ground', date: '2024-08-15T09:00:00', description: 'Annual parade for Independence Day.' },
    { id: 'event-2', name: 'Weapon Cleaning', location: 'Unit Store', date: '2024-08-18T14:00:00', description: 'Allotment and cleaning of weapons.' },
    { id: 'event-3', name: 'Guest Lecture on Leadership', location: 'Seminar Hall', date: '2024-08-22T11:00:00', description: 'A lecture by a senior officer.' },
];

const mockMyRegistrations = [
    { eventId: 'event-1', status: 'attended' },
    { eventId: 'event-4', status: 'registered' } // A past/hypothetical event
];

export default function CadetEventsPage() {
    const getRegistrationStatus = (eventId: string) => {
        const registration = mockMyRegistrations.find(r => r.eventId === eventId);
        if (!registration) return null;
        return registration.status;
    };

  return (
    <>
      <PageHeader
        title="Unit Events"
        description="Browse and register for events, and track your participation."
      />
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="my-registrations">My Registrations</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Register for events you wish to participate in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockEvents.filter(e => new Date(e.date) > new Date()).map((event) => {
                const status = getRegistrationStatus(event.id);
                return (
                  <Card key={event.id}>
                    <CardHeader>
                        <CardTitle>{event.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 pt-1">
                            <MapPin className="h-4 w-4" /> {event.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="text-sm text-muted-foreground flex items-center gap-2">
                           <Calendar className="h-4 w-4" /> 
                           {new Date(event.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                           <Info className="h-4 w-4" /> 
                           {event.description}
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                         {status ? (
                            <Badge variant={status === 'attended' ? 'default' : 'secondary'}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Badge>
                        ) : (
                            <Button>Register</Button>
                        )}
                    </div>
                  </Card>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-registrations">
          <Card>
            <CardHeader>
              <CardTitle>My Registrations</CardTitle>
              <CardDescription>
                A log of all events you have registered for.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockEvents.filter(e => getRegistrationStatus(e.id)).map((event) => {
                 const status = getRegistrationStatus(event.id);
                 return (
                    <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                        <div>
                            <p className="font-semibold">{event.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleDateString([], { dateStyle: 'long' })}
                            </p>
                        </div>
                        <Badge variant={status === 'attended' ? 'default' : 'secondary'}
                           className={status === 'attended' ? 'bg-green-600 text-white' : ''}
                        >
                             {status?.charAt(0).toUpperCase() + status!.slice(1)}
                        </Badge>
                    </div>
                 )
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
