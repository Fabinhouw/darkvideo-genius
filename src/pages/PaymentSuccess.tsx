import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    toast.success('Plano atualizado com sucesso!');
    
    // Contagem regressiva
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/editor');
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-xl shadow-lg border border-border">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">Plano Atualizado!</h1>
          <p className="text-center text-muted-foreground mb-6">
            Seu plano foi atualizado com sucesso.
          </p>
          
          <p className="text-center text-sm text-muted-foreground">
            Redirecionando em {countdown} segundos...
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
