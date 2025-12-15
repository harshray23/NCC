
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Shield, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen items-center justify-center p-4">
         <Image
              src="/camo.jpg"
              alt="Camouflage background"
              fill
              className="object-cover -z-10"
              data-ai-hint="camouflage pattern"
            />
          
          <div className="absolute top-16 flex flex-col items-center text-center">
              <Image 
                  src="/emblem.jpg"
                  width={120}
                  height={120}
                  alt="NCC Emblem"
                  className="mb-4"
                  data-ai-hint="emblem"
              />
              <Card className="w-full max-w-4xl bg-background/80 backdrop-blur-sm relative">
                  <Link href="/login/manager" className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors">
                      <Briefcase className="h-6 w-6" />
                      <span className="sr-only">Login as Manager</span>
                  </Link>
                  <CardHeader>
                      <div className="flex flex-col md:flex-row items-center gap-6">
                          <Image 
                              src="/ncc.jpg"
                              width={150}
                              height={150}
                              alt="NCC Illustration"
                              className="rounded-lg"
                              data-ai-hint="cadet illustration"
                          />
                          <div className="text-center md:text-left">
                              <CardTitle className="text-3xl font-headline">Welcome to NCC Portal</CardTitle>
                              <p className="font-semibold mt-2">10 Bengal Battalion</p>
                              <p className="font-semibold text-primary">Asansol Engineering College</p>
                              <CardDescription className="mt-2">Please select your portal to continue.</CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                      <Card className="text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                          <CardHeader>
                              <User className="h-12 w-12 mx-auto text-muted-foreground" />
                              <CardTitle className="mt-2">Cadet Portal</CardTitle>
                              <CardDescription>Access your profile and other cadet services.</CardDescription>
                          </CardHeader>
                          <CardContent>
                              <Button className="w-full transform transition-transform duration-200 hover:scale-105" asChild>
                                  <Link href="/login/cadet">Login as Cadet</Link>
                              </Button>
                          </CardContent>
                      </Card>
                       <Card className="text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                          <CardHeader>
                              <Shield className="h-12 w-12 mx-auto text-muted-foreground" />
                              <CardTitle className="mt-2">Admin Portal</CardTitle>
                              <CardDescription>Manage registrations and administrative tasks.</CardDescription>
                          </CardHeader>
                          <CardContent>
                              <Button className="w-full" variant="secondary" asChild>
                                  <Link href="/login/admin">Login as Admin</Link>
                              </Button>
                          </CardContent>
                      </Card>
                  </CardContent>
              </Card>
          </div>
      </div>
    </>
  );
}
