import { useState, Fragment } from "react";
import { BarChart3, Ticket, Star, TrendingUp, QrCode, Check, X, Edit } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  { label: "Faturamento (mês)", value: "R$ 4.280", icon: TrendingUp, delta: "+18% vs mês anterior" },
  { label: "Vouchers Emitidos", value: "18", icon: Ticket, delta: "este mês" },
  { label: "Resgates Confirmados", value: "12", icon: Check, delta: "de 18 emitidos" },
  { label: "Avaliação Média", value: "4.8 ★", icon: Star, delta: "32 avaliações" },
];

const monthlyRevenue = [
  { month: "Dez", value: 1800 },
  { month: "Jan", value: 2400 },
  { month: "Fev", value: 1950 },
  { month: "Mar", value: 3100 },
  { month: "Abr", value: 3700 },
  { month: "Mai", value: 4280 },
];

const mockVouchersIssued = [
  { code: "VCH-AB12CD", experience: "Jantar às Cegas", buyer: "Carlos M.", date: "03/05/2026", status: "Ativo" },
  { code: "VCH-EF34GH", experience: "Jantar às Cegas", buyer: "Fernanda S.", date: "28/04/2026", status: "Resgatado" },
  { code: "VCH-IJ56KL", experience: "Jantar às Cegas", buyer: "Rafael O.", date: "21/04/2026", status: "Resgatado" },
  { code: "VCH-MN78OP", experience: "Jantar às Cegas", buyer: "Beatriz L.", date: "15/04/2026", status: "Ativo" },
  { code: "VCH-QR90ST", experience: "Jantar às Cegas", buyer: "Henrique A.", date: "08/04/2026", status: "Expirado" },
];

const mockExperiences = [
  { name: "Jantar às Cegas", category: "Gourmet", price: 289, sold: 18, rating: 4.8, active: true },
  { name: "Tour Gastronômico de Fortaleza", category: "Gourmet", price: 160, sold: 6, rating: 4.6, active: false },
];

const tabs = ["Visão Geral", "Vouchers Emitidos", "Minhas Experiências"];

const statusStyle = (status: string) => {
  if (status === "Resgatado") return "bg-accent text-accent-foreground";
  if (status === "Ativo") return "bg-primary/10 text-primary";
  return "bg-muted text-muted-foreground";
};

export default function PainelParceiro() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-1">Painel do Prestador</h1>
          <p className="text-sm text-muted-foreground">
            Bem-vindo, <strong>Restaurante Sabor Nordeste</strong> · Fortaleza, CE
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-serif text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.delta}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary p-1 rounded-lg w-fit">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === i
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab: Visão Geral */}
        {activeTab === 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" /> Faturamento — Últimos 6 Meses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 h-40 pt-2">
                  {monthlyRevenue.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground leading-none">
                        R${(m.value / 1000).toFixed(1)}k
                      </span>
                      <div
                        className="w-full bg-primary rounded-t-md transition-all"
                        style={{ height: `${(m.value / maxRevenue) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{m.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg">Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockVouchersIssued.slice(0, 4).map((v, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{v.buyer}</p>
                        <p className="text-xs text-muted-foreground font-mono">{v.code} · {v.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusStyle(v.status)}`}>
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab: Vouchers Emitidos */}
        {activeTab === 1 && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Código</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Comprador</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Data</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">QR Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockVouchersIssued.map((v) => (
                      <Fragment key={v.code}>
                        <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                          <td className="px-4 py-3 font-mono font-medium">{v.code}</td>
                          <td className="px-4 py-3">{v.buyer}</td>
                          <td className="px-4 py-3 text-muted-foreground">{v.date}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${statusStyle(v.status)}`}>
                              {v.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => setExpandedCode(expandedCode === v.code ? null : v.code)}
                              className="flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              <QrCode className="w-3 h-3" />
                              {expandedCode === v.code ? "Fechar" : "Ver QR"}
                            </button>
                          </td>
                        </tr>
                        {expandedCode === v.code && (
                          <tr className="bg-secondary/30">
                            <td colSpan={5} className="px-4 py-4">
                              <div className="flex items-center gap-4">
                                <QRCodeSVG
                                  value={`https://machado-o.github.io/VoucherExperiences/resgatar/${v.code}`}
                                  size={100}
                                  bgColor="transparent"
                                  fgColor="#000000"
                                  level="M"
                                />
                                <div className="text-sm space-y-1">
                                  <p className="font-medium">{v.experience}</p>
                                  <p className="text-muted-foreground">Comprador: {v.buyer}</p>
                                  <p className="font-mono font-bold text-primary">{v.code}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Apresente este QR Code no local para validar o voucher
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab: Minhas Experiências */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {mockExperiences.map((exp, i) => (
              <Card key={i}>
                <CardContent className="p-5 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-serif text-lg">{exp.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        exp.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        {exp.active ? "Ativa" : "Pausada"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exp.category} · R$ {exp.price} · {exp.sold} vendas · {exp.rating} ★
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs border border-border rounded-lg px-3 py-2 hover:bg-secondary transition-colors">
                      <Edit className="w-3 h-3" /> Editar
                    </button>
                    <button className="flex items-center gap-1 text-xs border border-border rounded-lg px-3 py-2 hover:bg-secondary transition-colors">
                      {exp.active ? <X className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                      {exp.active ? "Pausar" : "Ativar"}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <button className="w-full border-2 border-dashed border-border rounded-xl p-6 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              + Adicionar Nova Experiência
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
