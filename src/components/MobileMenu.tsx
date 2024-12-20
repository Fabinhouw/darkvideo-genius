import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { UserMenu } from "./UserMenu"

export function MobileMenu() {
  const { user } = useAuth()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col space-y-4">
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
          
          <div className="pt-4 border-t">
            {user ? (
              <div className="flex items-center space-x-4">
                <UserMenu />
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
