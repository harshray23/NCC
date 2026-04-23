"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Users, Tent, UserCheck, Percent, Zap, Shield } from "lucide-react"
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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { mockCadets, mockCamps, mockRegistrations, mockAttendance } from "@/lib/placeholder-data"

const attendanceData = [
  { month: "MAR", percentage: 88 },
  { month: "APR", percentage: 92 },
  { month: "MAY", percentage: 90 },
  { month: "JUN", percentage: 85 },
  { month: "JUL", percentage: 95 },
  { month: "AUG", percentage: 91 },
]

const chartConfig = {
  percentage: {
    label: "ATTENDANCE RATE",
    color: "hsl(var(--primary))",
  },
}

export default function AdminDashboardPage() {
  const totalCadets = mockCadets.length;
  const activeCamps = mockCamps.length;
  const pendingRegistrations = mockRegistrations.filter(r => r.status === 'Pending').length;
  const overallAttendancePercentage = 91;

  return (
    <div className="space-y-10">
      <PageHeader
        title="COMMAND DASHBOARD"
        description="Operational overview and strategic metrics for the unit."
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-primary/10 border border-primary/20">
          <Zap className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] font-black text-primary tracking-widest uppercase">System Online</span>
        </div>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          Icon={Users} 
          title="ACTIVE PERSONNEL" 
          value={String(totalCadets)} 
          className="border-white/5 bg-black/40 backdrop-blur-sm"
        />
        <StatCard 
          Icon={Tent} 
          title="ACTIVE CAMPS" 
          value={String(activeCamps)} 
          className="border-white/5 bg-black/40 backdrop-blur-sm"
        />
        <StatCard 
          Icon={UserCheck} 
          title="PENDING REQUISITIONS" 
          value={String(pendingRegistrations)} 
          className="border-primary/20 bg-primary/5 shadow-[0_0_20px_rgba(132,189,0,0.05)]"
        />
        <StatCard 
          Icon={Percent} 
          title="FORCE READINESS" 
          value={`${overallAttendancePercentage}%`} 
          className="border-white/5 bg-black/40 backdrop-blur-sm"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
            <div className="space-y-1">
              <CardTitle className="text-lg font-black tracking-tighter uppercase font-headline">ATTENDANCE TRENDS</CardTitle>
              <CardDescription className="text-xs uppercase tracking-widest text-muted-foreground/60">Historical participation data per cycle</CardDescription>
            </div>
            <Shield className="w-5 h-5 text-primary/40" />
          </CardHeader>
          <CardContent className="pt-8">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={attendanceData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  unit="%" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                />
                <ChartTooltip content={<ChartTooltipContent className="bg-black/90 border-white/10" />} />
                <Bar 
                  dataKey="percentage" 
                  fill="var(--color-percentage)" 
                  radius={[2, 2, 0, 0]} 
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5 pb-6">
            <CardTitle className="text-lg font-black tracking-tighter uppercase font-headline">RECENT ACTIVITY</CardTitle>
            <CardDescription className="text-xs uppercase tracking-widest text-muted-foreground/60">Logs from the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(132,189,0,0.5)] group-hover:scale-125 transition-transform" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white tracking-tight uppercase">Personnel Enrollment</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Aarav Sharma registered for ATC</p>
                    <p className="text-[9px] text-primary/40 font-bold uppercase tracking-widest">14:20 HRS</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}