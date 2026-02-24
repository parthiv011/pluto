export const SectionLabel = ({
  label,
  headline,
}: {
  label: string;
  headline: string;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="bg-foreground h-6 w-1 rounded-full opacity-80" />
        <span className="text-muted text-xs font-semibold tracking-wide uppercase">
          {label}
        </span>
      </div>

      <h2 className="max-w-xl text-3xl font-bold">{headline}</h2>
    </div>
  );
};
