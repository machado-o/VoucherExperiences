import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Gift, User, CreditCard, CheckCircle, Mail, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { experiences, categories } from "@/data/experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
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

type RecipientType = "outro" | "eu";
type PaymentMethod = "pix" | "cartao" | "boleto";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = experiences.find((e) => e.id === id);

  const [recipientType, setRecipientType] = useState<RecipientType>("outro");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [step, setStep] = useState(1);

  // Form state
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [giftMessage, setGiftMessage] = useState("");

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

  const canAdvanceStep1 = buyerName && buyerEmail && buyerPhone &&
    (recipientType === "eu" || (recipientName && recipientEmail));

  const handleFinalize = () => {
    toast.success("Pedido realizado com sucesso! 🎉", {
      description: "Você receberá os detalhes do voucher por e-mail.",
    });
    setTimeout(() => navigate("/minha-conta"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-6 flex-1">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link> ›{" "}
          <Link to="/catalogo" className="hover:text-primary">Catálogo</Link> ›{" "}
          <Link to={`/experiencia/${experience.id}`} className="hover:text-primary">{experience.name}</Link> ›{" "}
          <span className="text-foreground">Checkout</span>
        </div>

        <Link to={`/experiencia/${experience.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar à experiência
        </Link>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              <span className={`text-sm hidden sm:inline ${step >= s ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {s === 1 ? "Destinatário" : s === 2 ? "Pagamento" : "Confirmação"}
              </span>
              {s < 3 && <div className={`w-8 h-px ${step > s ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Buyer info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-serif">
                      <User className="w-5 h-5 text-primary" /> Seus Dados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="buyerName">Nome completo</Label>
                      <Input id="buyerName" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Seu nome" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="buyerEmail">E-mail</Label>
                        <Input id="buyerEmail" type="email" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} placeholder="seu@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="buyerPhone">Telefone</Label>
                        <Input id="buyerPhone" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} placeholder="(11) 99999-9999" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recipient */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-serif">
                      <Gift className="w-5 h-5 text-primary" /> Para quem é o presente?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={recipientType} onValueChange={(v) => setRecipientType(v as RecipientType)} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outro" id="outro" />
                        <Label htmlFor="outro" className="cursor-pointer">Para outra pessoa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="eu" id="eu" />
                        <Label htmlFor="eu" className="cursor-pointer">Para mim mesmo</Label>
                      </div>
                    </RadioGroup>

                    {recipientType === "outro" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                        <div>
                          <Label htmlFor="recipientName">Nome do presenteado</Label>
                          <Input id="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Nome de quem vai receber" />
                        </div>
                        <div>
                          <Label htmlFor="recipientEmail">E-mail do presenteado</Label>
                          <Input id="recipientEmail" type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="email@presenteado.com" />
                        </div>
                        <div>
                          <Label htmlFor="giftMessage" className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> Mensagem de presente (opcional)
                          </Label>
                          <Textarea
                            id="giftMessage"
                            value={giftMessage}
                            onChange={(e) => setGiftMessage(e.target.value)}
                            placeholder="Escreva uma mensagem especial para o presenteado..."
                            rows={3}
                          />
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                <Button onClick={() => setStep(2)} disabled={!canAdvanceStep1} className="w-full py-6 text-lg">
                  Continuar para Pagamento
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-serif">
                      <CreditCard className="w-5 h-5 text-primary" /> Forma de Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)} className="space-y-3">
                      <label htmlFor="pix" className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === "pix" ? "border-primary bg-accent" : "border-border hover:border-primary/50"}`}>
                        <RadioGroupItem value="pix" id="pix" />
                        <div className="flex-1">
                          <span className="font-medium">Pix</span>
                          <p className="text-sm text-muted-foreground">Aprovação instantânea · Sem taxas</p>
                        </div>
                        <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">Recomendado</span>
                      </label>
                      <label htmlFor="cartao" className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === "cartao" ? "border-primary bg-accent" : "border-border hover:border-primary/50"}`}>
                        <RadioGroupItem value="cartao" id="cartao" />
                        <div className="flex-1">
                          <span className="font-medium">Cartão de Crédito</span>
                          <p className="text-sm text-muted-foreground">Parcele em até 3x sem juros</p>
                        </div>
                      </label>
                      <label htmlFor="boleto" className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === "boleto" ? "border-primary bg-accent" : "border-border hover:border-primary/50"}`}>
                        <RadioGroupItem value="boleto" id="boleto" />
                        <div className="flex-1">
                          <span className="font-medium">Boleto Bancário</span>
                          <p className="text-sm text-muted-foreground">Aprovação em até 2 dias úteis</p>
                        </div>
                      </label>
                    </RadioGroup>

                    {paymentMethod === "cartao" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4 border-t border-border">
                        <div>
                          <Label>Número do cartão</Label>
                          <Input placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Validade</Label>
                            <Input placeholder="MM/AA" />
                          </div>
                          <div>
                            <Label>CVV</Label>
                            <Input placeholder="000" />
                          </div>
                        </div>
                        <div>
                          <Label>Nome no cartão</Label>
                          <Input placeholder="Como impresso no cartão" />
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 py-6">
                    Voltar
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-[2] py-6 text-lg">
                    Revisar Pedido
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-serif">
                      <CheckCircle className="w-5 h-5 text-primary" /> Resumo do Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Comprador</h3>
                        <p className="font-medium">{buyerName}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {buyerEmail}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> {buyerPhone}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Presenteado</h3>
                        {recipientType === "eu" ? (
                          <p className="font-medium">Para mim mesmo</p>
                        ) : (
                          <>
                            <p className="font-medium">{recipientName}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {recipientEmail}</p>
                            {giftMessage && (
                              <p className="text-sm text-muted-foreground italic mt-2">"{giftMessage}"</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Pagamento</h3>
                      <p className="font-medium">
                        {paymentMethod === "pix" ? "Pix" : paymentMethod === "cartao" ? "Cartão de Crédito" : "Boleto Bancário"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 py-6">
                    Voltar
                  </Button>
                  <Button onClick={handleFinalize} className="flex-[2] py-6 text-lg">
                    Finalizar Compra · R$ {experience.price.toFixed(0)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex gap-3">
                    <img src={img} alt={experience.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-primary font-medium">{categories[experience.category].label}</span>
                      <h3 className="font-serif text-sm leading-tight">{experience.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{experience.city} · {experience.people} pessoa(s)</p>
                    </div>
                  </div>
                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Voucher</span>
                      <span>R$ {experience.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxa</span>
                      <span className="text-primary">Grátis</span>
                    </div>
                    <div className="flex justify-between font-serif text-lg pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-primary">R$ {experience.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Validade do voucher: <strong>{experience.validity} meses</strong></p>
                    <p className="text-xs text-muted-foreground mt-1">Entrega digital instantânea por e-mail</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
