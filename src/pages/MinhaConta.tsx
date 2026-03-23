import { useState } from "react";
import { Ticket, History, User, Heart, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const menuItems = [
  { id: "vouchers", label: "Meus Vouchers", icon: Ticket },
  { id: "historico", label: "Histórico de Compras", icon: History },
  { id: "dados", label: "Dados Pessoais", icon: User },
  { id: "favoritos", label: "Favoritos", icon: Heart },
];

const mockVouchers = [
  { id: 1, name: "Jantar às Cegas", status: "Ativo", expiry: "15/09/2026", price: "R$ 289" },
  { id: 2, name: "Spa Day Premium", status: "Ativo", expiry: "20/08/2026", price: "R$ 420" },
  { id: 3, name: "Aula de Surfe", status: "A expirar", expiry: "10/05/2026", price: "R$ 129" },
];

const mockHistory = [
  { id: 1, name: "Oficina de Cerâmica", date: "12/01/2026", price: "R$ 189", status: "Resgatado" },
  { id: 2, name: "Trilha Guiada na Tijuca", date: "05/12/2025", price: "R$ 159", status: "Resgatado" },
  { id: 3, name: "Workshop de Fotografia", date: "20/11/2025", price: "R$ 210", status: "Resgatado" },
];

export default function MinhaConta() {
  const [active, setActive] = useState("vouchers");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8 flex-1">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* SIDEBAR */}
          <aside className="space-y-3">
            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-lg">Maria Silva</h3>
              <p className="text-xs text-muted-foreground">maria@email.com</p>
            </div>

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </aside>

          {/* CONTEÚDO */}
          <main>
            {active === "vouchers" && (
              <div>
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-card rounded-xl border border-border p-5 text-center">
                    <span className="text-3xl font-serif text-primary">3</span>
                    <p className="text-xs text-muted-foreground mt-1">Vouchers Ativos</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-5 text-center">
                    <span className="text-3xl font-serif text-primary">7</span>
                    <p className="text-xs text-muted-foreground mt-1">Experiências Vividas</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-5 text-center">
                    <span className="text-3xl font-serif text-primary">1</span>
                    <p className="text-xs text-muted-foreground mt-1">A Expirar</p>
                  </div>
                </div>

                <h2 className="font-serif text-xl mb-4">Meus Vouchers Ativos</h2>
                <div className="space-y-3">
                  {mockVouchers.map((v) => (
                    <div key={v.id} className="flex items-center justify-between bg-card rounded-xl border border-border p-4">
                      <div>
                        <h3 className="font-medium text-sm">{v.name}</h3>
                        <p className="text-xs text-muted-foreground">Expira em: {v.expiry} · {v.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${v.status === "A expirar" ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"}`}>
                          {v.status}
                        </span>
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-medium hover:bg-terracotta-dark transition-colors">
                          Resgatar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="font-serif text-xl mt-8 mb-4">Histórico Recente</h2>
                <div className="space-y-2">
                  {mockHistory.map((h) => (
                    <div key={h.id} className="flex items-center justify-between bg-card rounded-xl border border-border p-4">
                      <span className="text-sm font-medium">{h.name}</span>
                      <span className="text-xs text-muted-foreground">{h.date} · {h.price} · {h.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "historico" && (
              <div>
                <h2 className="font-serif text-xl mb-4">Histórico Completo</h2>
                <div className="space-y-2">
                  {[...mockHistory, ...mockVouchers.map((v) => ({ ...v, date: v.expiry, status: v.status }))].map((h, i) => (
                    <div key={i} className="flex items-center justify-between bg-card rounded-xl border border-border p-4">
                      <span className="text-sm font-medium">{h.name}</span>
                      <span className="text-xs text-muted-foreground">{h.date} · {h.price} · {h.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "dados" && (
              <div className="max-w-md">
                <h2 className="font-serif text-xl mb-6">Dados Pessoais</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Nome</label>
                    <input defaultValue="Maria Silva" className="w-full mt-1 rounded-lg border border-border bg-card px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">E-mail</label>
                    <input defaultValue="maria@email.com" className="w-full mt-1 rounded-lg border border-border bg-card px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Telefone</label>
                    <input defaultValue="(11) 99999-0000" className="w-full mt-1 rounded-lg border border-border bg-card px-4 py-3 text-sm" />
                  </div>
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}

            {active === "favoritos" && (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-serif text-xl mb-2">Nenhum favorito ainda</h2>
                <p className="text-sm text-muted-foreground">Explore o catálogo e salve suas experiências favoritas.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
