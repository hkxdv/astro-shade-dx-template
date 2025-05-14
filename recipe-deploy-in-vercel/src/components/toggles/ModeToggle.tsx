import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme } from "@/lib/theme";
import { getTranslation } from "@/lib/translations";
import type { SupportedLocale } from "@/contexts/LanguageContext";
import { DEFAULT_LOCALE } from "@/contexts/LanguageContext";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

interface ModeToggleProps {
  forcedLocale?: SupportedLocale;
}

/**
 * Componente para cambiar el tema de la aplicación (claro/oscuro/sistema)
 * Muestra un botón con ícono que alterna entre sol y luna según el tema actual
 * Al hacer clic, muestra un menú desplegable con opciones de tema
 *
 * @returns {JSX.Element} Componente de toggle de tema
 */
export function ModeToggle({ forcedLocale }: ModeToggleProps) {
  const [theme, setThemeState] = React.useState<"light" | "dark" | "system">(
    "light"
  );

  // Usamos directamente forcedLocale o el valor por defecto
  const effectiveLocale = forcedLocale || DEFAULT_LOCALE;

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

  // Función para traducir textos usando el idioma efectivo
  const translate = (key: string) => getTranslation(key, effectiveLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{translate("theme.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeState("light")}>
          {translate("theme.optionLight")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState("dark")}>
          {translate("theme.optionDark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState("system")}>
          {translate("theme.optionSystem")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
