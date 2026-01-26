import React from "react"
interface BadgeProps {
  variant?: 'type' | 'health' | 'default';
  children: React.ReactNode;
}

export default function Badge({ variant = 'default', children }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors';

  const variants = {
    type: 'bg-primary/10 text-primary',
    health: 'bg-secondary/10 text-secondary',
    default: 'bg-muted text-muted-foreground'
  };

  return (
    <span className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </span>
  );
}
