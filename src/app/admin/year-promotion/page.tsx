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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function YearPromotionPage() {
  const [fromYear, setFromYear] = React.useState<string>("1");
  const [toYear, setToYear] = React.useState<string>("2");
  
  const cadetsToPromote = mockCadets.filter(c => c.year === parseInt(fromYear));

  return (
    <>
      <PageHeader
        title="Year Promotion"
        description="Promote cadets from one academic year to the next."
      />
      <Card>
        <CardHeader>
          <CardTitle>Promote Cadets</CardTitle>
          <CardDescription>
            Select the year to promote from and to, then select the cadets to promote.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-8 items-end">
            <div className="grid gap-2">
              <label>Promote From</label>
              <Select value={fromYear} onValueChange={setFromYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label>Promote To</label>
              <Select value={toYear} onValueChange={setToYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Promote Selected ({/* Add count here */})
            </Button>
          </div>
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
                  <TableHead>Rank</TableHead>
                  <TableHead>Current Year</TableHead>
                  <TableHead>Dept.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cadetsToPromote.length > 0 ? cadetsToPromote.map((cadet) => (
                  <TableRow key={cadet.id}>
                    <TableCell>
                      <Checkbox aria-label={`Select ${cadet.name}`} />
                    </TableCell>
                    <TableCell className="font-medium">{cadet.regimentalNumber}</TableCell>
                    <TableCell>{cadet.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{cadet.rank}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{cadet.year} Year</Badge>
                    </TableCell>
                    <TableCell>{cadet.dept}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No cadets in the selected year.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
