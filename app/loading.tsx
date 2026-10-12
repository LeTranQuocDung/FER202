export default function Loading() {
  return (
    <div
      data-testid="loading"
      className="min-h-[60vh] flex flex-col items-center justify-center p-6"
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Loading...
      </p>
    </div>
  );
}
