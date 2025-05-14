/**
 * Sistema de traducciones para la aplicación que utiliza los archivos JSON de /locales
 * @module translations
 */

import * as React from "react";
import {
  useLanguage,
  type SupportedLocale,
  DEFAULT_LOCALE,
} from "@/contexts/LanguageContext";
import {
  getLocaleTranslations,
  type NestedTranslations,
} from "@/lib/i18n-utils";

/**
 * Clase para gestionar las traducciones con caché optimizada
 */
class TranslationManager {
  // Caché para las traducciones cargadas por idioma
  private translations: Record<string, NestedTranslations> = {};

  // Caché para traducciones específicas de pares idioma:clave
  private translationValues: Record<string, string> = {};

  /**
   * Verifica si un idioma está cargado en la caché
   */
  hasLanguage(language: string): boolean {
    return Boolean(this.translations[language]);
  }

  /**
   * Carga traducciones para un idioma específico
   */
  async loadLanguage(language: string): Promise<void> {
    if (this.hasLanguage(language)) return;

    try {
      const translations = await getLocaleTranslations(language);
      this.translations[language] = translations;
    } catch (error) {
      console.error(`Error cargando traducciones para ${language}:`, error);
    }
  }

  /**
   * Obtiene una traducción específica, usando cachés para optimizar rendimiento
   */
  getTranslation(
    key: string,
    language: SupportedLocale = DEFAULT_LOCALE
  ): string {
    const cacheKey = `${language}:${key}`;

    // Verificar caché de valores primero
    if (this.translationValues[cacheKey]) {
      return this.translationValues[cacheKey];
    }

    // Obtener y almacenar el valor
    const value = this.findTranslationValue(key, language);
    this.translationValues[cacheKey] = value;
    return value;
  }

  /**
   * Busca el valor de una traducción en los diccionarios cargados
   */
  private findTranslationValue(key: string, language: SupportedLocale): string {
    try {
      const keys = key.split(".");

      // Verificar si tenemos las traducciones para este idioma
      if (!this.translations[language]) {
        // Si no tenemos traducciones para este idioma, usar el por defecto
        if (language !== DEFAULT_LOCALE && this.translations[DEFAULT_LOCALE]) {
          return this.getTranslation(key, DEFAULT_LOCALE);
        }

        // Si no tenemos ni el idioma solicitado ni el por defecto, devolver la clave
        return key;
      }

      // Obtener el diccionario del idioma correspondiente
      const translations = this.translations[language];
      let result: unknown = translations;

      // Navegar a través del objeto de traducciones usando las claves
      for (const k of keys) {
        if (
          !result ||
          typeof result !== "object" ||
          !(k in (result as Record<string, unknown>))
        ) {
          if (isBrowser()) {
            console.warn(`Translation key not found: ${key} in ${language}`);
          }

          // Si no existe en el idioma solicitado, intentar con el idioma por defecto
          if (language !== DEFAULT_LOCALE) {
            return this.getTranslation(key, DEFAULT_LOCALE);
          }

          return key; // Fallback a la clave si no se encuentra
        }
        result = (result as Record<string, unknown>)[k];
      }

      // Si el resultado es un string, devolverlo
      if (typeof result === "string") {
        return result;
      }

      if (isBrowser()) {
        console.warn(`No translation found for: ${key}`);
      }

      return key; // Fallback final
    } catch (error) {
      // En caso de error, devolver la clave original
      console.error(`Error al obtener traducción para: ${key}`, error);
      return key;
    }
  }

  /**
   * Limpia las cachés
   */
  clearCache(): void {
    this.translationValues = {};
  }
}

// Instancia única del gestor de traducciones
const translationManager = new TranslationManager();

/**
 * Verifica si el código se está ejecutando en el navegador
 * @returns {boolean} true si estamos en el navegador, false si estamos en el servidor
 */
const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Carga dinámicamente las traducciones para un idioma si no están en caché
 * @param {string} language - Idioma a cargar
 */
export async function loadTranslations(language: string): Promise<void> {
  await translationManager.loadLanguage(language);
}

/**
 * Obtener una traducción basada en una clave y un idioma
 * @param {string} key - Clave de traducción, puede ser anidada usando puntos (ej: "theme.dark")
 * @param {SupportedLocale} language - Idioma en el que se desea obtener la traducción
 * @returns {string} Texto traducido o la clave original si no se encuentra
 */
export function getTranslation(
  key: string,
  language: SupportedLocale = DEFAULT_LOCALE
): string {
  return translationManager.getTranslation(key, language);
}

/**
 * Hook personalizado para usar traducciones en componentes React
 * Utiliza el contexto de idioma
 * @returns {Object} Objeto con función t para traducir y el idioma actual
 */
export function useTranslation() {
  const { currentLocale } = useLanguage(); // Obtener el idioma del contexto

  // Cargar traducciones si no están cargadas
  React.useEffect(() => {
    if (!translationManager.hasLanguage(currentLocale)) {
      loadTranslations(currentLocale).catch(console.error);
    }
  }, [currentLocale]);

  const t = React.useCallback(
    (key: string) => getTranslation(key, currentLocale),
    [currentLocale]
  );

  return {
    t,
    language: currentLocale,
  };
}
