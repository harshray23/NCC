import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  Icon: LucideIcon;
  className?: string;
};

export function StatCard({ title, value, description, Icon, className }: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden group transition-all duration-300 hover:border-primary/40 bg-card/50 backdrop-blur-sm border-border", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <div className="p-2 rounded bg-muted border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-3xl font-black tracking-tighter text-foreground font-headline">{value}</div>
        {description && (
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-primary/60">
            {description}
          </p>
        )}
      </CardContent>
      {/* Decorative military dash */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
    </Card>
  );
}
