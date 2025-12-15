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
import { mockCamps, mockRegistrations } from "@/lib/placeholder-data"
import { Badge } from "@/components/ui/badge"
import { CreateCampDialog } from "@/components/create-camp-dialog"
import { EditCampDialog } from "@/components/edit-camp-dialog"
import Link from "next/link"
import type { Camp } from "@/lib/definitions"

export default function ManageCampsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [editingCamp, setEditingCamp] = React.useState<Camp | null>(null)

  const getPendingRegistrationsCount = (campId: string) => {
    return mockRegistrations.filter(r => r.campId === campId && r.status === 'Pending').length
  }

  return (
    <>
      <PageHeader
        title="Manage Camps"
        description="Create, update, and manage all training camps."
      >
        <Button size="sm" className="gap-1" onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Create Camp
        </Button>
      </PageHeader>
      <CreateCampDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
      {editingCamp && (
        <EditCampDialog 
          camp={editingCamp}
          open={!!editingCamp}
          onOpenChange={(open) => !open && setEditingCamp(null)}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>Camp Schedule</CardTitle>
          <CardDescription>
            A list of all planned and ongoing camps for the unit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Camp Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCamps.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell className="font-medium">{camp.name}</TableCell>
                  <TableCell>{camp.location}</TableCell>
                  <TableCell>{new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="w-16">{camp.registrations} / {camp.capacity}</span>
                      {getPendingRegistrationsCount(camp.id) > 0 && (
                        <Badge variant="default">
                          {getPendingRegistrationsCount(camp.id)} Pending
                        </Badge>
                      )}
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/camps/${camp.id}/registrations`}>Manage Registrations</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingCamp(camp)}>
                          Edit Camp
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Cancel Camp
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
