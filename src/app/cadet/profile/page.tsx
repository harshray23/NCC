
"use client"

import * as React from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockCadets } from "@/lib/placeholder-data"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore, useDoc } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { User as UserDef } from "@/lib/definitions"

export default function CadetProfilePage() {
  const { toast } = useToast();
  const { user: authUser, loading: authLoading } = useUser();
  const firestore = useFirestore();
  
  // Fetch the cadet's data from Firestore only when authUser is available
  const { data: cadet, loading: cadetLoading } = useDoc<UserDef>(authUser ? `users/${authUser.uid}` : '');

  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = React.useState<string | undefined>("");
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (cadet) {
      setEmail(cadet.email || "");
      setPhone(cadet.phone || "");
      setAvatarUrl(cadet.avatarUrl);
    }
  }, [cadet]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select a file smaller than 100MB.",
        });
        return;
      }
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);
    }
  };

  const handleSaveChanges = async () => {
    if (!authUser || !firestore) {
      toast({ variant: "destructive", title: "Error", description: "You must be logged in to save changes." });
      return;
    }
    setIsSaving(true);

    try {
      let newAvatarUrl = avatarUrl;
      if (selectedFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `profile-photos/${authUser.uid}`);
        
        toast({ title: "Uploading photo...", description: "Please wait." });
        const snapshot = await uploadBytes(storageRef, selectedFile);
        newAvatarUrl = await getDownloadURL(snapshot.ref);
        setAvatarUrl(newAvatarUrl);
      }

      const userDocRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userDocRef, {
        email: email,
        phone: phone,
        avatarUrl: newAvatarUrl,
      });

      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not save your profile.",
      });
    } finally {
      setIsSaving(false);
      setSelectedFile(null);
    }
  };

  if (authLoading || cadetLoading) {
    return <PageHeader title="Loading Profile..." />
  }

  if (!cadet) {
     return <PageHeader title="Profile Not Found" />
  }

  const cadetInitial = cadet.displayName.charAt(0);

  return (
    <>
      <PageHeader
        title="My Profile"
        description="View and manage your personal information."
      />
      <Card>
        <CardHeader>
          <CardTitle>{cadet.displayName}</CardTitle>
          <CardDescription>Keep your contact details up to date.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-3">
             <div className="md:col-span-1 flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatarUrl} alt={cadet.displayName} data-ai-hint="person portrait" />
                <AvatarFallback>{cadetInitial}</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                Change Photo
              </Button>
               <p className="text-xs text-muted-foreground text-center">
                Photo must be in NCC uniform without a beret and with a white background.
              </p>
              {selectedFile && <p className="text-sm text-muted-foreground truncate">Selected: {selectedFile.name}</p>}
              <Input id="picture" type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="regimentalNumber">Regimental Number</Label>
                <Input id="regimentalNumber" value={cadet.regimentalNumber || ''} readOnly disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rank">Rank</Label>
                <Input id="rank" value={'CDT'} readOnly disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" value={`${cadet.year} Year`} readOnly disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dept">Dept.</Label>
                <Input id="dept" value={''} readOnly disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="col-span-2 flex justify-end">
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
