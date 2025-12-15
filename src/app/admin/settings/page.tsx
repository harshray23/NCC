import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader
        title="Admin Settings"
        description="Configure system-wide settings and preferences."
      />
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage general application settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="unitName">Unit Name</Label>
              <Input id="unitName" defaultValue="10 Bengal Battalion" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="collegeName">College/Institution Name</Label>
              <Input id="collegeName" defaultValue="Asansol Engineering College" />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle dark mode for the entire application.
                </p>
              </div>
              <Switch id="dark-mode" />
            </div>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-new-reg" className="font-medium">
                  New Camp Registration
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when a cadet registers for a camp.
                </p>
              </div>
              <Switch id="email-new-reg" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-weekly-summary" className="font-medium">
                  Weekly Summary
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get a weekly summary of unit activities.
                </p>
              </div>
              <Switch id="email-weekly-summary" />
            </div>
            <div className="flex justify-end">
              <Button>Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
