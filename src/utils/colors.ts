export class ConsoleColors {
  private enabled: boolean = true;

  constructor(enabled = true) {
    this.enabled = enabled;
  }

  /**
   * Desactiva los colores en la consola
   */
  disable(): void {
    this.enabled = false;
  }

  /**
   * Colorea un texto con el color especificado
   * @param text Texto a colorear
   * @param color Código de color ANSI
   * @returns Texto coloreado
   */
  colorize(text: string, color: string): string {
    return this.enabled ? `${color}${text}${this.reset}` : text;
  }

  // Colores básicos
  get reset(): string {
    return this.enabled ? "\x1b[0m" : "";
  }
  get bright(): string {
    return this.enabled ? "\x1b[1m" : "";
  }
  get dim(): string {
    return this.enabled ? "\x1b[2m" : "";
  }
  get underscore(): string {
    return this.enabled ? "\x1b[4m" : "";
  }

  // Colores de texto
  get red(): string {
    return this.enabled ? "\x1b[31m" : "";
  }
  get green(): string {
    return this.enabled ? "\x1b[32m" : "";
  }
  get yellow(): string {
    return this.enabled ? "\x1b[33m" : "";
  }
  get blue(): string {
    return this.enabled ? "\x1b[34m" : "";
  }
  get magenta(): string {
    return this.enabled ? "\x1b[35m" : "";
  }
  get cyan(): string {
    return this.enabled ? "\x1b[36m" : "";
  }
  get white(): string {
    return this.enabled ? "\x1b[37m" : "";
  }
}

// Exportar una instancia por defecto
export const colors = new ConsoleColors();
