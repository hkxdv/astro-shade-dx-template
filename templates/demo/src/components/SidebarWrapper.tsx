import React from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/ui/sidebar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { SupportedLocale } from "@/contexts/LanguageContext";

interface SidebarWrapperProps {
  locale: SupportedLocale;
}

/**
 * Componente que envuelve el sidebar de la aplicación con el contexto necesario
 * Proporciona el proveedor SidebarProvider requerido por el componente AppSidebar
 * También pasa el idioma directamente para evitar problemas de hidratación
 *
 * @returns {JSX.Element} Componente sidebar con su contexto
 */
export function SidebarWrapper({ locale }: SidebarWrapperProps) {
  return (
    <LanguageProvider value={locale}>
      <SidebarProvider>
        <AppSidebar locale={locale} />
      </SidebarProvider>
    </LanguageProvider>
  );
}
