
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/90 hover:-translate-y-1",
      className
    )}>
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className={cn("h-6 w-6 text-primary", iconClassName)} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </div>
  );
};

export default FeatureCard;
