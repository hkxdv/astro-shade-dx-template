import path from "path";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { LinterType, ProjectOptions, TemplateType } from "../types";
import { colors } from "../utils/colors";
import { copyDirSync } from "../utils/fs";
import { showProgressBar } from "../utils/readline";
import { configureLinter } from "./linter";

/**
 * Muestra el mensaje final con instrucciones
 * @param projectName Nombre del proyecto
 * @param templateType Tipo de template
 * @param linterType Tipo de linter
 */
export function showFinalMessage(
  projectName: string,
  templateType: TemplateType,
  linterType: LinterType
): void {
  console.log(
    `\n${colors.green}${colors.bright}✨ ¡Proyecto creado con éxito! ✨${colors.reset}`
  );
  console.log(`\n${colors.cyan}${colors.bright}Pasos a seguir:${colors.reset}`);
  console.log(
    `${colors.white}   1. ${colors.cyan}cd ${projectName}${colors.reset}`
  );
  console.log(`${colors.white}   2. ${colors.cyan}bun i${colors.reset}`);
  console.log(`${colors.white}   3. ${colors.cyan}bun dev${colors.reset}\n`);

  console.log(
    `${colors.magenta}${colors.bright}🌐 Tu aplicación estará disponible en: ${colors.reset}${colors.underscore}http://localhost:4321${colors.reset}\n`
  );

  // Mostrar información del linter solo si se ha configurado uno
  if (linterType !== "ninguno") {
    console.log(
      `${colors.white}   • ${colors.green}✓${colors.reset} ${
        linterType === "biome" ? "Biome" : "ESLint + Prettier"
      } para linting y formateo`
    );
  } else {
    console.log(
      `${colors.white}   • ${colors.yellow}○${colors.reset} Sin linter configurado ${colors.dim}(puedes añadirlo manualmente después)${colors.reset}`
    );
  }

  console.log("");
  console.log(
    `${colors.cyan}${colors.bright}Gracias por usar Astro Shade DX Template! 💙${colors.reset}\n`
  );
}

/**
 * Crea un nuevo proyecto con las opciones especificadas
 * @param options Opciones del proyecto
 */
export async function createProject(options: ProjectOptions): Promise<void> {
  const { projectName, templateType, linterType, projectDir } = options;

  try {
    // Verificar si el directorio ya existe
    if (existsSync(projectDir)) {
      console.error(
        `${colors.red}${colors.bright}❌ Error: El directorio "${projectName}" ya existe${colors.reset}`
      );
      process.exit(1);
    }

    // Crear directorio del proyecto
    console.log(
      `\n${colors.cyan}📁 Creando proyecto en "${colors.bright}${projectName}${colors.reset}${colors.cyan}"...${colors.reset}`
    );
    mkdirSync(projectDir, { recursive: true });

    // Definir rutas de directorios usando fileURLToPath para manejarlas dinámicamente
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let templatesDir;
    // Primero intentar encontrar la carpeta en la ubicación del paquete instalado
    const pkgPath = path.join(__dirname, "../..");
    // Si estamos en un paquete instalado (publicado en npm)
    if (existsSync(path.join(pkgPath, "package.json"))) {
      templatesDir = path.join(pkgPath, "templates");
    }
    // Si estamos en desarrollo local
    if (!templatesDir || !existsSync(templatesDir)) {
      // Buscar en ubicaciones alternativas
      const possiblePaths = [
        path.resolve(__dirname, "../../templates"),
        path.resolve(process.cwd(), "templates"),
        path.resolve(__dirname, "../templates"),
      ];

      for (const possiblePath of possiblePaths) {
        if (existsSync(possiblePath)) {
          templatesDir = possiblePath;
          break;
        }
      }
    }

    const templateDir = path.join(templatesDir || "", templateType);
    const linterDir =
      linterType !== "ninguno"
        ? path.join(templatesDir || "", "linters", linterType)
        : "";

    // Mostrar información del proyecto que se va a crear
    console.log(
      `\n${colors.green}${colors.bright}📋 Resumen del proyecto a crear:${colors.reset}`
    );
    console.log(
      `${colors.white}   • Nombre:${colors.reset} ${colors.bright}${projectName}${colors.reset}`
    );
    console.log(
      `${colors.white}   • Template:${colors.reset} ${
        colors.bright
      }${templateType}${colors.reset} ${colors.dim}(${
        templateType === "demo" ? "completo" : "básico"
      })${colors.reset}`
    );
    console.log(
      `${colors.white}   • Linter:${colors.reset} ${
        colors.bright
      }${linterType}${colors.reset} ${
        linterType === "ninguno"
          ? colors.dim + "(configurable con --eslint o --biome)" + colors.reset
          : ""
      }`
    );
    console.log(
      `${colors.white}   • Ubicación:${colors.reset} ${colors.dim}${projectDir}${colors.reset}\n`
    );

    // Verificar que el directorio del template existe
    if (!existsSync(templateDir)) {
      console.error(
        `${colors.red}${colors.bright}❌ Error: El directorio del template no existe${colors.reset}`
      );
      process.exit(1);
    }

    // Copiar template
    console.log(
      `${colors.cyan}📦 Copiando archivos del template...${colors.reset}`
    );

    // Mostrar barra de progreso simulada
    const steps = 5;
    for (let i = 0; i < steps; i++) {
      await showProgressBar(i + 1, steps);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Copiar el template
    copyDirSync(templateDir, projectDir);

    // Aplicar configuración del linter
    await configureLinter(linterType, linterDir, projectDir);

    console.log(
      `${colors.green}${colors.bright}✅ Template copiado con éxito${colors.reset}`
    );

    // Mostrar mensaje final
    showFinalMessage(projectName, templateType, linterType);
  } catch (error) {
    console.error(
      `${colors.red}${colors.bright}❌ Error al crear el proyecto: ${
        error instanceof Error ? error.message : String(error)
      }${colors.reset}`
    );
    process.exit(1);
  }
}
