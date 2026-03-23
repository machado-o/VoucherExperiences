import { motion } from "framer-motion";
import { Search, CreditCard, Send, Mail, CalendarDays, Sparkles, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function ComoFunciona() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="bg-accent py-16 text-center">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-serif mb-4">
            Como Funciona
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Presentear com experiências nunca foi tão simples. Veja o passo a passo para o comprador e para o presenteado.
          </p>
        </div>
      </section>

      {/* PASSOS COMPRADOR */}
      <section className="container py-16">
        <h2 className="text-2xl font-serif text-center mb-10">Passo a Passo — Comprador</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: "1. Escolha o Perfil", desc: "Navegue pelas categorias — aventureiro, gourmet, relaxamento ou criativo — e encontre a experiência ideal." },
            { icon: CreditCard, title: "2. Compre o Voucher", desc: "Pagamento seguro e rápido. O voucher digital é gerado instantaneamente após a confirmação." },
            { icon: Send, title: "3. Envie e Surpreenda", desc: "Envie o voucher por e-mail ou WhatsApp com uma mensagem personalizada. Pronto!" },
          ].map((step, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card rounded-xl p-6 text-center border border-border">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PASSOS PRESENTEADO */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="text-2xl font-serif text-center mb-10">Como o Presenteado Resgata</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "1. Recebe o Voucher", desc: "O presenteado recebe o voucher digital com um código único e todas as instruções." },
              { icon: CalendarDays, title: "2. Escolhe a Data", desc: "Agenda diretamente na plataforma, no dia e horário mais convenientes." },
              { icon: Sparkles, title: "3. Vive a Experiência", desc: "Apresenta o voucher no estabelecimento parceiro e aproveita cada momento." },
            ].map((step, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card rounded-xl p-6 text-center border border-border">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALIDADE DINÂMICA */}
      <section className="container py-16">
        <h2 className="text-2xl font-serif text-center mb-10">Validade Dinâmica</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-2">3 Meses</h3>
            <p className="text-sm text-muted-foreground">
              Experiências de aventura e workshops criativos. Atividades sazonais que exigem agendamento mais próximo.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-2">6 Meses</h3>
            <p className="text-sm text-muted-foreground">
              Experiências gastronômicas e de relaxamento. Mais flexibilidade para o presenteado escolher o momento ideal.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-16">
        <div className="container max-w-2xl">
          <h2 className="text-2xl font-serif text-center mb-10">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Posso trocar a experiência do voucher?", a: "Sim! O presenteado pode trocar por outra experiência da mesma categoria e faixa de preço, sujeito à disponibilidade." },
              { q: "O voucher tem reembolso?", a: "Vouchers não utilizados podem ser reembolsados em até 7 dias após a compra, conforme nossa política." },
              { q: "Como o parceiro valida o voucher?", a: "O parceiro acessa o painel de gestão e insere o código do voucher para validação instantânea." },
              { q: "Posso presentear alguém em outra cidade?", a: "Sim! Basta escolher experiências disponíveis na cidade do presenteado." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-terracotta-dark transition-colors"
        >
          Explorar Experiências
        </Link>
      </section>

      <Footer />
    </div>
  );
}
