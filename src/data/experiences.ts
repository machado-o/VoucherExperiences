export type Category = "aventureiro" | "gourmet" | "relaxamento" | "criativo";

export interface Experience {
  id: string;
  name: string;
  category: Category;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  validity: 3 | 6;
  people: number;
  image: string;
  description: string;
  includes: string[];
}

export const categories: Record<Category, { label: string; description: string; emoji: string }> = {
  aventureiro: {
    label: "Aventureiro",
    description: "Para quem busca adrenalina e contato com a natureza. Trilhas, surfe, rapel e muito mais.",
    emoji: "🏔️",
  },
  gourmet: {
    label: "Gourmet",
    description: "Experiências gastronômicas únicas. Jantares às cegas, aulas de culinária e degustações.",
    emoji: "🍷",
  },
  relaxamento: {
    label: "Relaxamento",
    description: "Momentos de paz e autocuidado. Spas, massagens, retiros e meditação guiada.",
    emoji: "🧘",
  },
  criativo: {
    label: "Criativo",
    description: "Desperte o artista interior. Cerâmica, pintura, fotografia e workshops criativos.",
    emoji: "🎨",
  },
};

export const experiences: Experience[] = [
  {
    id: "jantar-as-cegas",
    name: "Jantar às Cegas",
    category: "gourmet",
    city: "São Paulo",
    price: 289,
    rating: 4.8,
    reviews: 124,
    validity: 6,
    people: 2,
    image: "",
    description: "Uma experiência gastronômica única onde todos os seus sentidos são aguçados. Vendado, você será guiado por um menu de 5 etapas preparado por um chef renomado, descobrindo sabores e texturas de maneira completamente nova.",
    includes: ["Menu degustação 5 etapas", "Harmonização com vinhos", "Experiência para 2 pessoas", "Duração: ~2h30"],
  },
  {
    id: "trilha-guiada-tijuca",
    name: "Trilha Guiada na Tijuca",
    category: "aventureiro",
    city: "Rio de Janeiro",
    price: 159,
    rating: 4.9,
    reviews: 87,
    validity: 3,
    people: 1,
    image: "",
    description: "Explore a maior floresta urbana do mundo com guias especializados. Percorra trilhas incríveis com vistas panorâmicas da cidade, cachoeiras e uma biodiversidade exuberante.",
    includes: ["Guia especializado", "Lanche trail", "Seguro aventura", "Duração: ~4h"],
  },
  {
    id: "spa-day-premium",
    name: "Spa Day Premium",
    category: "relaxamento",
    city: "São Paulo",
    price: 420,
    rating: 4.7,
    reviews: 203,
    validity: 6,
    people: 1,
    image: "",
    description: "Um dia inteiro de relaxamento e renovação em um dos melhores spas da cidade. Inclui acesso a todas as instalações, massagem relaxante e tratamento facial.",
    includes: ["Massagem relaxante 60min", "Tratamento facial", "Acesso à sauna e piscina", "Almoço leve incluso"],
  },
  {
    id: "oficina-ceramica",
    name: "Oficina de Cerâmica",
    category: "criativo",
    city: "Curitiba",
    price: 189,
    rating: 4.6,
    reviews: 56,
    validity: 3,
    people: 1,
    image: "",
    description: "Aprenda a arte da cerâmica com artistas locais. Modele, decore e leve para casa sua própria peça única, criada com suas mãos.",
    includes: ["Material incluso", "Instrução personalizada", "Peça para levar para casa", "Duração: ~3h"],
  },
  {
    id: "aula-culinaria-italiana",
    name: "Aula de Culinária Italiana",
    category: "gourmet",
    city: "São Paulo",
    price: 249,
    rating: 4.9,
    reviews: 145,
    validity: 6,
    people: 1,
    image: "",
    description: "Aprenda a preparar massas frescas e molhos autênticos com um chef italiano. Uma experiência interativa e deliciosa que vai transformar sua cozinha.",
    includes: ["Ingredientes premium", "Receitas para levar", "Degustação completa", "Duração: ~3h"],
  },
  {
    id: "aula-surfe",
    name: "Aula de Surfe",
    category: "aventureiro",
    city: "Florianópolis",
    price: 129,
    rating: 4.8,
    reviews: 92,
    validity: 3,
    people: 1,
    image: "",
    description: "Pegue sua primeira onda com instrutores experientes nas praias mais bonitas de Floripa. Perfeito para iniciantes e intermediários.",
    includes: ["Prancha e roupa de neoprene", "Instrutor certificado", "Fotos da aula", "Duração: ~2h"],
  },
  {
    id: "retiro-meditacao",
    name: "Retiro de Meditação",
    category: "relaxamento",
    city: "Campos do Jordão",
    price: 350,
    rating: 4.5,
    reviews: 38,
    validity: 6,
    people: 1,
    image: "",
    description: "Um dia de desconexão total em meio à natureza da Serra da Mantiqueira. Meditação guiada, yoga e alimentação consciente.",
    includes: ["Meditação guiada", "Aula de yoga", "Almoço vegetariano", "Duração: dia inteiro"],
  },
  {
    id: "workshop-fotografia",
    name: "Workshop de Fotografia",
    category: "criativo",
    city: "Rio de Janeiro",
    price: 210,
    rating: 4.7,
    reviews: 67,
    validity: 3,
    people: 1,
    image: "",
    description: "Aprenda técnicas de fotografia urbana explorando os cenários mais icônicos do Rio. Do básico ao avançado, com feedback personalizado.",
    includes: ["Roteiro fotográfico", "Feedback individual", "Material digital", "Duração: ~4h"],
  },
];
