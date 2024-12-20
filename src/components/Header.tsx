import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              DarkVideo
            </Link>
            <nav className="hidden md:flex ml-8 space-x-6">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Início
              </Link>
              <Link 
                to="/templates" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Templates
              </Link>
              <Link 
                to="/tutorials" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Tutoriais
              </Link>
              <Link 
                to="/pricing" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Preços
              </Link>
            </nav>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Entrar
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Começar Agora
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;