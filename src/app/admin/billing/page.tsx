import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function AdminBillingPage() {
  const invoices = [
    { id: 'INV-2024-001', date: '2024-08-01', amount: '$50.00', status: 'Paid' },
    { id: 'INV-2024-002', date: '2024-07-01', amount: '$50.00', status: 'Paid' },
    { id: 'INV-2024-003', date: '2024-06-01', amount: '$50.00', status: 'Paid' },
  ];

  return (
    <>
      <PageHeader
        title="Billing"
        description="Manage your subscription and view payment history."
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the <strong>Pro Plan</strong>.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-4xl font-bold">$50<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                <p className="text-muted-foreground">Billed monthly. Next payment on Sep 1, 2024.</p>
              </div>
              <Button variant="outline">Change Plan</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Download</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map(invoice => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download invoice</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <p>Visa ending in 1234</p>
                </div>
                <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                 <Button variant="outline">Update Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
