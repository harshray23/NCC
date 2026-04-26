
"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function ManagerSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (isLight: boolean) => {
    setTheme(isLight ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <div className="space-y-10">
      <PageHeader
        title="Strategic Config"
        description="Configure high-level command protocols and interfaces."
      />
      <div className="grid gap-6 max-w-2xl">
         <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest font-headline">Security & Comms</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest">Oversight alert management.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-new-user" className="text-xs font-bold uppercase tracking-tight">
                  Staff Enrollment Alerts
                </Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Notifications for new Admin/Manager credentials.
                </p>
              </div>
              <Switch id="email-new-user" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-audit-alerts" className="text-xs font-bold uppercase tracking-tight">
                  Priority Audit Alerts
                </Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Immediate alerts for critical system actions.
                </p>
              </div>
              <Switch id="email-audit-alerts" defaultChecked />
            </div>
            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em]">Update Protocols</Button>
            </div>
          </CardContent>
        </Card>
         <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest font-headline">Interface Preferences</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest">Operational display configuration.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="theme-mode" className="text-xs font-bold uppercase tracking-tight">
                  Light Theme
                </Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Enable high-visibility daylight mode.
                </p>
              </div>
              <Switch 
                id="theme-mode" 
                checked={theme === "light"}
                onCheckedChange={handleThemeChange}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em]">Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
