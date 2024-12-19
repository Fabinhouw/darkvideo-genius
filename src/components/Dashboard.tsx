import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import VideoPreview from "./VideoPreview";
import TemplateSelector from "./TemplateSelector";
import { Play, Download, Settings2 } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [prompt, setPrompt] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor, descreva seu vídeo primeiro");
      return;
    }

    setIsGenerating(true);
    try {
      // Simulação da geração do vídeo
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Vídeo gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar o vídeo. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Partículas flutuantes para efeito visual */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Gerador de Vídeos
          </h1>
          <p className="text-muted-foreground">
            Transforme suas ideias em vídeos incríveis
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 space-y-6 bg-card/50 backdrop-blur">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Descreva seu vídeo</h2>
              <Textarea
                placeholder="Ex: Um vídeo mostrando um produto tecnológico com efeitos futuristas..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32 bg-background/50"
              />
              <div className="flex gap-4">
                <Button
                  onClick={handleGenerate}
                  className="flex-1"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    "Gerando..."
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" /> Gerar Vídeo
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" title="Configurações avançadas">
                  <Settings2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <TemplateSelector />
          </Card>

          <Card className="p-6 space-y-6 bg-card/50 backdrop-blur">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Seu Vídeo</h2>
              <VideoPreview />
              <Button variant="secondary" className="w-full" disabled={!isGenerating}>
                <Download className="w-4 h-4 mr-2" /> Baixar Vídeo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;