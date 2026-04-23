import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Shield, User, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0c0a]">
      {/* Background Camo with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/camo.jpg"
          alt="Camouflage background"
          fill
          className="object-cover opacity-20"
          data-ai-hint="camouflage pattern"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a]/80 via-transparent to-[#0a0c0a]" />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center gap-12">
        {/* Top Branding */}
        <div className="flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Image 
              src="/emblem.jpg"
              width={100}
              height={100}
              alt="NCC Emblem"
              className="relative drop-shadow-[0_0_15px_rgba(132,189,0,0.3)]"
              data-ai-hint="emblem"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary/80">10 Bengal Battalion</h2>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase font-headline">
              NCC <span className="text-primary">Command</span> Portal
            </h1>
            <p className="text-muted-foreground font-medium">Asansol Engineering College Unit</p>
          </div>
        </div>

        {/* Role Selection Grid */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Cadet Card - Primary */}
          <Card className="group relative overflow-hidden bg-background/40 backdrop-blur-md border-primary/30 hover:border-primary transition-all duration-500 shadow-2xl shadow-primary/5 hover:shadow-primary/20">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <User size={120} strokeWidth={1} />
            </div>
            <CardHeader className="relative z-10 pt-8">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
                <User className="text-primary w-6 h-6" />
              </div>
              <CardTitle className="text-3xl font-bold text-white font-headline tracking-wide uppercase">Cadet Portal</CardTitle>
              <CardDescription className="text-muted-foreground text-base leading-relaxed">
                Access your training records, camp history, and attendance tracking systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pb-8">
              <Button 
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground group"
                asChild
              >
                <Link href="/login/cadet" className="flex items-center justify-center gap-2">
                  ENTER AS CADET
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
            {/* Visual Highlight for Primary Card */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
          </Card>

          {/* Admin Card - Secondary */}
          <Card className="group relative overflow-hidden bg-background/20 backdrop-blur-md border-white/5 hover:border-white/20 transition-all duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield size={120} strokeWidth={1} />
            </div>
            <CardHeader className="relative z-10 pt-8">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <Shield className="text-white/60 w-6 h-6" />
              </div>
              <CardTitle className="text-3xl font-bold text-white/90 font-headline tracking-wide uppercase">Admin Hub</CardTitle>
              <CardDescription className="text-muted-foreground text-base leading-relaxed">
                Manage unit strength, process camp registrations, and generate reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pb-8">
              <Button 
                className="w-full h-14 text-lg font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 group"
                variant="outline"
                asChild
              >
                <Link href="/login/admin" className="flex items-center justify-center gap-2">
                  STAFF LOGIN
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Manager Login - Subtle Link */}
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Link 
            href="/login/manager" 
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm font-medium tracking-widest uppercase"
          >
            <Briefcase className="w-4 h-4" />
            Strategic Oversight Access
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-12 pb-8 flex flex-col items-center gap-4 text-center">
          <div className="h-px w-24 bg-white/10" />
          <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/50">
            Official Management System &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
