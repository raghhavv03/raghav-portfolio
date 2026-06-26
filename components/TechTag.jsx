export default function TechTag({ children }) {
  return (
    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-bg-tertiary text-accent border border-accent/20">
      {children}
    </span>
  );
}
