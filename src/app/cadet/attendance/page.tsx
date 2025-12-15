import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockAttendance } from "@/lib/placeholder-data"

export default function CadetAttendancePage() {
  const presentCount = mockAttendance.filter(a => a.status === 'Present').length;
  const totalCount = mockAttendance.length;
  const attendancePercentage = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : 0;

  return (
    <>
      <PageHeader
        title="My Attendance"
        description="Review your attendance history for all parades and events."
      />
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>
            Overall attendance: {presentCount}/{totalCount} ({attendancePercentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttendance.map(record => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.eventName}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={record.status === 'Present' ? 'default' : 'destructive'}
                    className={record.status === 'Present' ? 'bg-green-600 text-white' : ''}>
                      {record.status}
                    </Badge>
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
