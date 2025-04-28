import React, { useState, useEffect, memo } from "react";
import { useTranslation } from "@/lib/translations";

/**
 * Props para el componente TranslatedText
 * @interface TranslatedTextProps
 * @property {string} textKey - Clave de traducción a buscar en el sistema de traducciones
 * @property {Object} values - Valores para reemplazar placeholders en el texto
 */
interface TranslatedTextProps {
  textKey: string;
  values?: Record<string, string | number>;
}

/**
 * Componente para mostrar texto traducido según el idioma actual
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.textKey - Clave de traducción a utilizar
 * @param {Object} props.values - Valores para reemplazar placeholders en el texto
 * @returns {React.ReactElement} Texto traducido
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({ textKey, values }) => {
  const { t, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState<string>("");

  useEffect(() => {
    // Obtener traducción
    let text = t(textKey);
    
    // Reemplazar variables si existen
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        text = text.replace(new RegExp(`{${key}}`, "g"), String(value));
      });
    }
    
    setTranslatedText(text);
  }, [textKey, values, language]);

  return <>{translatedText}</>;
};

/**
 * Función para verificar si las props han cambiado realmente
 * Evita renderizados innecesarios
 */
function areEqual(prevProps: TranslatedTextProps, nextProps: TranslatedTextProps) {
  if (prevProps.textKey !== nextProps.textKey) return false;
  
  // Comparar valores si existen
  if (prevProps.values || nextProps.values) {
    if (!prevProps.values || !nextProps.values) return false;
    
    const prevKeys = Object.keys(prevProps.values);
    const nextKeys = Object.keys(nextProps.values);
    
    if (prevKeys.length !== nextKeys.length) return false;
    
    return prevKeys.every(key => 
      nextKeys.includes(key) && 
      prevProps.values![key] === nextProps.values![key]
    );
  }
  
  return true;
}

// Exportar componente memoizado para evitar renderizados innecesarios
export default memo(TranslatedText, areEqual);
export { TranslatedText }; 