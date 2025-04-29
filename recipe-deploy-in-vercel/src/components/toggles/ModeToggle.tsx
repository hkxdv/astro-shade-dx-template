import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme } from "@/lib/theme";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

/**
 * Componente para cambiar el tema de la aplicación (claro/oscuro/sistema)
 * Muestra un botón con ícono que alterna entre sol y luna según el tema actual
 * Al hacer clic, muestra un menú desplegable con opciones de tema
 *
 * @returns {JSX.Element} Componente de toggle de tema
 */
export function ModeToggle() {
  const [theme, setThemeState] = React.useState<"light" | "dark" | "system">(
    "light"
  );

  /**
   * Efecto para detectar el tema actual al montar el componente
   */
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  /**
   * Efecto para aplicar el tema cuando cambie el estado
   */
  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeState("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState("dark")}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
