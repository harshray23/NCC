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
import { Checkbox } from "@/components/ui/checkbox"
import { mockCadets } from "@/lib/placeholder-data"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function MarkAttendancePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <PageHeader
        title="Mark Attendance"
        description="Select a date and mark attendance for cadets."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Weekend Parade - {date ? format(date, "MMMM d, yyyy") : ''}</CardTitle>
          <CardDescription>
            Select the checkbox for each cadet present.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                     <Checkbox
                        aria-label="Select all"
                        // Add logic for select all
                      />
                  </TableHead>
                  <TableHead>Regimental No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Dept.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCadets.map((cadet) => (
                  <TableRow key={cadet.id}>
                    <TableCell>
                      <Checkbox aria-label={`Select ${cadet.name}`} />
                    </TableCell>
                    <TableCell className="font-medium">{cadet.regimentalNumber}</TableCell>
                    <TableCell>{cadet.name}</TableCell>
                    <TableCell>{cadet.dept}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-6">
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" />
                Submit Attendance
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
