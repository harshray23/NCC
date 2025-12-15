import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockCamps, mockRegistrations } from "@/lib/placeholder-data"
import { Calendar, Users, MapPin } from "lucide-react"

export default function CadetCampsPage() {
  const cadetId = '1';
  const cadetRegistrations = mockRegistrations.filter(r => r.cadetId === cadetId);

  return (
    <>
      <PageHeader
        title="Training Camps"
        description="Browse and register for upcoming camps."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCamps.map(camp => {
          const registration = cadetRegistrations.find(r => r.campId === camp.id);
          const isFull = camp.registrations >= camp.capacity;

          return (
            <Card key={camp.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{camp.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                  <MapPin className="h-4 w-4" /> {camp.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground">{camp.description}</p>
                <div className="text-sm space-y-2">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    {camp.registrations} / {camp.capacity} cadets registered
                  </p>
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                {registration ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Your Status:</span>
                    <Badge variant={registration.status === 'Accepted' ? 'default' : registration.status === 'Pending' ? 'secondary' : 'destructive'}
                    className={registration.status === 'Accepted' ? 'bg-green-600 text-white' : ''}>
                      {registration.status}
                    </Badge>
                  </div>
                ) : (
                  <Button className="w-full" disabled={isFull}>
                    {isFull ? 'Camp Full' : 'Register Now'}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  )
}
