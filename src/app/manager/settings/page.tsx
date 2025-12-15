import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function ManagerSettingsPage() {
  return (
    <>
      <PageHeader
        title="Manager Settings"
        description="Configure high-level system settings and preferences."
      />
      <div className="grid gap-6 max-w-2xl">
         <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive important notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-new-user" className="font-medium">
                  New Staff Added
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when a new Admin or Manager is added.
                </p>
              </div>
              <Switch id="email-new-user" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-audit-alerts" className="font-medium">
                  Critical Audit Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get an email for high-priority system actions.
                </p>
              </div>
              <Switch id="email-audit-alerts" defaultChecked />
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
