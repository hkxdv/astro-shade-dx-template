import React from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/ui/sidebar";

/**
 * Componente que envuelve el sidebar de la aplicación con el contexto necesario
 * Proporciona el proveedor SidebarProvider requerido por el componente AppSidebar
 * 
 * @returns {JSX.Element} Componente sidebar con su contexto
 */
export function SidebarWrapper() {
  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  );
}
