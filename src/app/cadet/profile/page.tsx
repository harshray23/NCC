"use client"

import * as React from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore, useDoc, useStorage } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { User as UserDef } from "@/lib/definitions"
import { Shield, User, Smartphone, Mail, Hash, Calendar, Lock, Camera } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CadetProfilePage() {
  const { toast } = useToast();
  const { user: authUser, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const storage = useStorage();
  
  const cadetPath = authUser?.uid ? `users/${authUser.uid}` : '';
  const { data: cadet, loading: cadetLoading } = useDoc<UserDef>(cadetPath);

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (cadet) {
      setEmail(cadet.email || "");
      setPhone(cadet.phone || "");
      setDisplayName(cadet.displayName || "");
      if (!selectedFile) {
        setAvatarUrl(cadet.avatarUrl || "");
      }
    }
  }, [cadet, selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "ENCRYPTION LIMIT EXCEEDED",
          description: "File size must be under 5MB for secure transmission.",
        });
        return;
      }
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);
    }
  };

  const handleSaveChanges = async () => {
    if (!authUser || !firestore || !storage) {
      toast({ variant: "destructive", title: "AUTH ERROR", description: "Identity verification failed." });
      return;
    }
    setIsSaving(true);

    try {
      let finalAvatarUrl = cadet?.avatarUrl || "";
      
      if (selectedFile) {
        const storageRef = ref(storage, `profile-photos/${authUser.uid}`);
        toast({ title: "UPLOADING INTEL", description: "Securing image data..." });
        const snapshot = await uploadBytes(storageRef, selectedFile);
        finalAvatarUrl = await getDownloadURL(snapshot.ref);
      }

      const userDocRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userDocRef, {
        displayName: displayName,
        email: email,
        phone: phone,
        avatarUrl: finalAvatarUrl,
        updatedAt: new Date().toISOString()
      });

      toast({
        title: "DOSSIER UPDATED",
        description: "Personnel records have been securely modified.",
      });
      setSelectedFile(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "PROTOCOL FAILURE",
        description: error.message || "Could not synchronize changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || (authUser && !cadetPath) || (cadetPath && cadetLoading)) {
    return (
      <div className="space-y-10">
        <PageHeader title="AUTHORIZING ACCESS" description="Synchronizing with central command..." />
        <div className="grid gap-8 lg:grid-cols-3">
           <Skeleton className="h-[400px] w-full bg-white/5" />
           <Skeleton className="h-[400px] lg:col-span-2 w-full bg-white/5" />
        </div>
      </div>
    );
  }

  if (!authUser) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
         <div className="p-4 rounded-full bg-destructive/10 border border-destructive/20 text-destructive mb-4">
           <Lock className="w-12 h-12" />
         </div>
         <h1 className="text-2xl font-black uppercase tracking-tighter font-headline text-white">Secure Access Required</h1>
         <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
            <a href="/landing">Return to Portal</a>
         </Button>
       </div>
     );
  }

  if (!cadet) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
         <div className="p-4 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
           <Shield className="w-12 h-12" />
         </div>
         <h1 className="text-2xl font-black uppercase tracking-tighter font-headline text-white">Personnel File Missing</h1>
       </div>
     );
  }

  const cadetInitial = displayName.charAt(0).toUpperCase() || 'C';

  return (
    <div className="space-y-10">
      <PageHeader
        title="PERSONNEL DOSSIER"
        description="Secure record management for active-duty personnel."
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-primary/10 border border-primary/20">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black text-primary tracking-widest uppercase">Verified Cadet</span>
        </div>
      </PageHeader>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 border-white/5 bg-black/40 backdrop-blur-md flex flex-col items-center p-8">
          <div className="relative group">
            <Avatar className="h-40 w-40 border-2 border-white/5 group-hover:border-primary/50 transition-all duration-500 shadow-2xl overflow-hidden">
              <AvatarImage src={avatarUrl} alt={displayName} className="object-cover" />
              <AvatarFallback className="text-4xl font-black bg-white/5">{cadetInitial}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
               <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="mt-8 text-center space-y-2">
            <h2 className="text-xl font-black tracking-tighter uppercase font-headline text-white">{displayName}</h2>
            <p className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase">Phase {cadet.year} • {cadet.dept || 'UNIT'}</p>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="mt-8 w-full border-white/10 hover:bg-white/5 text-[10px] font-black tracking-widest uppercase h-11" 
            onClick={() => fileInputRef.current?.click()}
          >
            Update Identification
          </Button>
          <Input id="picture" type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        </Card>

        <Card className="lg:col-span-2 border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5 pb-6">
            <CardTitle className="text-sm font-black tracking-widest uppercase font-headline">Service Specifications</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                 <Label htmlFor="displayName" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                  <User className="w-3 h-3" /> Full Name
                </Label>
                <Input 
                  id="displayName" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 focus:border-primary/50 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                  <Hash className="w-3 h-3" /> Regimental ID
                </Label>
                <div className="h-11 px-3 flex items-center bg-white/5 border border-white/10 rounded font-mono text-xs text-white/40">
                  {cadet.regimentalNumber}
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                  <Mail className="h-3 w-3" /> Secure Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 focus:border-primary/50 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                  <Smartphone className="h-3 w-3" /> Comms Link
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone} 
                  placeholder="+91 00000 00000"
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 focus:border-primary/50 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleSaveChanges} 
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-[0.2em] uppercase px-8 h-12"
              >
                {isSaving ? 'AUTHORIZING...' : 'SYNCHRONIZE DOSSIER'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
