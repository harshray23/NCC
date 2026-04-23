import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center p-4 bg-[#0a0c0a]">
      {/* Heavily blurred camouflage background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/camo.jpg"
          alt="Camouflage background"
          fill
          className="object-cover blur-[8px] opacity-30 scale-105"
          data-ai-hint="camouflage pattern"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>
      
      {/* Optional: Static Noise/Grain texture for military look */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://picsum.photos/id/207/1920/1080")', backgroundSize: 'cover' }} 
      />

      <div className="w-full flex justify-center animate-in fade-in duration-1000">
        {children}
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-8 text-[10px] tracking-[0.4em] text-muted-foreground uppercase opacity-50">
        Secure Command Access • NCC 10 Bengal BN
      </div>
    </div>
  );
}
