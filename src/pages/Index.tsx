import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Zap, Clock, Package, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import { experiences, categories, type Category } from "@/data/experiences";
import heroImg from "@/assets/hero-home.jpg";
import catAventureiro from "@/assets/cat-aventureiro.jpg";
import catGourmet from "@/assets/cat-gourmet.jpg";
import catRelaxamento from "@/assets/cat-relaxamento.jpg";
import catCriativo from "@/assets/cat-criativo.jpg";

const catImages: Record<Category, string> = {
  aventureiro: catAventureiro,
  gourmet: catGourmet,
  relaxamento: catRelaxamento,
  criativo: catCriativo,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Index() {
  const featured = experiences.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-accent overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-4">
              Presentes que viram{" "}
              <span className="text-primary italic">memórias</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Vouchers de experiências únicas — jantares, trilhas, spas e muito mais. Surpreenda quem você ama.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors"
              >
                Explorar Experiências
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/como-funciona"
                className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Como Funciona
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block"
          >
            <img
              src={heroImg}
              alt="Amigos trocando presentes"
              width={1280}
              height={720}
              className="rounded-2xl object-cover w-full h-full max-h-[420px] shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="container py-16">
        <h2 className="text-3xl font-serif text-center mb-2">Escolha por Perfil</h2>
        <p className="text-center text-muted-foreground mb-10">Encontre a experiência ideal para cada tipo de pessoa</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(categories) as Category[]).map((key, i) => (
            <motion.div key={key} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Link
                to={`/catalogo?categoria=${key}`}
                className="group block rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={catImages[key]} alt={categories[key].label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center">
                  <span className="text-2xl">{categories[key].emoji}</span>
                  <h3 className="font-serif text-lg mt-1">{categories[key].label}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{categories[key].description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="text-3xl font-serif text-center mb-10">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "1. Escolha o Perfil", desc: "Aventureiro, gourmet, relaxamento ou criativo — encontre o presente perfeito." },
              { icon: Zap, title: "2. Compre o Voucher", desc: "Pagamento seguro e entrega instantânea por e-mail. Sem complicação." },
              { icon: Package, title: "3. Envie e Surpreenda", desc: "O presenteado escolhe quando e onde viver a experiência." },
            ].map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-xl p-6 text-center border border-border"
              >
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

      {/* EXPERIÊNCIAS EM DESTAQUE */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-serif">Experiências em Destaque</h2>
          <Link to="/catalogo" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-accent py-16">
        <div className="container">
          <h2 className="text-3xl font-serif text-center mb-10">Por que a Vivência?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Entrega Instantânea", desc: "Voucher digital enviado imediatamente. Perfeito para presentes de última hora." },
              { icon: Clock, title: "Validade Dinâmica", desc: "3 a 6 meses para o presenteado escolher o melhor momento." },
              { icon: Package, title: "Sem Estoque Físico", desc: "100% digital. Sem logística, sem estresse, sem desperdício." },
            ].map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA PARCEIROS */}
      <section className="container py-16">
        <div className="bg-foreground text-primary-foreground rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl mb-2">Seja um Parceiro</h2>
            <p className="text-sm opacity-80 max-w-md">
              Cadastre seu estabelecimento e alcance novos clientes qualificados sem custo inicial.
            </p>
          </div>
          <Link
            to="/parceiros"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors whitespace-nowrap"
          >
            Quero me Cadastrar
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
