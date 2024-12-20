import Header from "@/components/Header";
import { PlayCircle } from "lucide-react";

const tutorials = [
  {
    id: 1,
    title: "Edição Básica de Vídeo",
    description: "Aprenda os fundamentos da edição de vídeo",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Efeitos Especiais",
    description: "Crie efeitos visuais impressionantes",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Correção de Cor",
    description: "Técnicas profissionais de color grading",
    image: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Áudio Profissional",
    description: "Edição e mixagem de áudio para vídeos",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    title: "Motion Graphics",
    description: "Criando animações e títulos",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    title: "Storytelling em Vídeo",
    description: "A arte de contar histórias em vídeo",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60"
  }
];

const Tutorials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-4xl font-bold mb-8">Tutoriais</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-card rounded-lg overflow-hidden shadow-lg border border-border group">
              <div className="relative">
                <div 
                  className="aspect-video bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${tutorial.image})` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-16 h-16 text-white hover:text-primary cursor-pointer" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-muted-foreground">
                  {tutorial.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
