import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, type Category } from "@/data/experiences";
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

const budgetOptions = ["Até R$150", "R$150–300", "R$300–500", "Acima de R$500"];

export default function Categorias() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-accent py-16 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Escolha por Perfil</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Cada pessoa é única. Encontre experiências que combinam com o estilo de quem você quer presentear.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {(Object.keys(categories) as Category[]).map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/catalogo?categoria=${key}`}
                className="group block rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={catImages[key]}
                    alt={categories[key].label}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{categories[key].emoji}</span>
                    <h2 className="font-serif text-2xl">{categories[key].label}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{categories[key].description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Ver Experiências →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FILTRO POR ORÇAMENTO */}
      <section className="bg-secondary py-12">
        <div className="container">
          <h2 className="text-2xl font-serif text-center mb-6">Filtro por Orçamento</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {budgetOptions.map((opt) => (
              <Link
                key={opt}
                to="/catalogo"
                className="px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {opt}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
