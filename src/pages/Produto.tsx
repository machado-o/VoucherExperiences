import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Zap, Users, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import { experiences, categories } from "@/data/experiences";
import catAventureiro from "@/assets/cat-aventureiro.jpg";
import catGourmet from "@/assets/cat-gourmet.jpg";
import catRelaxamento from "@/assets/cat-relaxamento.jpg";
import catCriativo from "@/assets/cat-criativo.jpg";

const categoryImages: Record<string, string> = {
  aventureiro: catAventureiro,
  gourmet: catGourmet,
  relaxamento: catRelaxamento,
  criativo: catCriativo,
};

export default function Produto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = experiences.find((e) => e.id === id);

  if (!experience) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Experiência não encontrada</h1>
            <Link to="/catalogo" className="text-primary hover:underline">Voltar ao catálogo</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const img = experience.image || categoryImages[experience.category];
  const sameCategory = experiences.filter((e) => e.category === experience.category && e.id !== experience.id).slice(0, 2);
  const crossCategory = experiences.filter((e) => e.category !== experience.category).slice(0, 2);
  const related = [...sameCategory, ...crossCategory];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-6">
        <div className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link> ›{" "}
          <Link to="/catalogo" className="hover:text-primary">Catálogo</Link> ›{" "}
          <Link to={`/catalogo?categoria=${experience.category}`} className="hover:text-primary">{categories[experience.category].label}</Link> ›{" "}
          <span className="text-foreground">{experience.name}</span>
        </div>

        <Link to="/catalogo" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl overflow-hidden">
            <img src={img} alt={experience.name} className="w-full h-full object-cover max-h-[400px] rounded-xl" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-primary bg-accent px-2.5 py-1 rounded-full">{categories[experience.category].label}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{experience.city}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif">{experience.name}</h1>

            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="font-medium">{experience.rating}</span>
              <span className="text-sm text-muted-foreground">({experience.reviews} avaliações)</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-serif text-primary">R$ {experience.price.toFixed(0)}</span>
              <span className="text-sm text-muted-foreground">Validade: {experience.validity} meses</span>
            </div>

            <button
              onClick={() => navigate(`/checkout/${experience.id}`)}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-terracotta-dark transition-colors w-full md:w-auto"
            >
              Comprar Voucher
            </button>

            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="bg-secondary rounded-lg p-3 text-center">
                <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">Entrega Instantânea</span>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-center">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">{experience.validity} meses</span>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-center">
                <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">{experience.people} pessoa(s)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SOBRE + INCLUI */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-serif text-xl mb-4">Sobre a Experiência</h2>
            <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-serif text-xl mb-4">O que está Incluso</h2>
            <ul className="space-y-3">
              {experience.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RELACIONADAS */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6">Você Também Pode Gostar</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
