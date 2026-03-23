import { motion } from "framer-motion";
import { DollarSign, Users, BarChart3, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroParceiros from "@/assets/hero-parceiros.jpg";
import { useState } from "react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Parceiros() {
  const [form, setForm] = useState({ nome: "", cidade: "", categoria: "", email: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cadastro enviado com sucesso! Entraremos em contato em breve.");
    setForm({ nome: "", cidade: "", categoria: "", email: "", mensagem: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="bg-accent">
        <div className="container grid md:grid-cols-2 gap-8 py-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Seja um <span className="text-primary italic">Parceiro</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Cadastre seu estabelecimento e alcance novos clientes qualificados, sem custo inicial e sem burocracia.
            </p>
            <a href="#cadastro" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors w-fit">
              Quero me Cadastrar <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden md:block">
            <img src={heroParceiros} alt="Parceria" loading="lazy" className="rounded-2xl object-cover w-full h-full max-h-[350px]" />
          </motion.div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="container py-16">
        <h2 className="text-2xl font-serif text-center mb-10">Benefícios de Ser Parceiro</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: DollarSign, title: "Sem Custo Inicial", desc: "Você só paga uma comissão sobre as vendas realizadas pela plataforma." },
            { icon: Users, title: "Clientes Qualificados", desc: "Receba clientes que já compraram e estão prontos para viver a experiência." },
            { icon: BarChart3, title: "Painel de Gestão", desc: "Acompanhe vouchers, agendamentos e faturamento em tempo real." },
          ].map((b, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card rounded-xl p-6 text-center border border-border">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="text-2xl font-serif text-center mb-10">Como Funciona para o Parceiro</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "1. Cadastre-se",
              "2. Cadastre suas Experiências",
              "3. Receba Vouchers",
              "4. Receba o Pagamento",
            ].map((step, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card rounded-xl p-6 text-center border border-border">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-sm font-medium">{step.slice(3)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="cadastro" className="container py-16">
        <h2 className="text-2xl font-serif text-center mb-10">Cadastro de Parceiro</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              placeholder="Nome do Estabelecimento"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              placeholder="Cidade"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              placeholder="Categoria de Experiência"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              placeholder="E-mail de Contato"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <textarea
            placeholder="Mensagem / Descrição da experiência"
            value={form.mensagem}
            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors">
            Enviar Cadastro
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
