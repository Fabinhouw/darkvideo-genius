import Header from "@/components/Header";
import { Check, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: "FREE",
      name: "Free",
      price: "Grátis",
      features: [
        "5 vídeos por mês",
        "Exportação em 720p",
        "Templates básicos",
        "Com marca d'água",
        "Suporte por email"
      ]
    },
    {
      id: "PLUS",
      name: "Plus",
      price: "R$ 29,90/mês",
      features: [
        "20 vídeos por mês",
        "Exportação em 1080p",
        "Mais templates",
        "Sem marca d'água",
        "Suporte prioritário"
      ]
    },
    {
      id: "PRO",
      name: "Pro",
      price: "R$ 59,90/mês",
      features: [
        "100 vídeos por mês",
        "Exportação em 4K",
        "Todos os templates",
        "Recursos de IA avançados",
        "Efeitos profissionais",
        "Suporte VIP"
      ]
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate("/register");
      return;
    }

    setIsLoading(true);
    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Registrar assinatura
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan: planId,
          price_paid: planId === 'PLUS' ? 29.90 : planId === 'PRO' ? 59.90 : 0,
          ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
          payment_method: 'card',
          payment_id: 'sim_' + Math.random().toString(36).substr(2, 9)
        });

      if (error) throw error;

      toast.success('Assinatura realizada com sucesso!');
      navigate('/editor');
    } catch (error) {
      toast.error('Erro ao processar assinatura. Tente novamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-4xl font-bold text-center mb-4">Planos e Preços</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Escolha o plano ideal para suas necessidades. Cancele a qualquer momento.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-card rounded-lg p-6 shadow-lg border border-border relative
                ${plan.id === 'PRO' ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.id === 'PRO' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full rounded-md py-2 transition
                  ${plan.id === 'FREE' 
                    ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading}
              >
                {isLoading ? 'Processando...' : plan.id === 'FREE' ? 'Começar Grátis' : 'Assinar Agora'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Precisa de mais? Entre em contato para um plano personalizado.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
