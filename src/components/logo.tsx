import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type LogoProps = {
  className?: string;
  isLink?: boolean;
  imageSrc?: string;
};

export function Logo({ className, isLink = false, imageSrc = "/ncc.jpg" }: LogoProps) {
  const content = (
    <div className={cn('flex items-center text-primary', className)}>
      <Image
        src={imageSrc}
        alt="NCC Logo"
        width={32}
        height={32}
        data-ai-hint="logo"
      />
    </div>
  );

  if (isLink) {
    return (
      <Link href="/" aria-label="NCC Command Home">
        {content}
      </Link>
    );
  }

  return content;
}
