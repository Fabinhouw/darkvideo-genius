import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Scissors,
  Wand2,
  Type,
  Music,
  Download
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

const Demo = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);

  const demoVideo = "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&auto=format&fit=crop&q=60";

  const features = [
    {
      id: "edit",
      title: "Edição Básica",
      tools: [
        { icon: <Scissors className="w-5 h-5" />, name: "Cortar" },
        { icon: <SkipForward className="w-5 h-5" />, name: "Pular" },
        { icon: <Type className="w-5 h-5" />, name: "Texto" },
        { icon: <Music className="w-5 h-5" />, name: "Áudio" }
      ]
    },
    {
      id: "effects",
      title: "Efeitos",
      tools: [
        { icon: <Wand2 className="w-5 h-5" />, name: "Filtros" },
        { icon: <Type className="w-5 h-5" />, name: "Transições" },
        { icon: <Music className="w-5 h-5" />, name: "Efeitos Sonoros" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto pt-24 px-4 pb-16">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Experimente o DarkVideo
        </h1>
        
        {/* Video Preview */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {/* Video Placeholder */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${demoVideo})` }}
            />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <Slider
                value={[currentTime]}
                max={100}
                step={1}
                className="mb-4"
                onValueChange={(value) => setCurrentTime(value[0])}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-primary"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-primary"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      className="w-24"
                      onValueChange={(value) => setVolume(value[0])}
                    />
                  </div>
                </div>
                
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Editing Tools */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              {features.map((feature) => (
                <TabsTrigger key={feature.id} value={feature.id}>
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {features.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {feature.tools.map((tool, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center space-y-2"
                    >
                      {tool.icon}
                      <span>{tool.name}</span>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Gostou do que viu?
          </h2>
          <p className="text-muted-foreground mb-6">
            Registre-se agora e comece a criar vídeos incríveis em minutos.
          </p>
          <Button size="lg" className="text-lg" onClick={() => navigate("/register")}>
            Criar Conta Grátis
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Demo;
