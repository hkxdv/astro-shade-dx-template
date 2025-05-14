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
   * @param {string} linkUrl - La URL o path correspondiente al idioma seleccionado
   */
  const handleLanguageChange = (linkUrl: string) => {
    const currentNavigatorParams = new URLSearchParams(window.location.search);
    let newPath: string;

    try {
      // Intenta parsear linkUrl. Si es una URL absoluta (ej. http://localhost/en/foo o https://example.com/en/foo)
      // tomaremos su pathname y su search string.
      const parsedLinkUrl = new URL(linkUrl);
      newPath = parsedLinkUrl.pathname + parsedLinkUrl.search; // Combina path y search de la URL del link
    } catch (e) {
      // linkUrl no es una URL absoluta, asumimos que es un path (ej. "/en/foo" o "/en/foo?param=val")
      newPath = linkUrl;
    }

    // Asegurar que el newPath (ya sea de una URL parseada o directo) comience con "/" si no lo hace.
    if (!newPath.startsWith("/")) {
      console.warn(
        `LangToggle: linkUrl ("${linkUrl}") transformada a path ("${newPath}") no comenzaba con '/', se ha añadido.`
      );
      newPath = `/${newPath}`;
    }

    // Construir la URL final usando el origin actual, el newPath.
    // newPath puede contener sus propios parámetros de consulta (ej. /es/page?param=true)
    const finalUrl = new URL(newPath, window.location.origin);

    // Añadir los parámetros de la URL actual del navegador a la URL final.
    // Esto fusionará los params de newPath (si los tenía) con los currentNavigatorParams.
    currentNavigatorParams.forEach((value, key) => {
      finalUrl.searchParams.append(key, value);
    });

    window.location.href = finalUrl.toString();
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
