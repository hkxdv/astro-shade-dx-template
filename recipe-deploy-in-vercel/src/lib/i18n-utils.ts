/**
 * Utilidades para manejar la internacionalización de manera dinámica
 * @module i18n-utils
 */

/**
 * Obtener los idiomas soportados desde la configuración de Astro
 * @returns Array de códigos de idioma soportados
 */
export function getSupportedLocales(): string[] {
  try {
    // Intentar obtener los locales desde Astro.locals o config
    if (import.meta && import.meta.env && import.meta.env.SUPPORTED_LOCALES) {
      return JSON.parse(import.meta.env.SUPPORTED_LOCALES);
    }
    // Fallback a los idiomas soportados originalmente
    return ["es", "en"];
  } catch (error) {
    console.error("Error al obtener locales soportados:", error);
    return ["es", "en"];
  }
}

/**
 * Obtener el idioma por defecto
 * @returns Código del idioma por defecto
 */
export function getDefaultLocale(): string {
  try {
    if (import.meta && import.meta.env && import.meta.env.DEFAULT_LOCALE) {
      return import.meta.env.DEFAULT_LOCALE;
    }
    return "es";
  } catch (error) {
    console.error("Error al obtener locale por defecto:", error);
    return "es";
  }
}

/**
 * Verifica si un idioma está soportado
 * @param locale Código de idioma a verificar
 * @returns boolean - true si el idioma está soportado
 */
export function isLocaleSupported(locale: string): boolean {
  return getSupportedLocales().includes(locale);
}

/**
 * Genera rutas estáticas para páginas con parámetro [lang]
 * @returns Array de objetos con params.lang para cada idioma soportado
 */
export function generateLocalePaths() {
  return getSupportedLocales().map((lang) => ({
    params: { lang },
  }));
}

/**
 * Tipo para módulos de traducción importados dinámicamente
 */
interface TranslationModule {
  default: Record<string, unknown>;
}

/**
 * Tipo para traducciones anidadas que permite múltiples niveles
 */
export type NestedTranslations = Record<
  string,
  string | Record<string, unknown>
>;

/**
 * Obtener todas las traducciones disponibles para un idioma
 * @param locale Código de idioma
 * @returns Objeto con todas las traducciones o un objeto vacío si hay error
 */
export async function getLocaleTranslations(
  locale: string
): Promise<NestedTranslations> {
  try {
    // Carga manual de archivos de traducción
    const commonModule = await import(`../locales/${locale}/common.json`);
    const featuresModule = await import(`../locales/${locale}/features.json`);

    // Combinamos todas las traducciones
    return {
      ...commonModule.default,
      ...featuresModule.default,
    };
  } catch (error) {
    console.error(`Error cargando traducciones para ${locale}:`, error);
    return {};
  }
}
