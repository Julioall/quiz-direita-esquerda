export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow p-5 ${className}`}>
      {children}
    </div>
  );
}
