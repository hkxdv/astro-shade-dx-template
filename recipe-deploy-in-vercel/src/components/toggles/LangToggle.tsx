import * as React from "react";
import { Languages } from "lucide-react";
import { applyLanguage, type Language } from "@/lib/i18n";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

/**
 * Componente para cambiar el idioma de la aplicación
 * Muestra un botón con ícono de idiomas que al hacer clic despliega un menú con opciones
 * Resalta visualmente el idioma actualmente seleccionado
 *
 * @returns {JSX.Element} Componente de toggle de idioma
 */
export function LangToggle() {
  const [language, setLanguage] = React.useState<Language>("es");

  /**
   * Efecto para detectar el idioma actual al montar el componente
   * y configurar listeners para eventos de cambio de idioma
   */
  React.useEffect(() => {
    // Obtener el idioma actual del documento cuando el componente se monta
    const currentLang = document.documentElement.getAttribute("lang");
    setLanguage((currentLang === "en" ? "en" : "es") as Language);

    // Escuchar cambios de idioma
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setLanguage(customEvent.detail.language);
    };

    document.addEventListener("languagechange", handleLanguageChange);
    return () => {
      document.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  /**
   * Maneja el cambio de idioma cuando el usuario selecciona una opción
   * @param {Language} newLang - El nuevo idioma seleccionado
   */
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    applyLanguage(newLang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("es")}
          className={language === "es" ? "bg-accent" : ""}
        >
          Español
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={language === "en" ? "bg-accent" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
