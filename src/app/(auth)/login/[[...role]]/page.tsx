"use client"

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, ShieldCheck, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const params = useParams()
  const router = useRouter()
  const role = Array.isArray(params.role) ? params.role[0] : 'cadet'
  const [showPassword, setShowPassword] = useState(false)

  const roleConfig = useMemo(() => {
    switch (role) {
      case 'admin':
        return {
          title: 'Staff Login',
          idLabel: 'Service Email',
          idPlaceholder: 'admin@ncc.gov.in',
          idType: 'email',
          dashboardPath: '/admin',
          icon: <ShieldCheck className="w-5 h-5 text-primary" />
        }
      case 'manager':
        return {
          title: 'Strategic Access',
          idLabel: 'Command Email',
          idPlaceholder: 'manager@ncc.gov.in',
          idType: 'email',
          dashboardPath: '/manager',
          icon: <ShieldCheck className="w-5 h-5 text-primary" />
        }
      default: // cadet
        return {
          title: 'Cadet Sign In',
          idLabel: 'Regimental Number',
          idPlaceholder: 'WB21SDA123456',
          idType: 'text',
          dashboardPath: '/cadet',
          icon: <User className="w-5 h-5 text-primary" />
        }
    }
  }, [role])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(roleConfig.dashboardPath);
  }

  return (
    <Card className="w-full max-w-sm border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl shadow-black">
      <form onSubmit={handleLogin}>
        <CardHeader className="space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(132,189,0,0.2)]">
               <Image
                src="/ncc.jpg"
                width={48}
                height={48}
                alt="NCC Logo"
                data-ai-hint="logo"
                className="opacity-90"
              />
            </div>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-black tracking-tighter text-white font-headline">SIGN IN</CardTitle>
            <CardDescription className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-2">
              {roleConfig.icon}
              {roleConfig.title}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="id-field" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{roleConfig.idLabel}</Label>
            <Input 
              id="id-field" 
              type={roleConfig.idType} 
              placeholder={roleConfig.idPlaceholder} 
              required 
              className="h-12 bg-white/5 border-white/10 focus:border-primary focus:ring-primary/20 text-white placeholder:text-muted-foreground/30 transition-all"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</Label>
              <Link href="/forgot-password" virtual-link="true" className="text-xs font-bold text-primary/70 hover:text-primary transition-colors tracking-tighter uppercase">
                Reset
              </Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className="h-12 bg-white/5 border-white/10 focus:border-primary focus:ring-primary/20 text-white transition-all pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full w-12 text-muted-foreground hover:bg-transparent hover:text-white transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-6 pt-2">
          <Button type="submit" className="w-full h-12 text-sm font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
            Authenticate
          </Button>
          
          <div className="w-full flex flex-col items-center gap-4">
             {role === 'cadet' && (
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                  Account issues? Contact unit <br/> HQ administrative staff.
                </p>
              )}
              <Button variant="link" size="sm" asChild className="text-muted-foreground hover:text-white transition-colors">
                <Link href="/landing" className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                  <ArrowLeft className="w-3 h-3" /> 
                  Switch Portal
                </Link>
              </Button>
          </div>
        </CardFooter>
      </form>
      {/* Visual Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </Card>
  )
}
