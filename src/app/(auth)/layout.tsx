import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center p-4">
      <Image
        src="/camo.jpg"
        alt="Camouflage background"
        fill
        className="object-cover -z-10"
        data-ai-hint="camouflage pattern"
      />
      <div className="absolute top-8 left-8">
         <Image 
            src="/emblem.jpg"
            width={80}
            height={80}
            alt="NCC Emblem"
            data-ai-hint="emblem"
        />
      </div>
      {children}
    </div>
  );
}
