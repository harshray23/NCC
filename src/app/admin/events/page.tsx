
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { CreateEventDialog } from "@/components/create-event-dialog"

// Mock data, will be replaced with Firestore data
const mockEvents = [
    { id: 'event-1', name: 'Independence Day Parade', location: 'Parade Ground', date: '2024-08-15T09:00:00' },
    { id: 'event-2', name: 'Weapon Cleaning', location: 'Unit Store', date: '2024-08-18T14:00:00' },
    { id: 'event-3', name: 'Guest Lecture on Leadership', location: 'Seminar Hall', date: '2024-08-22T11:00:00' },
];


export default function ManageEventsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)

  return (
    <>
      <PageHeader
        title="Manage Events"
        description="Create and manage unit events like parades and functions."
      >
        <Button size="sm" className="gap-1" onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Create Event
        </Button>
      </PageHeader>
      <CreateEventDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            A list of all planned events for the unit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          Edit Event
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Cancel Event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
