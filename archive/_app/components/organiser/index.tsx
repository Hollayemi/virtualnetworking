import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// ─── Type Definitions ────────────────────────────────────────────────────────────────

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "green" | "amber" | "red" | "blue" | "purple";
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  delta?: number;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  accent: string;
  bg: string;
}

interface CapBarProps {
  filled: number;
  total: number;
  color?: string;
}

// ─── Components ─────────────────────────────────────────────────────────────────────

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-navy-50 text-navy-400",
    green: "bg-green-50 text-green-700 border border-green-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    red: "bg-red-50 text-red-600 border border-red-200",
    blue: "bg-blue-50 text-blue-600 border border-blue-200",
    purple: "bg-purple-50 text-purple-600",
  };
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function StatCard({ label, value, sub, delta, icon: Icon, accent, bg }: StatCardProps) {
  const positive = delta !== undefined && delta > 0;
  
  return (
    <div className="bg-white border border-[#e8edf3] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
          <Icon size={17} style={{ color: accent }} />
        </div>
        {delta !== undefined && (
          <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
            {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div className="font-display text-[28px] font-bold text-[#0D1B2A] leading-none">{value}</div>
      <div className="text-[12px] text-[#64748b] mt-1">{label}</div>
      {sub && <div className="text-[11px] text-[#94a3b8] mt-0.5">{sub}</div>}
    </div>
  );
}

// Note: Make sure C is imported or defined in this file
// If C is imported from another file, add this import:
// import { C } from "@/app/components/organiser";

export function CapBar({ filled, total, color }: CapBarProps) {
  const pct = total ? Math.min((filled / total) * 100, 100) : 0;
  // Make sure C is accessible - either import it or define it
  // This is a temporary workaround if C isn't available:
  const defaultColors = {
    accent500: "#E8472F",
    amber: "#f59e0b",
    secondary500: "#8DC64C",
  };
  const c = pct > 90 ? defaultColors.accent500 : pct > 70 ? defaultColors.amber : defaultColors.secondary500;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#e8edf3] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color || c }} />
      </div>
      <span className="text-[11px] text-[#64748b] whitespace-nowrap font-medium">{total - filled} left</span>
    </div>
  );
}