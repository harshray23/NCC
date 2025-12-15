import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ManagerBillingPage() {
  const invoices = [
    { id: 'INV-2024-001', date: '2024-08-01', amount: '$50.00', status: 'Paid' },
    { id: 'INV-2024-002', date: '2024-07-01', amount: '$50.00', status: 'Paid' },
    { id: 'INV-2024-003', date: '2024-06-01', amount: '$50.00', status: 'Paid' },
  ];

  return (
    <>
      <PageHeader
        title="Billing Overview"
        description="Review subscription details and payment history for the organization."
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>Organization Plan</CardTitle>
              <CardDescription>The organization is currently on the <strong>Pro Plan</strong>.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">$50<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                <p className="text-muted-foreground">Next payment on Sep 1, 2024.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Invoices for the entire organization.</CardDescription>
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
                <p>Visa ending in 1234</p>
                <p className="text-sm text-muted-foreground">Expires 12/2026</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
