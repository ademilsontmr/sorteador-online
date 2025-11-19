import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Blog", href: "/blog" },
];

export const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="transition-smooth hover:opacity-80" onClick={closeMobileMenu}>
          <div className="flex items-center gap-3 rounded-full border border-border/70 bg-background px-4 py-1.5 shadow-card">
            <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Sorteador
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden rounded-full border border-border p-2 text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth"
          onClick={toggleMobileMenu}
          aria-label="Alternar menu"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3 text-base font-semibold text-foreground hover:border-primary transition-smooth"
              >
                {label}
                <span className="text-sm text-muted-foreground">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
