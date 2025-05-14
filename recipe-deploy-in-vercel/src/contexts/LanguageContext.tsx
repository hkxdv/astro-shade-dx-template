import * as React from "react";
import { getDefaultLocale } from "@/lib/i18n-utils";

// Podemos usar string como tipo base para cualquier idioma
export type SupportedLocale = string;

export interface ILanguageContext {
  currentLocale: string;
}

const LanguageContext = React.createContext<ILanguageContext | undefined>(
  undefined
);

/**
 * Valor por defecto para idioma cuando no hay Provider
 * Esto asegura consistencia en toda la aplicación
 */
export const DEFAULT_LOCALE: string = getDefaultLocale();

/**
 * Estado global para evitar múltiples advertencias
 * Se mantiene fuera del componente para persistir entre renderizados
 */
let hasShownWarning = false;

/**
 * Verifica si el código se está ejecutando en el cliente (navegador)
 * @returns boolean true si estamos en el navegador
 */
const isClient = () => typeof window !== "undefined";

/**
 * Provider de idioma para la aplicación
 * Envuelve los componentes React que necesitan acceder al idioma actual
 */
export const LanguageProvider: React.FC<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <LanguageContext.Provider value={{ currentLocale: value }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook para acceder al idioma actual desde cualquier componente
 * Si no hay Provider, devuelve el idioma por defecto
 * @returns Contexto de idioma con la propiedad currentLocale
 */
export const useLanguage = (): ILanguageContext => {
  const context = React.useContext(LanguageContext);

  // Solo mostrar advertencia en desarrollo, cliente, y una sola vez
  if (context === undefined) {
    // No mostrar advertencia durante hidratación o SSR
    if (
      !hasShownWarning &&
      process.env.NODE_ENV === "development" &&
      isClient()
    ) {
      console.warn(
        `useLanguage debe usarse dentro de un LanguageProvider. Valor por defecto: "${DEFAULT_LOCALE}".`
      );
      hasShownWarning = true;
    }
    return { currentLocale: DEFAULT_LOCALE };
  }

  return context;
};

export default LanguageContext;
