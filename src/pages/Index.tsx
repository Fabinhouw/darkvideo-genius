import { ArrowRight, Video, Wand2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Crie Vídeos Incríveis com IA
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transforme suas ideias em vídeos profissionais em minutos.
              Sem necessidade de experiência prévia.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="text-lg w-full sm:w-auto" 
                onClick={() => navigate(user ? "/editor" : "/register")}
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {!user && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg w-full sm:w-auto" 
                  onClick={() => navigate("/demo")}
                >
                  Ver Demonstração
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-accent">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Por que escolher o DarkVideo?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Edição Simplificada</h3>
                <p className="text-muted-foreground">
                  Interface intuitiva que torna a edição de vídeos acessível a todos.
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Wand2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Poder da IA</h3>
                <p className="text-muted-foreground">
                  Recursos avançados de IA para aprimorar seus vídeos automaticamente.
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rápido e Eficiente</h3>
                <p className="text-muted-foreground">
                  Exporte seus vídeos em minutos, não horas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;