import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus, Video, Clock, Star } from "lucide-react";

const recentProjects = [
  {
    id: 1,
    title: "Vídeo de Marketing",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60",
    duration: "2:30",
    lastEdited: "Há 2 horas"
  },
  {
    id: 2,
    title: "Tutorial Tech",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    duration: "5:45",
    lastEdited: "Há 1 dia"
  },
  {
    id: 3,
    title: "Vlog Diário",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60",
    duration: "8:20",
    lastEdited: "Há 2 dias"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto pt-24 px-4 pb-16">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Bem-vindo de volta!</h1>
            <p className="text-muted-foreground">
              Continue de onde parou ou comece um novo projeto.
            </p>
          </div>
          <Button size="lg" className="text-lg">
            <Plus className="mr-2 h-5 w-5" />
            Novo Projeto
          </Button>
        </div>

        {/* Recent Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Projetos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-lg overflow-hidden border border-border group cursor-pointer hover:border-primary transition-colors"
              >
                <div className="relative">
                  <div 
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.thumbnail})` }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                    {project.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{project.lastEdited}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* New Project Card */}
            <div className="bg-card rounded-lg border border-dashed border-border hover:border-primary transition-colors p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium">Criar Novo Projeto</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
              <Video className="w-6 h-6" />
              <span>Importar Vídeo</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
              <Star className="w-6 h-6" />
              <span>Templates em Destaque</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
              <Clock className="w-6 h-6" />
              <span>Continuar Último Projeto</span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
