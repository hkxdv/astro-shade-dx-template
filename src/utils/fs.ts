import { cpSync, existsSync, mkdirSync, readdirSync } from "fs";
import path from "path";
import { colors } from "./colors";

/**
 * Copia directorios recursivamente
 * @param src Directorio de origen
 * @param dest Directorio de destino
 * @returns void
 */
export function copyDirSync(src: string, dest: string): void {
  if (!existsSync(src)) {
    console.error(
      `${colors.red}${colors.bright}❌ Error: El directorio de origen "${src}" no existe${colors.reset}`
    );
    return;
  }

  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src, { withFileTypes: true });
  const skipFiles = [
    ".git",
    "node_modules",
    ".DS_Store",
    "dist",
    ".bunfig.toml",
    "bun.lockb",
    "bun.lock",
    ".vscode",
  ];

  for (const entry of entries) {
    if (skipFiles.includes(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}
