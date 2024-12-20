import { useState } from "react";
import { Loader2, Video, Download, Wand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";

const Editor = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor, descreva o vídeo que você quer gerar");
      return;
    }

    setIsGenerating(true);
    setVideoUrl(null);

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar o vídeo");
      }

      const data = await response.json();
      setVideoUrl(data.videoUrl);
      toast.success("Vídeo gerado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar o vídeo. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-6xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-blue-400">
              Gerador de Vídeos
            </h1>
            <p className="text-xl text-muted-foreground">
              Transforme suas ideias em vídeos incríveis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Painel Esquerdo - Input */}
            <Card className="p-6 space-y-4 bg-[#1a1b26] border-[#2a2b36]">
              <h2 className="text-xl font-semibold">Descreva seu vídeo</h2>
              <Textarea
                placeholder="Ex: Um vídeo mostrando um produto tecnológico com efeitos futuristas..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32 resize-none bg-[#13141c] border-[#2a2b36]"
              />
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Wand className="w-4 h-4 mr-2" />
                      Gerar Vídeo
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" className="border-[#2a2b36]">
                  <Wand className="w-4 h-4" />
                </Button>
              </div>

              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-4">Templates</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-[#1a1b26] border-[#2a2b36] hover:border-purple-600 cursor-pointer transition-colors">
                    <h3 className="font-medium">Apresentação de Produto</h3>
                    <p className="text-sm text-muted-foreground">Moderno</p>
                  </Card>
                  <Card className="p-4 bg-[#1a1b26] border-[#2a2b36] hover:border-purple-600 cursor-pointer transition-colors">
                    <h3 className="font-medium">Vídeo Explicativo</h3>
                    <p className="text-sm text-muted-foreground">Minimalista</p>
                  </Card>
                  <Card className="p-4 bg-[#1a1b26] border-[#2a2b36] hover:border-purple-600 cursor-pointer transition-colors">
                    <h3 className="font-medium">Promocional</h3>
                    <p className="text-sm text-muted-foreground">Dinâmico</p>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Painel Direito - Preview */}
            <Card className="p-6 space-y-4 bg-[#1a1b26] border-[#2a2b36]">
              <h2 className="text-xl font-semibold">Seu Vídeo</h2>
              <div className="aspect-video rounded-lg overflow-hidden bg-[#13141c] flex items-center justify-center">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  >
                    Seu navegador não suporta a tag de vídeo.
                  </video>
                ) : (
                  <p className="text-muted-foreground">
                    A pré-visualização do vídeo aparecerá aqui
                  </p>
                )}
              </div>
              <Button 
                className="w-full bg-teal-600 hover:bg-teal-700"
                size="lg"
                onClick={() => videoUrl && window.open(videoUrl, "_blank")}
                disabled={!videoUrl}
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar Vídeo
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
