import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2">
      <div className="space-y-1 flex-1">
        <h1 className="text-3xl font-black tracking-tighter text-foreground font-headline leading-none">{title}</h1>
        {description && (
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 font-medium">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-3 ml-auto animate-in fade-in slide-in-from-right-4 duration-500">{children}</div>}
    </div>
  );
}
