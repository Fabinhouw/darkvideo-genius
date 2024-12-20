import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { UserPlan } from "@/lib/supabase";
import { toast } from "sonner";

const planFeatures: Record<UserPlan, string[]> = {
  FREE: [],
  PLUS: ["Remover marca d'água", "Exportação em HD"],
  PRO: [
    "Remover marca d'água",
    "Exportação em 4K",
    "Recursos de IA avançados",
    "Efeitos profissionais",
    "Transições personalizadas"
  ],
  DEV: [
    "Remover marca d'água",
    "Exportação em 4K",
    "Recursos de IA avançados",
    "Efeitos profissionais",
    "Transições personalizadas",
    "API access",
    "Suporte prioritário"
  ]
};

export function AdvancedOptions() {
  const { user } = useAuth();
  const [videoLength, setVideoLength] = useState([60]);
  const [quality, setQuality] = useState([720]);
  const [aiEnhancement, setAiEnhancement] = useState(false);
  const [removeWatermark, setRemoveWatermark] = useState(false);

  const userPlan = user?.plan || "FREE";
  const availableFeatures = planFeatures[userPlan];

  const handleFeatureClick = (feature: string) => {
    if (!availableFeatures.includes(feature)) {
      toast.error("Faça upgrade do seu plano para acessar este recurso");
    }
  };

  const isFeatureAvailable = (feature: string) => {
    // DEV tem acesso a tudo
    if (userPlan === "DEV") return true;
    return availableFeatures.includes(feature);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Configurações avançadas">
          <Settings2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Opções Avançadas</DialogTitle>
          <DialogDescription>
            Configure as opções avançadas para seu vídeo. Algumas opções podem requerer um plano superior.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="video" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="video">Vídeo</TabsTrigger>
            <TabsTrigger value="audio">Áudio</TabsTrigger>
            <TabsTrigger value="effects">Efeitos</TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Duração do Vídeo (segundos)</Label>
                <Slider
                  value={videoLength}
                  onValueChange={setVideoLength}
                  max={isFeatureAvailable("Vídeos longos") ? 300 : 60}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">
                  {videoLength}s
                </span>
              </div>

              <div className="space-y-2">
                <Label>Qualidade de Exportação</Label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  min={480}
                  max={isFeatureAvailable("Exportação em 4K") ? 2160 : 720}
                  step={240}
                />
                <span className="text-sm text-muted-foreground">
                  {quality}p {quality >= 2160 ? "(4K)" : quality >= 1080 ? "(Full HD)" : "(HD)"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <Label>Remover Marca d'água</Label>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("Remover marca d'água") && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Switch
                    checked={removeWatermark}
                    onCheckedChange={setRemoveWatermark}
                    disabled={!isFeatureAvailable("Remover marca d'água")}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Redução de Ruído AI</Label>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("Recursos de IA avançados") && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Switch
                    checked={aiEnhancement}
                    onCheckedChange={setAiEnhancement}
                    disabled={!isFeatureAvailable("Recursos de IA avançados")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Mixagem de Áudio Automática</Label>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("Recursos de IA avançados") && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Switch
                    disabled={!isFeatureAvailable("Recursos de IA avançados")}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Correção de Cor AI</Label>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("Recursos de IA avançados") && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Switch
                    disabled={!isFeatureAvailable("Recursos de IA avançados")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Transições Inteligentes</Label>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("Transições personalizadas") && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Switch
                    disabled={!isFeatureAvailable("Transições personalizadas")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Efeitos Profissionais</Label>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("Efeitos profissionais") && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Switch
                    disabled={!isFeatureAvailable("Efeitos profissionais")}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
