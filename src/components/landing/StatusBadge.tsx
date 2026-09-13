// Legacy: only referenced by the unused pre-V2 BeyondSoftware section. The V2
// site no longer shows capability status labels.
export type CapabilityStatus = "current" | "building" | "exploring";

const LABEL: Record<CapabilityStatus, string> = {
  current: "Current",
  building: "Building",
  exploring: "Exploring",
};

export function StatusBadge({ status }: { status: CapabilityStatus }) {
  return (
    <span className="inline-flex items-center rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] leading-none tracking-[0.12em] uppercase">
      {LABEL[status]}
    </span>
  );
}
