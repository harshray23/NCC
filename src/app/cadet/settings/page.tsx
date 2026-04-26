
"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

export default function CadetSettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (isLight: boolean) => {
    setTheme(isLight ? "light" : "dark")
  }

  const handleSaveSettings = () => {
    toast({
      title: "PREFERENCES SAVED",
      description: "Communication and interface settings updated.",
    })
  }

  if (!mounted) return null

  return (
    <div className="space-y-10">
      <PageHeader
        title="Portal Config"
        description="Manage secure communication and interface preferences."
      />
      <div className="grid gap-6 max-w-2xl">
        <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest font-headline">Notification Protocols</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest">Manage real-time communication alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-new-camp" className="text-xs font-bold uppercase tracking-tight">
                  Camp Announcements
                </Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Alerts for new registration windows.
                </p>
              </div>
              <Switch id="email-new-camp" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-reg-status" className="text-xs font-bold uppercase tracking-tight">
                  Requisition Updates
                </Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Status changes for camp applications.
                </p>
              </div>
              <Switch id="email-reg-status" defaultChecked />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em]">Save Protocols</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest font-headline">Appearance</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest">Customize the interface look and feel.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="theme-mode" className="text-xs font-bold uppercase tracking-tight">
                  Light Theme
                </Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Switch to high-visibility daylight mode.
                </p>
              </div>
              <Switch 
                id="theme-mode" 
                checked={theme === "light"}
                onCheckedChange={handleThemeChange}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em]">Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
