"use client"
import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
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
import { Badge } from "@/components/ui/badge"
import { mockCamps, mockRegistrations, mockCadets } from "@/lib/placeholder-data"
import { ArrowLeft, Check, X } from "lucide-react"
import type { CampRegistration, RegistrationStatus } from "@/lib/definitions"

const statusVariant: Record<RegistrationStatus, "default" | "secondary" | "destructive"> = {
  Accepted: 'default',
  Pending: 'secondary',
  Rejected: 'destructive'
}

const statusBg: Record<RegistrationStatus, string> = {
  Accepted: 'bg-green-600 text-white',
  Pending: '',
  Rejected: ''
}

export default function ManageRegistrationsPage() {
  const params = useParams();
  const campId = params.id as string;
  const camp = mockCamps.find(c => c.id === campId);
  const registrations = mockRegistrations.filter(r => r.campId === campId);

  if (!camp) {
    return (
      <PageHeader title="Camp not found">
        <Button variant="outline" asChild>
            <Link href="/admin/camps"><ArrowLeft className="mr-2" /> Back to Camps</Link>
        </Button>
      </PageHeader>
    )
  }

  return (
    <>
      <PageHeader
        title={`Registrations for ${camp.name}`}
        description="Approve or reject cadet applications for this camp."
      >
        <Button variant="outline" asChild>
          <Link href="/admin/camps"><ArrowLeft className="mr-2" /> Back to Camps</Link>
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Application List</CardTitle>
          <CardDescription>
            {registrations.length} cadets have applied for this camp. Capacity is {camp.capacity}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cadet Name</TableHead>
                <TableHead>Regimental No.</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => {
                const cadet = mockCadets.find(c => c.id === reg.cadetId);
                return (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.cadetName}</TableCell>
                    <TableCell>{cadet?.regimentalNumber}</TableCell>
                    <TableCell>{new Date(reg.registeredAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[reg.status]} className={statusBg[reg.status]}>
                        {reg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {reg.status === 'Pending' && (
                        <div className="flex gap-2 justify-end">
                          <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-700">
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Accept</span>
                          </Button>
                          <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
