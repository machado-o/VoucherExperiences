import { Link, useLocation } from "react-router-dom";
import { Gift, Menu, X, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Como Funciona", path: "/como-funciona" },
  { label: "Categorias", path: "/categorias" },
  { label: "Catálogo", path: "/catalogo" },
  { label: "Parceiros", path: "/parceiros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl text-foreground">
          <Gift className="w-6 h-6 text-primary" />
          <span>Vivência</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/minha-conta"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <User className="w-4 h-4" />
            Minha Conta
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/minha-conta"
            className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Minha Conta
          </Link>
        </div>
      )}
    </header>
  );
}
