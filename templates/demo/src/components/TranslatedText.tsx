import { memo, type FC } from "react";
import { useTranslation, getTranslation } from "@/lib/translations";
import type { SupportedLocale } from "@/contexts/LanguageContext";
import { DEFAULT_LOCALE } from "@/contexts/LanguageContext";

/**
 * Props para el componente TranslatedText
 * @interface TranslatedTextProps
 * @property {string} textKey - Clave de traducción a buscar en el sistema de traducciones
 * @property {Object} values - Valores para reemplazar placeholders en el texto
 * @property {SupportedLocale} forcedLocale - Idioma a usar (sobreescribe el del contexto)
 */
interface TranslatedTextProps {
  textKey: string;
  values?: Record<string, string | number>;
  forcedLocale?: SupportedLocale; // Idioma forzado a usar
}

/**
 * Reemplaza placeholders en el texto traducido
 * @param text Texto con placeholders {key}
 * @param values Valores para reemplazar
 * @returns Texto con placeholders reemplazados
 */
function replacePlaceholders(
  text: string,
  values?: Record<string, string | number>
): string {
  if (!values) return text;

  let result = text;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`{${key}}`, "g"), String(value));
  }

  return result;
}

/**
 * Verifica si estamos en el navegador
 */
const isBrowser = typeof window !== "undefined";

/**
 * Componente para mostrar texto traducido según el idioma actual
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} props.textKey - Clave de traducción a utilizar
 * @param {Object} props.values - Valores para reemplazar placeholders en el texto
 * @param {SupportedLocale} props.forcedLocale - Idioma forzado a usar
 * @returns {React.ReactElement} Texto traducido
 */
const TranslatedText: FC<TranslatedTextProps> = ({
  textKey,
  values,
  forcedLocale,
}) => {
  // En el servidor, o con forcedLocale, no hay problemas de hidratación
  // Por lo tanto, podemos renderizar directamente
  if (!isBrowser || forcedLocale) {
    const rawText = getTranslation(textKey, forcedLocale || DEFAULT_LOCALE);
    const finalText = replacePlaceholders(rawText, values);
    return <>{finalText}</>;
  }

  // En el cliente, usar el hook de useTranslation que obtiene el idioma del contexto
  const { t } = useTranslation();

  // Mostrar directamente el texto traducido
  const rawText = t(textKey);
  const finalText = replacePlaceholders(rawText, values);

  return <>{finalText}</>;
};

/**
 * Función para verificar si las props han cambiado realmente
 * Evita renderizados innecesarios
 */
function areEqual(
  prevProps: TranslatedTextProps,
  nextProps: TranslatedTextProps
) {
  if (prevProps.textKey !== nextProps.textKey) return false;
  if (prevProps.forcedLocale !== nextProps.forcedLocale) return false;

  // Comparar valores si existen
  if (prevProps.values || nextProps.values) {
    if (!prevProps.values || !nextProps.values) return false;

    const prevKeys = Object.keys(prevProps.values);
    const nextKeys = Object.keys(nextProps.values);

    if (prevKeys.length !== nextKeys.length) return false;

    return prevKeys.every(
      (key) =>
        nextKeys.includes(key) &&
        prevProps.values &&
        nextProps.values &&
        prevProps.values[key] === nextProps.values[key]
    );
  }

  return true;
}

// Exportar componente memoizado para evitar renderizados innecesarios
export default memo(TranslatedText, areEqual);
export { TranslatedText };
