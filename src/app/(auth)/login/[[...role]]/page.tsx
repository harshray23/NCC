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
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import Image from 'next/image'

export default function LoginPage() {
  const params = useParams()
  const router = useRouter()
  const role = Array.isArray(params.role) ? params.role[0] : 'cadet'
  const [showPassword, setShowPassword] = useState(false)

  const roleConfig = useMemo(() => {
    switch (role) {
      case 'admin':
        return {
          title: 'Admin Login',
          idLabel: 'Email Address',
          idPlaceholder: 'admin@example.com',
          idType: 'email',
          dashboardPath: '/admin'
        }
      case 'manager':
        return {
          title: 'Manager Login',
          idLabel: 'Email Address',
          idPlaceholder: 'manager@example.com',
          idType: 'email',
          dashboardPath: '/manager'
        }
      default: // cadet
        return {
          title: 'Welcome Back',
          idLabel: 'Regimental Number',
          idPlaceholder: 'e.g. WB2024SDIA9160860',
          idType: 'text',
          dashboardPath: '/cadet'
        }
    }
  }, [role])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    router.push(roleConfig.dashboardPath);
  }

  return (
    <Card className="w-full max-w-sm bg-background/80 backdrop-blur-sm">
      <form onSubmit={handleLogin}>
        <CardHeader className="text-center items-center">
            <Image
              src="/ncc.jpg"
              width={80}
              height={80}
              alt="NCC Logo"
              data-ai-hint="logo"
            />
            <CardTitle className="mt-4 text-2xl font-headline">{roleConfig.title}</CardTitle>
            <CardDescription>Sign in to access your portal</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="id-field">{roleConfig.idLabel}</Label>
            <Input id="id-field" type={roleConfig.idType} placeholder={roleConfig.idPlaceholder} required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="ml-auto inline-block text-sm text-primary/80 hover:text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} required />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full w-10 text-muted-foreground"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">Sign In</Button>
          {role === 'cadet' && (
             <p className="text-xs text-muted-foreground">
                Don&apos;t have an account? Contact your administrator.
            </p>
          )}
          <Button variant="link" size="sm" asChild className="text-muted-foreground">
            <Link href="/landing"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Portal Selection</Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
