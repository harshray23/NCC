"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Users, Tent, Activity } from "lucide-react"
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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { mockCadets, mockCamps, mockActivityLogs } from "@/lib/placeholder-data"

const chartData = [
  { month: "January", cadets: 186 },
  { month: "February", cadets: 305 },
  { month: "March", cadets: 237 },
  { month: "April", cadets: 273 },
  { month: "May", cadets: 209 },
  { month: "June", cadets: 214 },
]

const chartConfig = {
  cadets: {
    label: "Active Cadets",
    color: "hsl(var(--accent))",
  },
}

export default function ManagerDashboardPage() {
  const totalCadets = mockCadets.length;
  const totalCamps = mockCamps.length;
  const totalActivities = mockActivityLogs.length;

  return (
    <>
      <PageHeader
        title="Manager Dashboard"
        description="High-level analytics and insights for the NCC unit."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard Icon={Users} title="Total Cadets" value={String(totalCadets)} />
        <StatCard Icon={Tent} title="Total Camps This Year" value={String(totalCamps)} />
        <StatCard Icon={Activity} title="Activities Logged (24h)" value={String(totalActivities)} />
      </div>

      <div className="grid gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Cadet Activity Trends</CardTitle>
            <CardDescription>Monthly active cadets over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillCadets" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-cadets)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-cadets)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                 <Area
                  dataKey="cadets"
                  type="natural"
                  fill="url(#fillCadets)"
                  stroke="var(--color-cadets)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
