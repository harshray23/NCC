
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import type { User as UserDef } from "@/lib/definitions"
import { Shield, User, Smartphone, Mail, Hash, Lock, Camera, Loader2, Building2, MapPin, CreditCard, Users2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CadetProfilePage() {
  const { toast } = useToast();
  const { user: authUser, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const storage = useStorage();
  
  const cadetPath = authUser?.uid ? `users/${authUser.uid}` : '';
  const { data: cadet, loading: cadetLoading } = useDoc<UserDef>(cadetPath);

  // Form states
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");
  const [collegeName, setCollegeName] = React.useState("");
  const [rank, setRank] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [aadharNumber, setAadharNumber] = React.useState("");
  const [guardianName, setGuardianName] = React.useState("");
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  React.useEffect(() => {
    if (cadet) {
      setEmail(cadet.email || "");
      setPhone(cadet.phone || "");
      setDisplayName(cadet.displayName || "");
      setCollegeName(cadet.collegeName || "");
      setRank(cadet.rank || "CDT");
      setAddress(cadet.address || "");
      setAadharNumber(cadet.aadharNumber || "");
      setGuardianName(cadet.guardianName || "");
      
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
    setUploadProgress(0);

    try {
      let finalAvatarUrl = avatarUrl || "";
      
      if (selectedFile) {
        const storageRef = ref(storage, `profile-photos/${authUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              toast({ variant: "destructive", title: "UPLOAD FAILED", description: error.message });
              reject(error);
            },
            async () => {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              // Append a timestamp to the URL to bust browser cache
              finalAvatarUrl = `${downloadUrl}&t=${Date.now()}`;
              resolve(finalAvatarUrl);
            }
          );
        });
      }

      const userDocRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userDocRef, {
        displayName,
        email,
        phone,
        collegeName,
        rank,
        address,
        aadharNumber,
        guardianName,
        avatarUrl: finalAvatarUrl,
        updatedAt: new Date().toISOString()
      });

      toast({
        title: "DOSSIER UPDATED",
        description: "Personnel records have been securely modified.",
      });
      setSelectedFile(null);
      setUploadProgress(0);
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

  const cadetInitial = displayName ? displayName.charAt(0).toUpperCase() : 'C';

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
            <p className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase">{rank} • Phase {cadet.year} • {cadet.dept || 'UNIT'}</p>
          </div>

          <div className="w-full mt-8 space-y-4">
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                  <span>Encrypting Identity</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-1 bg-white/5" />
              </div>
            )}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-white/10 hover:bg-white/5 text-[10px] font-black tracking-widest uppercase h-11" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isSaving}
            >
              Update Identification
            </Button>
          </div>
          <Input id="picture" type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        </Card>

        <Card className="lg:col-span-2 border-white/5 bg-black/40 backdrop-blur-md">
          <CardHeader className="border-b border-white/5 pb-6">
            <CardTitle className="text-sm font-black tracking-widest uppercase font-headline">Service Specifications</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-10">
            {/* Basic Info */}
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

            {/* Rank and College */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rank" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                  <Shield className="w-3 h-3" /> NCC Rank
                </Label>
                <Select value={rank} onValueChange={setRank}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-11">
                    <SelectValue placeholder="SELECT RANK" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="CDT">CDT (CADET)</SelectItem>
                    <SelectItem value="LCPL">LCPL (LANCE CORPORAL)</SelectItem>
                    <SelectItem value="CPL">CPL (CORPORAL)</SelectItem>
                    <SelectItem value="SGT">SGT (SERGEANT)</SelectItem>
                    <SelectItem value="UO">UO (UNDER OFFICER)</SelectItem>
                    <SelectItem value="SUO">SUO (SENIOR UNDER OFFICER)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="collegeName" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> College/Institution
                </Label>
                <Input 
                  id="collegeName" 
                  value={collegeName} 
                  placeholder="E.G. ASANSOL ENGINEERING COLLEGE"
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 focus:border-primary/50 text-sm"
                />
              </div>
            </div>

            {/* Contact and Identification */}
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

             {/* Personal and Legal Details */}
             <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="guardianName" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                  <Users2 className="h-3 w-3" /> Parent/Guardian Name
                </Label>
                <Input 
                  id="guardianName" 
                  value={guardianName} 
                  placeholder="GUARDIAN FULL NAME"
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 focus:border-primary/50 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadharNumber" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                  <CreditCard className="h-3 w-3" /> Aadhar Identification
                </Label>
                <Input 
                  id="aadharNumber" 
                  value={aadharNumber} 
                  placeholder="0000 0000 0000"
                  onChange={(e) => setAadharNumber(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 focus:border-primary/50 text-sm"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                <MapPin className="h-3 w-3" /> Residential Address
              </Label>
              <Input 
                id="address" 
                value={address} 
                placeholder="FULL POSTAL ADDRESS"
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white/5 border-white/10 h-11 focus:border-primary/50 text-sm"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleSaveChanges} 
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-[0.2em] uppercase px-8 h-12 min-w-[200px]"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Synchronizing...</span>
                  </div>
                ) : 'SYNCHRONIZE DOSSIER'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
