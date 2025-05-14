import * as React from "react";
import {
  ChevronRight,
  Folder,
  Home,
  Package,
  Layout,
  Code,
  Palette,
  LayoutTemplate,
  BookOpen,
  Server,
  FileCode,
  Link2,
  Text,
  Laptop,
  Globe,
  Undo2,
  Rocket,
  Settings,
  FileImage,
} from "lucide-react";
import { getTranslation } from "@/lib/translations";
import { DEFAULT_LOCALE } from "@/contexts/LanguageContext";
import type { SupportedLocale } from "@/contexts/LanguageContext";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/ui/sidebar";
import { Separator } from "@/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import "@/styles/sidebar.css";

// Tipos para la estructura del proyecto
type ProjectInfo = { name: string; version: string };
type FileItem = string;
interface FolderItem extends Array<string | FileItem | FolderItem> {
  0: string; // El primer elemento siempre es el nombre de la carpeta
}
type TreeItem = FileItem | FolderItem;

/**
 * Datos de la estructura del proyecto para mostrar en el sidebar
 * Incluye información del proyecto y árbol de archivos
 */
const projectData: {
  projectInfo: ProjectInfo[];
  tree: TreeItem[];
} = {
  projectInfo: [
    {
      name: "Demo",
      version: "2.1.2",
    },
  ],
  tree: [
    [
      "src",
      [
        "components",
        [
          "ui",
          "breadcrumb.tsx",
          "button.tsx",
          "card.tsx",
          "collapsible.tsx",
          "dropdown-menu.tsx",
          "input.tsx",
          "separator.tsx",
          "sheet.tsx",
          "sidebar.tsx",
          "skeleton.tsx",
          "tooltip.tsx",
        ],
        ["toggles", "LangToggle.tsx", "ThemeToggle.tsx"],
        [
          "sections",
          "Footer.astro",
          "Features.astro",
          "Hero.astro",
          "Technologies.astro",
        ],
        "AppSidebar.tsx",
        "SidebarWrapper.tsx",
        "ThemeToggle.tsx",
        "TranslatedText.tsx",
        "TechLogos.tsx",
      ],
      ["contexts", "LanguageContext.tsx"],
      ["layouts", "Layout.astro"],
      [
        "locales",
        ["es", "common.json", "features.json"],
        ["en", "common.json", "features.json"],
      ],
      [
        "pages",
        ["[lang]", "index.astro", "404.astro"],
        "index.astro",
        "404.astro",
      ],
      ["hooks", "useMobile.ts", "useMediaQuery.ts"],
      ["lib", "i18n-utils.ts", "utils.ts", "translations.ts", "theme.ts"],
      ["styles", "global.css", "sidebar.css"],
    ],
    ["public", "favicon.svg"],
    "astro.config.mjs",
    "components.json",
    "package.json",
    "tsconfig.json",
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  locale?: SupportedLocale;
}

/**
 * Componente de barra lateral que muestra información del proyecto,
 * navegación principal y estructura de archivos
 *
 * @param {React.ComponentProps<typeof Sidebar>} props - Propiedades para el componente Sidebar
 * @returns {React.ReactElement} Componente de barra lateral
 */
export function AppSidebar({ locale, ...props }: AppSidebarProps) {
  // Inicializar con un valor predeterminado para evitar errores de hydration
  const [mounted, setMounted] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Usar locale directamente o DEFAULT_LOCALE como fallback
  const effectiveLocale = locale || DEFAULT_LOCALE;

  // Estado para controlar si el sidebar está colapsado
  const [collapsed, setCollapsed] = React.useState(false);

  // Evitar errores de hydration montando el componente solo en client-side
  React.useEffect(() => {
    setMounted(true);
    setCollapsed(isMobile);
  }, [isMobile]);

  // Actualiza el estado de colapso basado en el tamaño de la pantalla
  React.useEffect(() => {
    if (mounted) {
      setCollapsed(isMobile);
    }
  }, [isMobile, mounted]);

  // Función para traducir textos
  const translate = (key: string) => getTranslation(key, effectiveLocale);

  // No renderizar contenido responsive hasta que estemos en el cliente
  // para evitar errores de hydration
  if (!mounted) {
    return (
      <Sidebar {...props} className="w-[240px]">
        <SidebarContent className="bg-background pt-3 overflow-hidden">
          <div className="animate-pulse h-full bg-muted/20 rounded-md" />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sidebar
      {...props}
      className={cn(
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px] md:hover:w-[240px] group" : "w-[240px]"
      )}
      onMouseEnter={() => !isMobile && collapsed && setCollapsed(false)}
      onMouseLeave={() =>
        !isMobile && !collapsed && isMobile && setCollapsed(true)
      }
    >
      <SidebarContent className="bg-background pt-3 h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden scrollbar-thin">
        <TooltipProvider delayDuration={200}>
          <SidebarGroup>
            <SidebarGroupLabel
              className={cn(
                "text-xs uppercase tracking-widest transition-opacity duration-200 sticky top-0 bg-background/90 backdrop-blur-sm z-10 py-1 shadow-sm",
                collapsed && "opacity-0 md:group-hover:opacity-100"
              )}
            >
              {translate("sidebar.project")}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projectData.projectInfo.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      className={cn(
                        "bg-muted/30 hover:bg-muted/50 transition-colors",
                        collapsed &&
                          "justify-center md:group-hover:justify-start"
                      )}
                    >
                      <Rocket className="w-4 h-4 text-primary flex-shrink-0" />
                      <span
                        className={cn(
                          "font-medium text-sm transition-opacity duration-200 whitespace-nowrap",
                          collapsed
                            ? "opacity-0 md:group-hover:opacity-100 md:group-hover:inline ml-2"
                            : "ml-2"
                        )}
                      >
                        {item.name}{" "}
                        <span className="text-xs text-muted-foreground">
                          v{item.version}
                        </span>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator className="my-2 mx-3" />
          <SidebarGroup>
            <SidebarGroupLabel
              className={cn(
                "text-xs uppercase tracking-widest transition-opacity duration-200 sticky top-0 bg-background/90 backdrop-blur-sm z-10 py-1 shadow-sm",
                collapsed && "opacity-0 md:group-hover:opacity-100"
              )}
            >
              {translate("sidebar.files")}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="file-tree">
                {projectData.tree.map((item, i) => (
                  <Tree
                    key={typeof item === "string" ? item : item[0] + i}
                    item={item}
                    collapsed={collapsed}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </TooltipProvider>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

/**
 * Obtiene el ícono adecuado para un archivo basado en su nombre
 *
 * @param {string} filename - Nombre del archivo
 * @returns {React.ReactElement} Ícono correspondiente al tipo de archivo
 */
function getFileIcon(filename: string): React.ReactElement {
  // Extensiones de archivos
  if (filename.endsWith(".astro")) {
    // Archivos Astro con iconos específicos
    if (filename === "index.astro") {
      return <Home className="w-4 h-4 text-primary flex-shrink-0" />;
    }

    if (filename.includes("Layout")) {
      return (
        <LayoutTemplate className="w-4 h-4 text-orange-400 flex-shrink-0" />
      );
    }

    if (filename.includes("Section")) {
      return <Layout className="w-4 h-4 text-purple-400 flex-shrink-0" />;
    }

    if (filename === "404.astro") {
      return <Undo2 className="w-4 h-4 text-red-400 flex-shrink-0" />;
    }

    return <FileCode className="w-4 h-4 text-amber-400 flex-shrink-0" />;
  }

  if (filename.endsWith(".tsx") || filename.endsWith(".jsx")) {
    if (filename.startsWith("use")) {
      return <Link2 className="w-4 h-4 text-pink-400 flex-shrink-0" />;
    }

    if (filename.includes("Theme")) {
      return <Palette className="w-4 h-4 text-yellow-400 flex-shrink-0" />;
    }

    if (filename.includes("Tech")) {
      return <Laptop className="w-4 h-4 text-indigo-400 flex-shrink-0" />;
    }

    return <Code className="w-4 h-4 text-indigo-400 flex-shrink-0" />;
  }

  if (filename.endsWith(".ts")) {
    if (filename.includes("i18n") || filename.includes("translation")) {
      return <Globe className="w-4 h-4 text-sky-400 flex-shrink-0" />;
    }

    if (filename.includes("api")) {
      return <Server className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
    }

    return <FileCode className="w-4 h-4 text-blue-400 flex-shrink-0" />;
  }

  if (filename.endsWith(".css")) {
    return <Palette className="w-4 h-4 text-sky-400 flex-shrink-0" />;
  }

  if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
    return <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />;
  }

  if (filename.endsWith(".json")) {
    return <Settings className="w-4 h-4 text-slate-400 flex-shrink-0" />;
  }

  if (filename.endsWith(".config.mjs") || filename.endsWith(".json")) {
    return <Settings className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
  }

  if (filename.endsWith(".svg")) {
    return <FileImage className="w-4 h-4 text-purple-400 flex-shrink-0" />;
  }

  // Por defecto
  return <Text className="w-4 h-4 text-muted-foreground flex-shrink-0" />;
}

/**
 * Obtiene el ícono para una carpeta basado en su nombre
 *
 * @param {string} foldername - Nombre de la carpeta
 * @returns {React.ReactElement} Ícono correspondiente al tipo de carpeta
 */
function getFolderIcon(foldername: string): React.ReactElement {
  switch (foldername) {
    case "src":
      return <Package className="w-4 h-4 text-blue-400 flex-shrink-0" />;
    case "pages":
      return <FileCode className="w-4 h-4 text-green-400 flex-shrink-0" />;
    case "components":
      return <Layout className="w-4 h-4 text-purple-400 flex-shrink-0" />;
    case "layouts":
      return (
        <LayoutTemplate className="w-4 h-4 text-orange-400 flex-shrink-0" />
      );
    case "ui":
      return <Palette className="w-4 h-4 text-pink-400 flex-shrink-0" />;
    case "lib":
      return <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />;
    case "hooks":
      return <Link2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />;
    case "api":
      return <Server className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
    case "styles":
      return <Palette className="w-4 h-4 text-pink-400 flex-shrink-0" />;
    case "public":
      return <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />;
    case "sections":
      return <Layout className="w-4 h-4 text-indigo-400 flex-shrink-0" />;
    case "locales":
      return <Globe className="w-4 h-4 text-sky-400 flex-shrink-0" />;
    case "[lang]":
      return <Globe className="w-4 h-4 text-sky-400 flex-shrink-0" />;
    default:
      return <Folder className="w-4 h-4 text-yellow-400 flex-shrink-0" />;
  }
}

/**
 * Componente recursivo para renderizar un árbol de archivos y carpetas
 *
 * @param {Object} props - Propiedades del componente
 * @param {TreeItem} props.item - Ítem a renderizar (nombre de archivo o array con carpeta y contenido)
 * @param {boolean} props.collapsed - Si el sidebar está colapsado
 * @returns {React.ReactElement} Nodo del árbol de archivos
 */
function Tree({
  item,
  collapsed,
}: {
  item: TreeItem;
  collapsed: boolean;
}): React.ReactElement {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const isFile = !items.length;

  if (isFile) {
    const icon = getFileIcon(name);
    const isActive = name === "index.astro";
    const isLongName = name.length > 1;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton
            isActive={isActive}
            className={cn(
              "data-[active=true]:bg-transparent hover:bg-muted/40 transition-colors rounded-md",
              "sidebar-menu-button",
              isActive && "font-medium",
              collapsed && "justify-center md:group-hover:justify-start"
            )}
          >
            {icon}
            <span
              className={cn(
                "text-sm transition-opacity duration-200 truncate max-w-[180px]",
                isActive ? "text-primary" : "",
                collapsed
                  ? "opacity-0 md:group-hover:opacity-100 md:group-hover:inline ml-2"
                  : "ml-2"
              )}
            >
              {name}
            </span>
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className={cn(
            "bg-popover text-popover-foreground z-50",
            !isLongName && !collapsed && "hidden"
          )}
        >
          {name}
        </TooltipContent>
      </Tooltip>
    );
  }

  const folderIcon = getFolderIcon(name);
  const isImportantFolder = [""].includes(name);
  const isLongName = name.length > 1;
  const fileCount = items.length;
  const hasManyFiles = fileCount > 1;

  return (
    <SidebarMenuItem>
      <Collapsible
        className={cn(
          "group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90",
          hasManyFiles && "dense-folder",
          fileCount > 0 && "has-files"
        )}
        defaultOpen={name === "src" || isImportantFolder}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className={cn(
                  "hover:bg-muted/40 transition-colors rounded-md",
                  "sidebar-menu-button",
                  collapsed && "justify-center md:group-hover:justify-start"
                )}
              >
                <ChevronRight className="w-4 h-4 transition-transform text-muted-foreground flex-shrink-0" />
                {folderIcon}
                <span
                  className={cn(
                    "font-medium text-sm transition-opacity duration-200 truncate max-w-[180px]",
                    collapsed
                      ? "opacity-0 md:group-hover:opacity-100 md:group-hover:inline ml-2"
                      : "ml-2"
                  )}
                >
                  {name}{" "}
                  {fileCount > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({fileCount})
                    </span>
                  )}
                </span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className={cn(
              "bg-popover text-popover-foreground z-50",
              !isLongName && !collapsed && "hidden"
            )}
          >
            {name} {fileCount > 0}
          </TooltipContent>
        </Tooltip>
        <CollapsibleContent>
          <SidebarMenuSub
            className={cn(
              "pl-4 border-l border-border/40 ml-2.5 sidebar-menu-sub",
              collapsed ? "hidden md:group-hover:block" : ""
            )}
          >
            {items.map((subItem, i) => (
              <Tree
                key={
                  typeof subItem === "string" ? subItem : `${subItem[0]}-${i}`
                }
                item={subItem}
                collapsed={collapsed}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
