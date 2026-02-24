import { cn } from '@/app/lib/utils';

export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn('mx-auto max-w-7xl p-4 md:p-8', className)}>
      {children}
    </div>
  );
};
