"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Users, Tent, UserCheck, Percent } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { mockCadets, mockCamps, mockRegistrations, mockAttendance } from "@/lib/placeholder-data"

const attendanceData = [
  { month: "March", percentage: 88 },
  { month: "April", percentage: 92 },
  { month: "May", percentage: 90 },
  { month: "June", percentage: 85 },
  { month: "July", percentage: 95 },
  { month: "August", percentage: 91 },
]

const chartConfig = {
  percentage: {
    label: "Attendance %",
    color: "hsl(var(--primary))",
  },
}

export default function AdminDashboardPage() {
  const totalCadets = mockCadets.length;
  const activeCamps = mockCamps.length;
  const pendingRegistrations = mockRegistrations.filter(r => r.status === 'Pending').length;

  const presentCount = mockAttendance.filter(a => a.status === 'Present').length;
  const totalAttendance = mockAttendance.length;
  const overallAttendancePercentage = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;


  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your NCC unit's key metrics."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard Icon={Users} title="Total Cadets" value={String(totalCadets)} />
        <StatCard Icon={Tent} title="Active Camps" value={String(activeCamps)} />
        <StatCard Icon={UserCheck} title="Pending Registrations" value={String(pendingRegistrations)} description="Require approval" />
        <StatCard Icon={Percent} title="Overall Attendance" value={`${overallAttendancePercentage}%`} description="For all recorded events" />
      </div>

      <div className="grid gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance percentage for all parades and events.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={attendanceData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis domain={[0, 100]} unit="%" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="percentage" fill="var(--color-percentage)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
