import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function CadetSettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account and notification preferences."
      />
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-new-camp" className="font-medium">
                  New Camp Announcements
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when a new camp is open for registration.
                </p>
              </div>
              <Switch id="email-new-camp" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-reg-status" className="font-medium">
                  Registration Status Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get an email when your camp registration is accepted or rejected.
                </p>
              </div>
              <Switch id="email-reg-status" defaultChecked />
            </div>
            <div className="flex justify-end">
              <Button>Save Settings</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle dark mode for your portal view.
                </p>
              </div>
              <Switch id="dark-mode" />
            </div>
            <div className="flex justify-end mt-6">
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
