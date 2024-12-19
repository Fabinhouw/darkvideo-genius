import { Button } from "@/components/ui/button";
import { User, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DarkVideo
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost">Início</Button>
          <Button variant="ghost">Templates</Button>
          <Button variant="ghost">Tutoriais</Button>
          <Button variant="ghost">Preços</Button>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button>
            <User className="w-5 h-5 mr-2" />
            Entrar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;