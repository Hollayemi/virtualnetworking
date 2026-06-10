import type { ReactNode } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative flex flex-col">
      <img src="/images/connbg.png" alt="Background pattern" className="pointer-events-none object-cover absolute h-full top-0 left-1/2 -translate-x-1/2 opacity-5" />
      <div className="bg-[#FAFAF8] absolute w-full h-full left-0 top-0 opacity-9" />
      <main className="flex-1 flex relative items-center justify-center px-4 py-12">
        {children}
      </main>

      <footer className="py-6 text-center text-xs text-slate-400 border-t border-[#e8edf3]">
        © {new Date().getFullYear()} VirtualNet Ltd · Abuja, Nigeria
      </footer>
    </div>
  );
}
