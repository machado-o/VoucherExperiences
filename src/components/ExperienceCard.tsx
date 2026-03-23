import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import { type Experience, categories } from "@/data/experiences";
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

export default function ExperienceCard({ experience }: { experience: Experience }) {
  const img = experience.image || categoryImages[experience.category];

  return (
    <Link
      to={`/experiencia/${experience.id}`}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={experience.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-primary bg-accent px-2 py-0.5 rounded-full">
            {categories[experience.category].label}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {experience.city}
          </span>
        </div>
        <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {experience.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">
            R$ {experience.price.toFixed(0)}
          </span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            {experience.rating}
            <span className="text-xs">({experience.reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          Validade: {experience.validity} meses
        </div>
      </div>
    </Link>
  );
}
