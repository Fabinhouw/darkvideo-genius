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
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            DarkVideo
          </Link>

          {/* Menu Central */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-12">
            <Link 
              to="/" 
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/templates" 
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Preços
            </Link>
          </nav>

          {/* Menu Direito */}
          <div className="hidden md:flex items-center space-x-6">
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