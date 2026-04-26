"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { MoreHorizontal, PlusCircle, UserCog, ShieldAlert, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCollection, useUser, useFirestore } from "@/firebase"
import type { User as StaffMember } from "@/lib/definitions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CreateStaffInput, CreateStaffInputSchema, createStaff } from "@/ai/flows/create-staff-flow"
import { useToast } from "@/hooks/use-toast"
import { query, where, doc, deleteDoc } from "firebase/firestore"
import { Skeleton } from "@/components/ui/skeleton"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function ManageStaffPage() {
  const { user: authUser } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  // Fetch all staff members (Admin/Manager roles)
  const { data: staff, loading } = useCollection<StaffMember>("users", {
    q: (ref) => query(ref, where('role', 'in', ['admin', 'manager']))
  });

  const form = useForm<CreateStaffInput>({
    resolver: zodResolver(CreateStaffInputSchema),
    defaultValues: {
      displayName: "",
      email: "",
      role: "admin",
      password: "",
    },
  });

  async function onSubmit(data: CreateStaffInput) {
    try {
      toast({ title: "AUTHORIZING CREDENTIALS", description: "Executing secure enrollment..." });
      await createStaff(data);
      toast({
        title: "ENROLLMENT SUCCESSFUL",
        description: `${data.displayName} has been granted ${data.role} access.`,
      });
      form.reset();
      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "AUTHORIZATION FAILED",
        description: error.message || "Credential synchronization protocol error.",
      });
    }
  }

  const handleDeleteStaff = (staffId: string, name: string) => {
    if (!firestore || staffId === authUser?.uid) return;

    const staffRef = doc(firestore, 'users', staffId);
    deleteDoc(staffRef)
      .then(() => {
        toast({
          title: "DISCHARGE COMPLETE",
          description: `Access credentials for ${name} have been revoked.`,
        });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: staffRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="MANAGE STAFF"
        description="Add or remove command-level administrative users."
      >
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-9 gap-2 font-black uppercase tracking-widest text-[10px] bg-primary hover:bg-primary/90">
              <PlusCircle className="h-4 w-4" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background/95 border-white/10 backdrop-blur-xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline tracking-tighter uppercase">AUTHORIZE NEW STAFF</DialogTitle>
              <DialogDescription className="text-xs uppercase tracking-widest">
                Create new command credentials for unit staff.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Staff Name</FormLabel>
                      <FormControl>
                        <Input placeholder="FULL LEGAL NAME" className="bg-white/5 border-white/10 h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Official Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="staff@ncc.gov.in" className="bg-white/5 border-white/10 h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Security Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="MIN 6 CHARACTERS" className="bg-white/5 border-white/10 h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Command Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 h-11">
                            <SelectValue placeholder="SELECT ROLE" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background/95 border-white/10">
                          <SelectItem value="admin">ADMIN (STAFF OFFICER)</SelectItem>
                          <SelectItem value="manager">MANAGER (COMMANDING OFFICER)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-6">
                  <Button type="button" variant="outline" className="border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest" onClick={() => setIsAddDialogOpen(false)}>CANCEL</Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90 font-black tracking-[0.2em] text-[10px] h-11" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "AUTHORIZING..." : "EXECUTE ENROLLMENT"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Card className="border-white/5 bg-card/40 backdrop-blur-md">
        <CardHeader className="border-b border-white/5 pb-6">
          <CardTitle className="text-sm font-black uppercase tracking-widest font-headline">Staff Roster</CardTitle>
          <CardDescription className="text-[10px] uppercase tracking-widest">
            Listing of all users with strategic access to unit operations.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5 pl-6">Personnel Name</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Access Email</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Command Role</TableHead>
                <TableHead className="text-right py-5 pr-6"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="border-white/5">
                    <TableCell className="pl-6"><Skeleton className="h-4 w-[150px] bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[200px] bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-[80px] rounded-full bg-white/5" /></TableCell>
                    <TableCell className="text-right pr-6"><Skeleton className="h-8 w-8 bg-white/5 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : staff?.map((member) => (
                <TableRow key={member.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="text-sm font-bold text-foreground uppercase tracking-tight py-6 pl-6">
                    {member.displayName} {member.id === authUser?.uid && <span className="ml-2 text-[8px] font-black text-primary border border-primary/30 px-1 rounded">YOU</span>}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {member.email}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={member.role === 'manager' ? 'default' : 'outline'} 
                      className={`text-[9px] font-black uppercase tracking-widest ${member.role === 'manager' ? 'bg-primary text-primary-foreground' : 'border-white/10'}`}
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background/95 border-white/10 backdrop-blur-xl">
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Management</DropdownMenuLabel>
                        <DropdownMenuItem className="text-xs uppercase tracking-widest focus:bg-primary focus:text-primary-foreground">Permissions</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem 
                          className="text-xs uppercase tracking-widest text-destructive focus:bg-destructive focus:text-white"
                          disabled={member.id === authUser?.uid}
                          onClick={() => handleDeleteStaff(member.id, member.displayName)}
                        >
                          Discharge
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && staff?.length === 0 && (
                <TableRow className="border-none">
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <UserCog className="w-12 h-12 mb-2" />
                      <p className="text-xs font-black uppercase tracking-[0.3em]">No staff records found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
