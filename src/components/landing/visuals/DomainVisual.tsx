import type { DomainId } from "@/content/site";
import { IsoChip } from "./IsoChip";
import { IsoStack } from "./IsoStack";
import { RobotArm } from "./RobotArm";

/** The illustration that stands for each technology area. */
export function DomainVisual({
  id,
  size = "sm",
  className = "",
}: {
  id: DomainId;
  size?: "sm" | "lg";
  className?: string;
}) {
  const lg = size === "lg";
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {id === "ai-engineering" && (
        <IsoStack
          layers={[
            { label: "Applications", pattern: "core" },
            { label: "Retrieval", pattern: "modules" },
            { label: "Infrastructure", pattern: "grid" },
          ]}
          gap={lg ? 40 : 34}
          className={lg ? "w-full max-w-[250px]" : "w-full max-w-[148px]"}
        />
      )}
      {id === "intelligent-systems" && (
        <IsoChip variant="sensor" className="h-full w-auto max-w-full" />
      )}
      {id === "robotics" && <RobotArm className="h-full w-auto max-w-full" />}
      {id === "deeptech" && <IsoChip variant="compute" className="h-full w-auto max-w-full" />}
    </div>
  );
}
