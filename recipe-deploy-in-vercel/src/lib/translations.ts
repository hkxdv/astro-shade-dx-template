/**
 * Sistema de traducciones para la aplicación
 * @module translations
 */

import { type Language } from "@/lib/i18n";

/**
 * Interfaz para definir la estructura de traducciones
 */
export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

/**
 * Objeto con todas las traducciones de la aplicación
 * Organizado por claves y luego por idioma
 * @type {Object}
 */
export const translations = {
  appName: {
    es: "Astro Shade DX Template - Demo",
    en: "Astro Shade DX Template - Demo",
  },
  description: {
    es: "Plantilla moderna con Astro + shadcn/ui + Bun para aplicaciones rápidas con excelente experiencia de desarrollo.",
    en: "Modern template with Astro + shadcn/ui + Bun for fast applications with excellent developer experience.",
  },
  common: {
    loading: {
      es: "Cargando...",
      en: "Loading...",
    },
  },
  theme: {
    light: {
      es: "Claro",
      en: "Light",
    },
    dark: {
      es: "Oscuro",
      en: "Dark",
    },
    system: {
      es: "Sistema",
      en: "System",
    },
    toggle: {
      es: "Cambiar tema",
      en: "Toggle theme",
    },
  },
  language: {
    spanish: {
      es: "Español",
      en: "Spanish",
    },
    english: {
      es: "Inglés",
      en: "English",
    },
    toggle: {
      es: "Cambiar idioma",
      en: "Toggle language",
    },
  },
  navigation: {
    home: {
      es: "Inicio",
      en: "Home",
    },
    components: {
      es: "Componentes",
      en: "Components",
    },
    themes: {
      es: "Temas",
      en: "Themes",
    },
    settings: {
      es: "Configuración",
      en: "Settings",
    },
    docs: {
      es: "Documentación",
      en: "Documentation",
    },
    examples: {
      es: "Ejemplos",
      en: "Examples",
    },
  },
  features: {
    performance: {
      title: {
        es: "Rendimiento Superior",
        en: "Superior Performance",
      },
      description: {
        es: 'Aprovecha la velocidad de Astro con su enfoque "zero JS by default" y Bun como runtime ultrarrápido.',
        en: 'Leverage Astro\'s speed with its "zero JS by default" approach and Bun as an ultra-fast runtime.',
      },
    },
    components: {
      title: {
        es: "Componentes Reutilizables",
        en: "Reusable Components",
      },
      description: {
        es: "Biblioteca completa de componentes UI con shadcn/ui y React para interfaces dinámicas.",
        en: "Complete UI component library with shadcn/ui and React for dynamic interfaces.",
      },
    },
    multilingual: {
      title: {
        es: "Soporte Multilingüe",
        en: "Multilingual Support",
      },
      description: {
        es: "Sistema de internacionalización integrado con soporte para español e inglés.",
        en: "Integrated internationalization system with support for Spanish and English.",
      },
    },
    themes: {
      title: {
        es: "Modos Claro/Oscuro",
        en: "Light/Dark Modes",
      },
      description: {
        es: "Tema adaptable que respeta las preferencias del usuario con persistencia.",
        en: "Adaptive theme that respects user preferences with persistence.",
      },
    },
  },
  footer: {
    copyright: {
      es: "Todos los derechos reservados",
      en: "All rights reserved",
    },
    madeWith: {
      es: "Hecho con",
      en: "Made with",
    },
    and: {
      es: "y",
      en: "and",
    },
  },
};

/**
 * Verifica si el código se está ejecutando en el navegador
 * @returns {boolean} true si estamos en el navegador, false si estamos en el servidor
 */
const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Obtener el idioma actual desde el documento HTML o localStorage
 * Con seguridad para SSR (Server-Side Rendering)
 * @returns {Language} Idioma actual
 */
export function getCurrentLanguage(): Language {
  if (!isBrowser()) {
    return "es"; // Valor por defecto en el servidor
  }

  return (
    (document.documentElement.getAttribute("lang") as Language) ||
    (localStorage.getItem("lang") as Language) ||
    "es"
  );
}

/**
 * Obtener una traducción basada en una clave y un idioma
 * @param {string} key - Clave de traducción, puede ser anidada usando puntos (ej: "theme.dark")
 * @param {Language} language - Idioma en el que se desea obtener la traducción
 * @returns {string} Texto traducido o la clave original si no se encuentra
 */
export function getTranslation(key: string, language: Language): string {
  const keys = key.split(".");
  let result: any = translations;

  // Navegar a través del objeto de traducciones usando las claves
  for (const k of keys) {
    if (result[k] === undefined) {
      if (isBrowser()) {
        console.warn(`Translation key not found: ${key}`);
      }
      return key; // Fallback a la clave si no se encuentra
    }
    result = result[k];
  }

  // Si el resultado es un string, devolver directamente
  if (typeof result === "string") {
    return result;
  }

  // Si el resultado tiene la clave de idioma, devolver esa traducción
  if (result[language]) {
    return result[language];
  }

  // Fallback a español si no está disponible en el idioma solicitado
  if (language !== "es" && result["es"]) {
    if (isBrowser()) {
      console.warn(
        `Translation not available in ${language}, falling back to Spanish for: ${key}`
      );
    }
    return result["es"];
  }

  if (isBrowser()) {
    console.warn(`No translation found for: ${key}`);
  }
  return key; // Fallback final
}

/**
 * Hook personalizado para usar traducciones en componentes React
 * Seguro para SSR
 * @returns {Object} Objeto con función t para traducir y el idioma actual
 */
export function useTranslation() {
  const currentLanguage = getCurrentLanguage();

  return {
    /**
     * Traduce una clave al idioma actual del documento
     * @param {string} key - Clave de traducción
     * @returns {string} Texto traducido
     */
    t: (key: string) => getTranslation(key, currentLanguage),

    /**
     * Idioma actual
     */
    language: currentLanguage,

    /**
     * Cambia el idioma actual
     * Solo funciona en el cliente
     * @param {Language} lang - Nuevo idioma
     */
    changeLanguage: (lang: Language) => {
      if (!isBrowser()) return;

      document.documentElement.setAttribute("lang", lang);
      localStorage.setItem("lang", lang);
      // Disparar un evento para que otros componentes puedan reaccionar
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: { language: lang } })
      );
    },
  };
}
