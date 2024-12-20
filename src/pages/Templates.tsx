import Header from "@/components/Header";

const templates = [
  {
    id: 1,
    title: "Vlog Moderno",
    description: "Template perfeito para vlogs diários",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Tutorial Profissional",
    description: "Ideal para tutoriais e aulas",
    image: "https://images.unsplash.com/photo-1590682687547-6b70726324c9?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Gaming Stream",
    description: "Template otimizado para gameplay",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Review de Produto",
    description: "Perfeito para reviews e unboxing",
    image: "https://images.unsplash.com/photo-1579532536935-619928decd08?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    title: "Highlights Esportivos",
    description: "Template para momentos esportivos",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    title: "Música e Shows",
    description: "Ideal para conteúdo musical",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60"
  }
];

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-4xl font-bold mb-8">Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-card rounded-lg overflow-hidden shadow-lg border border-border">
              <div 
                className="aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url(${template.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {template.description}
                </p>
                <button className="w-full bg-primary text-primary-foreground rounded-md py-2 hover:bg-primary/90 transition">
                  Usar Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
