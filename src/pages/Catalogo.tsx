import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import { experiences, categories, type Category } from "@/data/experiences";

const cities = [...new Set(experiences.map((e) => e.city))];

export default function Catalogo() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("categoria") as Category | null;

  const [search, setSearch] = useState("");
  const [selectedCats, setSelectedCats] = useState<Category[]>(initialCat ? [initialCat] : []);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc">("relevance");

  const toggleCat = (cat: Category) => {
    setSelectedCats((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const filtered = useMemo(() => {
    let result = experiences.filter((e) => {
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.city.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCats.length > 0 && !selectedCats.includes(e.category)) return false;
      if (selectedCity && e.city !== selectedCity) return false;
      return true;
    });
    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [search, selectedCats, selectedCity, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-6">
        <div className="text-sm text-muted-foreground mb-4">
          Home › Catálogo
        </div>

        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h1 className="text-3xl font-serif">Todas as Experiências</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Busca por nome ou cidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          {/* FILTROS */}
          <aside className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Categoria</h3>
              <div className="space-y-2">
                {(Object.keys(categories) as Category[]).map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCats.includes(cat)}
                      onChange={() => toggleCat(cat)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    {categories[cat].label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Cidade</h3>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Todas</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Ordenar</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="relevance">Relevância</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>
          </aside>

          {/* GRID */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} resultados encontrados</p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Nenhuma experiência encontrada com os filtros selecionados.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
