import Header from "@/components/Header";
import { Check, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const PLANS = {
  FREE: {
    id: 'FREE',
    name: 'Grátis',
    description: 'Para usuários iniciantes',
    price: 'R$ 0',
    period: '/mês',
    features: [
      'Até 5 vídeos por mês',
      'Resolução 720p',
      'Suporte básico'
    ]
  },
  PLUS: {
    id: 'PLUS',
    name: 'Plus',
    description: 'Para criadores de conteúdo',
    price: 'R$ 29,90',
    period: '/mês',
    features: [
      'Até 50 vídeos por mês',
      'Resolução 1080p',
      'Suporte prioritário',
      'Sem marca d\'água'
    ]
  },
  PRO: {
    id: 'PRO',
    name: 'Pro',
    description: 'Para profissionais',
    price: 'R$ 59,90',
    period: '/mês',
    features: [
      'Vídeos ilimitados',
      'Resolução 4K',
      'Suporte 24/7',
      'Sem marca d\'água',
      'API access'
    ]
  }
};

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate("/register");
      return;
    }

    setIsLoading(true);
    try {
      // Aqui você pode implementar sua própria lógica de assinatura
      // Por exemplo, atualizando o plano no seu backend
      toast.success('Plano atualizado com sucesso!');
      navigate('/editor');
    } catch (error) {
      toast.error('Erro ao atualizar o plano. Tente novamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Escolha seu plano
          </h1>
          <p className="text-xl text-muted-foreground">
            Comece gratuitamente e faça upgrade conforme necessário
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Object.values(PLANS).map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border p-8 shadow-lg transition-all duration-300 hover:shadow-xl
                ${plan.id === 'PRO' ? 'border-primary bg-accent/5' : 'bg-card/50'}
              `}
            >
              {plan.id === 'PRO' && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="bg-primary text-primary-foreground text-sm px-4 py-1.5 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <Button
                  className="w-full"
                  variant={plan.id === 'PRO' ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processando...' : 
                    plan.id === 'FREE' ? 'Começar Grátis' : 'Assinar Agora'}
                </Button>

                <div className="space-y-3">
                  <p className="text-sm font-medium">O que está incluído:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Precisa de mais recursos?{" "}
            <a href="#" className="text-primary hover:underline">
              Entre em contato para um plano personalizado
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
