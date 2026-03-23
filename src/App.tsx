import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import ComoFunciona from "./pages/ComoFunciona";
import Categorias from "./pages/Categorias";
import Catalogo from "./pages/Catalogo";
import Produto from "./pages/Produto";
import Checkout from "./pages/Checkout";
import Parceiros from "./pages/Parceiros";
import MinhaConta from "./pages/MinhaConta";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/VoucherExperiences">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/experiencia/:id" element={<Produto />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
