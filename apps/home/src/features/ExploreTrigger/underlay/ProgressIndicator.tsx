export function ProgressIndicator({
  currentSection,
  totalSections,
}: {
  currentSection: number;
  totalSections: number;
}) {
  return (
    <div className="fixed bottom-8 right-8 z-30 flex items-center space-x-4 bg-background/50 backdrop-blur-md rounded-full px-2 py-1">
      <div className="text-xl font-mono">
        <span className="text-foreground">
          {(currentSection + 1).toString().padStart(2, "0")}
        </span>
        <span className="text-foreground/40">
          {" "}
          / {totalSections.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="w-32 h-[1px] bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
        />
      </div>
    </div>
  );
}
