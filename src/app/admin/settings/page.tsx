
"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
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
        title="System Config"
        description="Configure command-wide settings and protocols."
      />
      <div className="grid gap-6 max-w-2xl">
        <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest font-headline">General Settings</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest">Operational unit identification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="unitName" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Unit Designation</Label>
              <Input id="unitName" defaultValue="10 Bengal Battalion" className="bg-white/5 border-white/10" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="collegeName" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Base Institution</Label>
              <Input id="collegeName" defaultValue="Asansol Engineering College" className="bg-white/5 border-white/10" />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="theme-mode" className="text-xs font-bold uppercase tracking-tight">
                  Light Theme
                </Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Switch to daylight visibility mode.
                </p>
              </div>
              <Switch 
                id="theme-mode" 
                checked={theme === "light"}
                onCheckedChange={handleThemeChange}
              />
            </div>
            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em]">Update Configuration</Button>
            </div>
          </CardContent>
        </Card>
         <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest font-headline">Notification Alerts</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest">Staff communication preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-new-reg" className="text-xs font-bold uppercase tracking-tight">
                  New Requisitions
                </Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Alerts for new camp applications.
                </p>
              </div>
              <Switch id="email-new-reg" defaultChecked />
            </div>
            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em]">Save Alerts</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
