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
import { MoreHorizontal, PlusCircle, Search, UserPlus, Users, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditCadetDialog } from "@/components/edit-cadet-dialog"
import type { User as Cadet, UserRole } from "@/lib/definitions"
import { useCollection, useUser, useDoc } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateCadetInput, CreateCadetInputSchema, createCadet } from "@/ai/flows/create-cadet-flow"
import { useToast } from "@/hooks/use-toast"
import { query, where, orderBy } from "firebase/firestore"

export default function ManageCadetsPage() {
  const { user: authUser } = useUser();
  const { data: profile } = useDoc<Cadet>(authUser?.uid ? `users/${authUser.uid}` : '');
  const isAdmin = profile?.role === 'admin' || profile?.role === 'manager';

  const { data: cadets, loading, error } = useCollection<Cadet>("users", {
    q: (ref) => query(ref, where('role', '==', 'cadet'), orderBy('createdAt', 'desc'))
  });

  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [editingCadet, setEditingCadet] = React.useState<Cadet | null>(null);

  const form = useForm<CreateCadetInput>({
    resolver: zodResolver(CreateCadetInputSchema),
    defaultValues: {
      displayName: "",
      regimentalNumber: "",
      year: 1,
      dept: "CSE",
      password: "",
    },
  });

  async function onSubmit(data: CreateCadetInput) {
    try {
      toast({ title: "INITIATING ENROLLMENT", description: "Securing record..." });
      await createCadet(data);
      toast({
        title: "ENROLLMENT COMPLETE",
        description: `Cadet ${data.displayName} active in database.`,
      });
      form.reset();
      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "ENROLLMENT FAILED",
        description: error.message || "Unknown protocol error.",
      });
    }
  }

  if (!isAdmin && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="p-4 rounded-full bg-destructive/10 border border-destructive/20 text-destructive mb-4">
          <Lock className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter font-headline text-white">Access Denied</h1>
        <p className="text-muted-foreground uppercase text-xs tracking-widest">Only unit staff may access the personnel roster.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="PERSONNEL ROSTER"
        description="Operational oversight of all unit active-duty cadets."
      >
        <div className="relative w-64 mr-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <Input 
            placeholder="SEARCH REGIMENTAL NO..." 
            className="pl-9 h-9 bg-white/5 border-white/10 text-[10px] font-bold tracking-widest uppercase focus:border-primary/50"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-9 gap-2 font-black uppercase tracking-widest text-[10px] bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4" />
              Enroll Cadet
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline tracking-tighter uppercase">NEW PERSONNEL ENTRY</DialogTitle>
              <DialogDescription className="text-xs uppercase tracking-widest">
                Execute secure enrollment of a new unit member.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Legal Name</FormLabel>
                      <FormControl>
                        <Input placeholder="FULL NAME" className="bg-white/5 border-white/10 h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="regimentalNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Service Identification</FormLabel>
                      <FormControl>
                        <Input placeholder="WB21SDA123456" className="bg-white/5 border-white/10 h-11" {...field} />
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
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access Credential</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="MIN 6 CHARACTERS" className="bg-white/5 border-white/10 h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Academic Cycle</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10 h-11">
                              <SelectValue placeholder="YEAR" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/90 border-white/10">
                            <SelectItem value="1">1ST YEAR</SelectItem>
                            <SelectItem value="2">2ND YEAR</SelectItem>
                            <SelectItem value="3">3RD YEAR</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dept"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Branch/Unit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10 h-11">
                              <SelectValue placeholder="DEPT" />
                            </SelectTrigger>
                           </FormControl>
                          <SelectContent className="bg-black/90 border-white/10">
                            <SelectItem value="CSE">CSE</SelectItem>
                            <SelectItem value="ECE">ECE</SelectItem>
                            <SelectItem value="ME">ME</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                 <DialogFooter className="pt-6">
                  <Button type="button" variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setIsAddDialogOpen(false)}>CANCEL</Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90 font-black tracking-[0.2em]" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "AUTHORIZING..." : "EXECUTE ENROLLMENT"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </PageHeader>
      
      {editingCadet && (
        <EditCadetDialog
          cadet={editingCadet}
          open={!!editingCadet}
          onOpenChange={(open) => !open && setEditingCadet(null)}
        />
      )}

      <Card className="border-white/5 bg-black/40 backdrop-blur-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Personnel ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Designation</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Rank</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Service Cycle</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Branch</TableHead>
                <TableHead className="text-right py-5 pr-6"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(loading || !isAdmin) && Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-white/5">
                  <TableCell><Skeleton className="h-4 w-[150px] bg-white/5" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[120px] bg-white/5" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[50px] rounded-full bg-white/5" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[70px] rounded-full bg-white/5" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[40px] bg-white/5" /></TableCell>
                  <TableCell className="text-right pr-6"><Skeleton className="h-8 w-8 bg-white/5 ml-auto" /></TableCell>
                </TableRow>
              ))}
              {!loading && isAdmin && cadets?.map((cadet) => (
                <TableRow key={cadet.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="font-mono text-xs text-primary/80 py-6">{cadet.regimentalNumber}</TableCell>
                  <TableCell className="text-sm font-bold text-white uppercase tracking-tight">{cadet.displayName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary">
                      {cadet.rank || 'CDT'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-white/10 text-muted-foreground/60">
                      Phase {cadet.year}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-white/40">{cadet.dept}</TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Operations</DropdownMenuLabel>
                        <DropdownMenuItem className="text-xs uppercase tracking-widest focus:bg-primary focus:text-primary-foreground" onClick={() => setEditingCadet(cadet)}>Modify File</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs uppercase tracking-widest focus:bg-primary focus:text-primary-foreground">Full Dossier</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem className="text-xs uppercase tracking-widest text-destructive focus:bg-destructive focus:text-white">
                          Discharge
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
               {!loading && isAdmin && cadets?.length === 0 && (
                <TableRow className="border-none">
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <Users className="w-12 h-12 mb-2" />
                      <p className="text-xs font-black uppercase tracking-[0.3em]">No personnel recorded</p>
                      <p className="text-[10px] uppercase tracking-widest">Execute enrollment to begin tracking</p>
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