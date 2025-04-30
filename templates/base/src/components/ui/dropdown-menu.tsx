import * as React from "react";

import { cn } from "@/lib/utils";

const DropdownMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownMenuTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: () => setOpen(!open),
          });
        }
        if (React.isValidElement(child) && child.type === DropdownMenuContent) {
          return open ? child : null;
        }
        return child;
      })}
    </div>
  );
};
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuTrigger = ({
  children,
  asChild = false,
  onClick,
}: {
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn("cursor-pointer", { "inline-flex": !asChild })}
    >
      {children}
    </div>
  );
};
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = ({
  children,
  align = "start",
  className,
}: {
  children: React.ReactNode;
  align?: "start" | "end" | "center";
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "z-50 min-w-32 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
        {
          "right-0": align === "end",
          "left-0": align === "start",
          "left-1/2 -translate-x-1/2": align === "center",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </div>
  );
};
DropdownMenuItem.displayName = "DropdownMenuItem";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}; 