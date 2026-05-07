import { motion } from "framer-motion";
import { DollarSign, Users, BarChart3, ArrowRight, CheckCircle, Building2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroParceiros from "@/assets/hero-parceiros.jpg";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const CATEGORIAS = ["Aventureiro", "Gourmet", "Relaxamento", "Criativo"];

export default function Parceiros() {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "", cnpj: "", cidade: "", telefone: "", email: "",
    categoria: "", nomeExp: "", descricao: "", preco: "", capacidade: "1",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const canStep1 = form.nome && form.cnpj && form.cidade && form.email;
  const canStep2 = form.categoria && form.nomeExp && form.descricao;

  const handleSubmit = () => {
    toast.success("Cadastro enviado com sucesso! Entraremos em contato em até 48 horas.");
    setSubmitted(true);
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
              "Cadastre-se",
              "Cadastre suas Experiências",
              "Receba Vouchers",
              "Receba o Pagamento",
            ].map((stepText, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card rounded-xl p-6 text-center border border-border">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-sm font-medium">{stepText}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO — WIZARD 3 ETAPAS */}
      <section id="cadastro" className="container py-16">
        <h2 className="text-2xl font-serif text-center mb-2">Cadastro de Parceiro</h2>
        <p className="text-center text-muted-foreground text-sm mb-10">
          Complete as etapas abaixo para cadastrar seu estabelecimento.
        </p>

        {/* Step indicator */}
        {!submitted && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  formStep >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {formStep > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                <span className={`text-sm hidden sm:inline ${formStep >= s ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s === 1 ? "Estabelecimento" : s === 2 ? "Experiência" : "Revisão"}
                </span>
                {s < 3 && <div className={`w-8 h-px ${formStep > s ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          {/* SUCESSO */}
          {submitted && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card>
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2">Cadastro Enviado!</h3>
                    <p className="text-muted-foreground text-sm">
                      Nossa equipe analisará o perfil de <strong>{form.nome}</strong> e entrará em contato em até 48 horas no e-mail <strong>{form.email}</strong>.
                    </p>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-left space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Estabelecimento:</span> {form.nome}</p>
                    <p><span className="text-muted-foreground">Experiência:</span> {form.nomeExp}</p>
                    <p><span className="text-muted-foreground">Categoria:</span> {form.categoria}</p>
                    <p><span className="text-muted-foreground">Cidade:</span> {form.cidade}</p>
                  </div>
                  <Link to="/painel-parceiro">
                    <Button className="w-full gap-2">
                      <Sparkles className="w-4 h-4" /> Conhecer o Painel do Parceiro
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ETAPA 1 — Dados do Estabelecimento */}
          {!submitted && formStep === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-lg">
                    <Building2 className="w-5 h-5 text-primary" /> Dados do Estabelecimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="nome">Nome do Estabelecimento</Label>
                      <Input id="nome" value={form.nome} onChange={set("nome")} placeholder="Ex: Restaurante Sabor Nordeste" />
                    </div>
                    <div>
                      <Label htmlFor="cnpj">CPF ou CNPJ</Label>
                      <Input id="cnpj" value={form.cnpj} onChange={set("cnpj")} placeholder="00.000.000/0001-00" />
                    </div>
                    <div>
                      <Label htmlFor="cidade">Cidade, Estado</Label>
                      <Input id="cidade" value={form.cidade} onChange={set("cidade")} placeholder="Ex: Fortaleza, CE" />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" value={form.telefone} onChange={set("telefone")} placeholder="(85) 99999-0000" />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail de Contato</Label>
                      <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="contato@estabelecimento.com" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button onClick={() => setFormStep(2)} disabled={!canStep1} className="w-full mt-4 py-6 text-lg">
                Continuar para Experiência
              </Button>
            </motion.div>
          )}

          {/* ETAPA 2 — Detalhes da Experiência */}
          {!submitted && formStep === 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-lg">
                    <Sparkles className="w-5 h-5 text-primary" /> Detalhes da Experiência
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoria">Categoria</Label>
                      <select
                        id="categoria"
                        value={form.categoria}
                        onChange={set("categoria")}
                        className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Selecione...</option>
                        {CATEGORIAS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="capacidade">Capacidade (pessoas)</Label>
                      <Input id="capacidade" type="number" min="1" value={form.capacidade} onChange={set("capacidade")} placeholder="1" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="nomeExp">Nome da Experiência</Label>
                      <Input id="nomeExp" value={form.nomeExp} onChange={set("nomeExp")} placeholder="Ex: Jantar com Chef à Beira-Mar" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="descricao">Descrição Breve</Label>
                      <textarea
                        id="descricao"
                        value={form.descricao}
                        onChange={set("descricao")}
                        rows={3}
                        placeholder="Descreva sua experiência em poucas palavras..."
                        className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preco">Preço Estimado (R$)</Label>
                      <Input id="preco" type="number" min="0" value={form.preco} onChange={set("preco")} placeholder="Ex: 150" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={() => setFormStep(1)} className="flex-1 py-6">
                  Voltar
                </Button>
                <Button onClick={() => setFormStep(3)} disabled={!canStep2} className="flex-[2] py-6 text-lg">
                  Revisar Cadastro
                </Button>
              </div>
            </motion.div>
          )}

          {/* ETAPA 3 — Revisão */}
          {!submitted && formStep === 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-lg">
                    <CheckCircle className="w-5 h-5 text-primary" /> Revisão do Cadastro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Estabelecimento</h4>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground">Nome: </span><span className="font-medium">{form.nome}</span></div>
                      <div><span className="text-muted-foreground">CPF/CNPJ: </span><span className="font-medium">{form.cnpj}</span></div>
                      <div><span className="text-muted-foreground">Cidade: </span><span className="font-medium">{form.cidade}</span></div>
                      <div><span className="text-muted-foreground">Telefone: </span><span className="font-medium">{form.telefone || "—"}</span></div>
                      <div className="sm:col-span-2"><span className="text-muted-foreground">E-mail: </span><span className="font-medium">{form.email}</span></div>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Experiência</h4>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground">Nome: </span><span className="font-medium">{form.nomeExp}</span></div>
                      <div><span className="text-muted-foreground">Categoria: </span><span className="font-medium">{form.categoria}</span></div>
                      <div><span className="text-muted-foreground">Capacidade: </span><span className="font-medium">{form.capacidade} pessoa(s)</span></div>
                      <div><span className="text-muted-foreground">Preço: </span><span className="font-medium">{form.preco ? `R$ ${form.preco}` : "—"}</span></div>
                      <div className="sm:col-span-2"><span className="text-muted-foreground">Descrição: </span><span className="font-medium">{form.descricao}</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={() => setFormStep(2)} className="flex-1 py-6">
                  Voltar
                </Button>
                <Button onClick={handleSubmit} className="flex-[2] py-6 text-lg">
                  Enviar Cadastro
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
