import { Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloralDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center w-full my-8 md:my-12", className)}>
      <div className="flex-grow border-t border-primary/20"></div>
      <span className="px-4">
        <Flower2 className="w-6 h-6 text-primary" />
      </span>
      <div className="flex-grow border-t border-primary/20"></div>
    </div>
  );
}
