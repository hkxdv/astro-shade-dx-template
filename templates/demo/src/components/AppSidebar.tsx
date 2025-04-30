import * as React from "react";
import {
  ChevronRight,
  File,
  Folder,
  Home,
  Package,
  Layout,
  Code,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * Datos de la estructura del proyecto para mostrar en el sidebar
 * Incluye información del proyecto y árbol de archivos
 */
const projectData = {
  projectInfo: [
    {
      name: "Astro Shade DX",
    },
  ],
  tree: [
    [
      "src",
      [
        "components",
        [
          "ui",
          "button.tsx",
          "card.tsx",
          "separator.tsx",
          "sidebar.tsx",
          "tabs.tsx",
        ],
        "AppSidebar.tsx",
        "SidebarWrapper.tsx",
      ],
      ["layouts", "Layout.astro"],
      ["pages", "index.astro"],
      ["hooks", "useMobile.ts"],
      ["lib", "i18n.ts", "utils.ts", "translations.ts", "theme.ts"],
      ["styles", "global.css"],
      ["assets"],
    ],
    ["public", "favicon.svg"],
    "astro.config.mjs",
    "package.json",
    "tsconfig.json",
    "components.json",
  ],
};

/**
 * Componente de barra lateral que muestra información del proyecto,
 * navegación principal y estructura de archivos
 *
 * @param {React.ComponentProps<typeof Sidebar>} props - Propiedades para el componente Sidebar
 * @returns {JSX.Element} Componente de barra lateral
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="bg-background pt-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-widest">
            Proyecto
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectData.projectInfo.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="bg-muted/30">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="my-2 mx-3" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-widest">
            Archivos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectData.tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

/**
 * Componente recursivo para renderizar un árbol de archivos y carpetas
 *
 * @param {Object} props - Propiedades del componente
 * @param {string | any[]} props.item - Ítem a renderizar (nombre de archivo o array con carpeta y contenido)
 * @returns {JSX.Element} Nodo del árbol de archivos
 */
function Tree({ item }: { item: string | any[] }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];

  if (!items.length) {
    let icon = <File className="w-4 h-4 text-muted-foreground" />;
    let iconColor = "text-muted-foreground";

    if (name === "index.astro") {
      icon = <Home className="w-4 h-4 text-primary" />;
      iconColor = "text-primary";
    } else if (name === "Layout.astro") {
      icon = <Layout className="w-4 h-4 text-secondary" />;
      iconColor = "text-secondary";
    } else if (name.includes(".tsx") || name.includes(".jsx")) {
      icon = <Code className="w-4 h-4 text-indigo-400" />;
      iconColor = "text-indigo-400";
    }

    return (
      <SidebarMenuButton
        isActive={name === "index.astro"}
        className={cn(
          "data-[active=true]:bg-transparent hover:bg-muted/40 transition-colors",
          name === "index.astro" && "font-medium"
        )}
      >
        {icon}
        <span
          className={cn(
            "text-sm",
            name === "index.astro" ? "text-primary" : ""
          )}
        >
          {name}
        </span>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={
          name === "src" || name === "components" || name === "pages"
        }
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="hover:bg-muted/40 transition-colors">
            <ChevronRight className="w-4 h-4 transition-transform text-muted-foreground" />
            <Folder className="w-4 h-4 text-secondary" />
            <span className="font-medium text-sm">{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
