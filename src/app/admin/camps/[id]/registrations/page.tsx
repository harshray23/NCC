"use client"
import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
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
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, X, Loader2, Users } from "lucide-react"
import type { Camp, CampRegistration, RegistrationStatus, User as Cadet } from "@/lib/definitions"
import { useDoc, useCollection, useUser, useFirestore } from "@/firebase"
import { query, where, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'
import { Skeleton } from "@/components/ui/skeleton"

const statusVariant: Record<RegistrationStatus, "default" | "secondary" | "destructive"> = {
  accepted: 'default',
  pending: 'secondary',
  rejected: 'destructive'
}

export default function ManageRegistrationsPage() {
  const params = useParams();
  const campId = params.id as string;
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user: authUser } = useUser();

  const { data: camp, loading: campLoading } = useDoc<Camp>(`camps/${campId}`);
  
  const { data: registrations, loading: regsLoading } = useCollection<CampRegistration>("registrations", {
    q: (ref) => query(ref, where('campId', '==', campId))
  });

  const { data: cadets, loading: cadetsLoading } = useCollection<Cadet>("users", {
    q: (ref) => query(ref, where('role', '==', 'cadet'))
  });

  const handleStatusUpdate = (registrationId: string, newStatus: RegistrationStatus) => {
    if (!firestore || !authUser) return;

    const regRef = doc(firestore, 'registrations', registrationId);
    const updateData = {
      status: newStatus,
      processedBy: authUser.uid,
      processedAt: new Date().toISOString()
    };

    updateDoc(regRef, updateData)
      .then(() => {
        toast({
          title: "STATUS UPDATED",
          description: `Requisition ${newStatus.toUpperCase()} successfully.`,
        });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: regRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  if (campLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="SYNCHRONIZING..." description="Accessing requisition logs..." />
        <Skeleton className="h-[400px] w-full bg-white/5" />
      </div>
    );
  }

  if (!camp) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-foreground">Camp Not Found</h1>
        <Button variant="outline" asChild className="border-white/10">
          <Link href="/admin/camps"><ArrowLeft className="mr-2 h-4 w-4" /> Return to Schedule</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={camp.name.toUpperCase()}
        description="Approve or reject cadet applications for this camp."
      >
        <Button variant="outline" size="sm" asChild className="h-9 border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest">
          <Link href="/admin/camps"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Camps</Link>
        </Button>
      </PageHeader>

      <Card className="border-white/5 bg-card/40 backdrop-blur-md">
        <CardHeader className="border-b border-white/5 pb-6">
          <CardTitle className="text-sm font-black uppercase tracking-widest font-headline">Application List</CardTitle>
          <CardDescription className="text-[10px] uppercase tracking-widest">
            {registrations?.length || 0} cadets have applied. Capacity is {camp.capacity || 'N/A'}.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Cadet Name</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Personnel ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Applied On</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest py-5">Status</TableHead>
                <TableHead className="text-right py-5 pr-6"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(regsLoading || cadetsLoading) ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="border-white/5">
                    <TableCell><Skeleton className="h-4 w-[150px] bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[120px] bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px] bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-[80px] rounded-full bg-white/5" /></TableCell>
                    <TableCell className="text-right pr-6"><Skeleton className="h-8 w-20 bg-white/5 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : registrations?.map((reg) => {
                const cadet = cadets?.find(c => (c as any).id === reg.uid);
                return (
                  <TableRow key={reg.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                    <TableCell className="text-sm font-bold text-foreground uppercase tracking-tight py-6">
                      {cadet?.displayName || 'Unknown Cadet'}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-primary/80">
                      {cadet?.regimentalNumber || '---'}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground uppercase tracking-widest">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={statusVariant[reg.status]} 
                        className={`text-[9px] font-black uppercase tracking-[0.2em] ${reg.status === 'accepted' ? 'bg-primary text-primary-foreground' : ''}`}
                      >
                        {reg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {reg.status === 'pending' && (
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8 border-primary/20 hover:bg-primary/20 hover:text-primary transition-all text-primary"
                            onClick={() => handleStatusUpdate(reg.id as string, 'accepted')}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8 border-destructive/20 hover:bg-destructive/20 hover:text-destructive transition-all text-destructive"
                            onClick={() => handleStatusUpdate(reg.id as string, 'rejected')}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {!regsLoading && registrations?.length === 0 && (
                <TableRow className="border-none">
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <Users className="w-12 h-12 mb-2" />
                      <p className="text-xs font-black uppercase tracking-[0.3em]">No applications recorded</p>
                      <p className="text-[10px] uppercase tracking-widest">Waiting for personnel requisitions</p>
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
