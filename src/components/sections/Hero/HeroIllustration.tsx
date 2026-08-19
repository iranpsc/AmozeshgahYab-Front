export default function HeroIllustration() {
  return (
    <div className="relative aspect-square w-full max-w-lg">
      <div className="absolute inset-0 rounded-full bg-primary-light blur-2xl" />
      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="170" fill="var(--surface-2)" />
        <ellipse cx="200" cy="330" rx="150" ry="14" fill="var(--border)" opacity="0.5" />

        {/* پایه گنبد */}
        <rect x="150" y="240" width="100" height="90" rx="4" fill="var(--card)" stroke="var(--border)" />
        <rect x="165" y="150" width="8" height="100" fill="var(--muted-foreground)" opacity="0.4" />
        <rect x="227" y="150" width="8" height="100" fill="var(--muted-foreground)" opacity="0.4" />
        <rect x="196" y="150" width="8" height="100" fill="var(--muted-foreground)" opacity="0.4" />

        {/* گنبد */}
        <path d="M150 150 Q200 90 250 150 Z" fill="var(--primary)" />
        <rect x="145" y="146" width="110" height="8" rx="2" fill="var(--primary-hover)" />
        <circle cx="200" cy="85" r="6" fill="var(--accent)" />

        {/* درخت‌ها */}
        <circle cx="90" cy="260" r="34" fill="var(--category-green)" opacity="0.85" />
        <rect x="86" y="290" width="8" height="30" fill="var(--muted-foreground)" opacity="0.5" />
        <circle cx="315" cy="250" r="28" fill="var(--category-green)" opacity="0.7" />
        <rect x="311" y="275" width="7" height="26" fill="var(--muted-foreground)" opacity="0.5" />
      </svg>
    </div>
  );
}
