import { Link } from "react-router-dom";
import { Gift, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-serif text-xl mb-3">
              <Gift className="w-5 h-5" />
              Vivência
            </Link>
            <p className="text-sm opacity-70">
              Presentes que viram memórias. Vouchers de experiências únicas para quem você ama.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-wider mb-4 opacity-80">Navegação</h4>
            <div className="flex flex-col gap-2">
              <Link to="/como-funciona" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Como Funciona</Link>
              <Link to="/categorias" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Categorias</Link>
              <Link to="/catalogo" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Catálogo</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-wider mb-4 opacity-80">Parceiros</h4>
            <div className="flex flex-col gap-2">
              <Link to="/parceiros" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Seja um Parceiro</Link>
              <span className="text-sm opacity-70">Contato</span>
              <span className="text-sm opacity-70">Suporte</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-wider mb-4 opacity-80">Redes Sociais</h4>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Facebook className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Mail className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-50">
          © 2026 Vivência. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
