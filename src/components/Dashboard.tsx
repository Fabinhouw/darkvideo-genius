import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VideoPreview from "./VideoPreview";
import TemplateSelector from "./TemplateSelector";
import { Settings2, Play, Download } from "lucide-react";

const Dashboard = () => {
  const [prompt, setPrompt] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Floating Particles */}
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
            Gerador de Vídeos Dark
          </h1>
          <p className="text-muted-foreground">
            Crie vídeos impressionantes apenas com comandos de texto
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 space-y-6 bg-card/50 backdrop-blur">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Prompt do Vídeo</h2>
              <Textarea
                placeholder="Descreva seu conceito de vídeo..."
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
                      <Play className="w-4 h-4 mr-2" /> Gerar
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Settings2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <TemplateSelector />
          </Card>

          <Card className="p-6 space-y-6 bg-card/50 backdrop-blur">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Pré-visualização</h2>
              <VideoPreview />
              <Button variant="secondary" className="w-full">
                <Download className="w-4 h-4 mr-2" /> Exportar Vídeo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;