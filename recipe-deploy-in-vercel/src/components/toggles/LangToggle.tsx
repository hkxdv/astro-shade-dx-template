import * as React from "react";
import { Languages } from "lucide-react";
import { getTranslation } from "@/lib/translations";
import type { SupportedLocale } from "@/contexts/LanguageContext";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

interface LanguageLink {
  lang: string;
  url: string;
}

interface LangToggleProps {
  languageLinks: LanguageLink[];
  currentSelectedLang: SupportedLocale;
}

/**
 * Componente para cambiar el idioma de la aplicación
 * Muestra un botón con ícono de idiomas que al hacer clic despliega un menú con opciones
 * Resalta visualmente el idioma actualmente seleccionado
 *
 * @returns {JSX.Element} Componente de toggle de idioma
 */
export function LangToggle({
  languageLinks,
  currentSelectedLang,
}: LangToggleProps) {
  /**
   * Maneja el cambio de idioma cuando el usuario selecciona una opción
   * @param {string} targetUrl - La URL correspondiente al idioma seleccionado
   */
  const handleLanguageChange = (targetUrl: string) => {
    // Preservar parámetros de consulta al cambiar idioma
    const currentParams = new URLSearchParams(window.location.search);
    const targetUrlObj = new URL(targetUrl, window.location.origin);

    console.log("Cambiando a URL:", targetUrlObj.toString());

    // Transferir los parámetros actuales a la nueva URL
    for (const [key, value] of currentParams.entries()) {
      targetUrlObj.searchParams.append(key, value);
    }

    // Navegar a la URL del idioma seleccionado con los parámetros preservados
    window.location.href = targetUrlObj.toString();
  };

  const getLangName = (langCode: string): string => {
    if (langCode === "es")
      return getTranslation("language.spanish", currentSelectedLang);
    if (langCode === "en")
      return getTranslation("language.english", currentSelectedLang);
    return langCode; // Fallback al código si no se reconoce
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">
            {getTranslation("language.toggle", currentSelectedLang)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageLinks.map((link) => (
          <DropdownMenuItem
            key={link.lang}
            onClick={() => handleLanguageChange(link.url)}
            className={currentSelectedLang === link.lang ? "bg-accent" : ""}
          >
            {getLangName(link.lang)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
