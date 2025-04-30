import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  AstroLight, 
  ReactLight, 
  TailwindCSS,
  TypeScript, 
  Bun, 
  ShadcnUiLight 
} from "@ridemountainpig/svgl-react";

/**
 * Props para el componente TechLogos
 * @interface TechLogosProps
 * @property {string} [className] - Clases CSS opcionales para aplicar al componente
 */
interface TechLogosProps {
  className?: string;
}

/**
 * Componente que muestra los logos de las tecnologías utilizadas en el proyecto
 * en un grid de tarjetas con transiciones suaves al pasar el mouse
 *
 * @param {TechLogosProps} props - Propiedades del componente
 * @returns {JSX.Element} Grid de logos de tecnologías
 */
export function TechLogos({ className }: TechLogosProps) {
  const tech = [
    {
      name: "Astro",
      logo: <AstroLight />,
      website: "https://astro.build",
      color: "hover:border-[#ff5d01] hover:shadow-[#ff5d0133]",
    },
    {
      name: "React",
      logo: <ReactLight />,
      website: "https://react.dev",
      color: "hover:border-[#149eca] hover:shadow-[#149eca33]",
    },
    {
      name: "Tailwind CSS",
      logo: <TailwindCSS />,
      website: "https://tailwindcss.com",
      color: "hover:border-[#38bdf8] hover:shadow-[#38bdf833]",
    },
    {
      name: "TypeScript",
      logo: <TypeScript />,
      website: "https://www.typescriptlang.org",
      color: "hover:border-[#3178c6] hover:shadow-[#3178c633]",
    },
    {
      name: "Bun",
      logo: <Bun />,
      website: "https://bun.sh",
      color: "hover:border-[#fbf0df] hover:shadow-[#fbf0df33]",
    },
    {
      name: "shadcn/ui",
      logo: <ShadcnUiLight />,
      website: "https://ui.shadcn.com",
      color: "hover:border-[#fff] hover:shadow-[#ffffff33]",
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {tech.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <a
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-105"
          >
            <Card
              className={cn(
                "overflow-hidden border border-muted hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md",
                item.color
              )}
            >
              <CardContent className="flex items-center justify-center p-6 h-32">
                <div className="max-h-16 max-w-[140px] h-16 w-16">
                  {item.logo}
                </div>
              </CardContent>
            </Card>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
