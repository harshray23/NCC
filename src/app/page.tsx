"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import animationData from '@/assets/Transition.json';
import Image from 'next/image';

export default function TransitionPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/landing');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Lottie animationData={animationData} loop={true} style={{ height: '100%', width: '100%' }} />
      </div>
      <div className="z-10 flex flex-col items-center">
        <Image
          src="/emblem.jpg"
          alt="NCC Emblem"
          width={150}
          height={150}
          data-ai-hint="emblem"
          className="animate-morph"
        />
        <Image
          src="/ncc.jpg"
          alt="NCC Logo"
          width={150}
          height={150}
          className="mt-4 animate-pulse-slow"
          data-ai-hint="logo"
        />
      </div>
    </div>
  );
}
