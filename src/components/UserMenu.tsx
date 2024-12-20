import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Moon, Settings, Sun } from "lucide-react";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  if (!user) return null;

  // Pegar as iniciais do email para o fallback do avatar
  const initials = user.email
    ?.split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{user.email}</p>
              {user.plan === 'DEV' && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-sm">
                  DEV
                </span>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              Plano {user.plan === 'DEV' ? 'Desenvolvedor' : user.plan}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={toggleTheme}
          className="cursor-pointer"
        >
          {theme === 'light' ? (
            <>
              <Moon className="mr-2 h-4 w-4" />
              <span>Tema Escuro</span>
            </>
          ) : (
            <>
              <Sun className="mr-2 h-4 w-4" />
              <span>Tema Claro</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate("/settings")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
