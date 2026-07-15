import { Loader2, AlertTriangle, Inbox } from 'lucide-react';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/[0.07] bg-[#0D1712] p-14 text-[#92A79C]">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-[13.5px]">{label}</span>
    </div>
  );
}

export function ErrorState({ label = "Something went wrong — please try again." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#D9756B]/20 bg-[#0D1712] p-14 text-center">
      <AlertTriangle className="h-5 w-5 text-[#E0A093]" />
      <span className="text-[13.5px] text-[#E0A093]">{label}</span>
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.07] bg-[#0D1712] p-14 text-center">
      <Inbox className="h-5 w-5 text-[#5F736A]" />
      <span className="text-[13.5px] text-[#92A79C]">{label}</span>
    </div>
  );
}