import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ArrowRight,
  Crown,
  Zap,
  Badge as BadgeIcon,
  Bell,
  Mail,
  Shield,
  Trash,
  AlertTriangle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const planFeatures = {
  FREE: {
    title: "Plano Gratuito",
    description: "Acesso básico às funcionalidades",
    icon: null,
    features: ["1 vídeo por dia", "720p máximo", "Sem marca d'água"],
    color: "text-gray-500"
  },
  PLUS: {
    title: "Plano Plus",
    description: "Para criadores de conteúdo",
    icon: <Zap className="w-4 h-4 text-yellow-500" />,
    features: ["10 vídeos por dia", "1080p máximo", "Sem marca d'água", "Prioridade no processamento"],
    color: "text-yellow-500"
  },
  PRO: {
    title: "Plano Pro",
    description: "Para profissionais",
    icon: <Crown className="w-4 h-4 text-purple-500" />,
    features: ["Vídeos ilimitados", "4K máximo", "Sem marca d'água", "Prioridade máxima", "Suporte prioritário"],
    color: "text-purple-500"
  },
  DEV: {
    title: "Plano Desenvolvedor",
    description: "Acesso completo",
    icon: <BadgeIcon className="w-4 h-4 text-blue-500" />,
    features: ["Todas as funcionalidades", "Sem limitações", "Acesso antecipado", "Suporte direto"],
    color: "text-blue-500"
  },
};

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
    marketing: false
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const currentPlan = planFeatures[user.plan as keyof typeof planFeatures];

  const handleCancelSubscription = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Cancelando assinatura...',
        success: 'Assinatura cancelada com sucesso!',
        error: 'Erro ao cancelar assinatura.',
      }
    );
  };

  const handleDeleteAccount = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Deletando conta...',
        success: 'Conta deletada com sucesso!',
        error: 'Erro ao deletar conta.',
      }
    );
    setShowDeleteDialog(false);
  };

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificação salvas!');
  };

  return (
    <div className="container max-w-6xl py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/editor")}
          className="rounded-full"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
        </Button>
        <div className="flex items-center justify-between flex-1">
          <h1 className="text-3xl font-bold">Configurações</h1>
          <Badge variant="outline" className={currentPlan.color}>
            {currentPlan.title}
          </Badge>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Seção do Plano */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Seu Plano
                  {currentPlan.icon}
                </CardTitle>
                <CardDescription>Gerencie sua assinatura</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Recursos do seu plano:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {currentPlan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              {user.plan !== 'DEV' && (
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={() => navigate("/pricing")}
                    className="w-full sm:w-auto"
                  >
                    Mudar Plano
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  {user.plan !== 'FREE' && (
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto text-destructive hover:text-destructive"
                      onClick={handleCancelSubscription}
                    >
                      Cancelar Assinatura
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Seção de Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notificações
            </CardTitle>
            <CardDescription>Gerencie suas preferências de notificação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações por Email</Label>
                <div className="text-sm text-muted-foreground">
                  Receba atualizações sobre seus vídeos
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações Push</Label>
                <div className="text-sm text-muted-foreground">
                  Receba notificações no navegador
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Atualizações do Sistema</Label>
                <div className="text-sm text-muted-foreground">
                  Seja notificado sobre novas funcionalidades
                </div>
              </div>
              <Switch
                checked={notifications.updates}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, updates: checked }))}
              />
            </div>
            <Button onClick={handleSaveNotifications} className="w-full mt-4">
              Salvar Preferências
            </Button>
          </CardContent>
        </Card>

        {/* Seção de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Segurança
            </CardTitle>
            <CardDescription>Gerencie a segurança da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-4 mt-1">
                <Input id="email" value={user.email} disabled />
                <Button variant="outline">Alterar</Button>
              </div>
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="flex gap-4 mt-1">
                <Input id="password" type="password" value="••••••••" disabled />
                <Button variant="outline">Alterar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Conta */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash className="w-4 h-4" />
              Zona Perigosa
            </CardTitle>
            <CardDescription>Ações irreversíveis para sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Deletar Conta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    Deletar Conta
                  </DialogTitle>
                  <DialogDescription>
                    Esta ação não pode ser desfeita. Isso irá deletar permanentemente sua conta
                    e remover seus dados dos nossos servidores.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Label htmlFor="confirm">Digite "DELETAR" para confirmar</Label>
                  <Input id="confirm" placeholder="DELETAR" />
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Deletar Conta
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
