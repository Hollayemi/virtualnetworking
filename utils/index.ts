
/** Join conditional class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** "Amara Okafor" -> "AO". Falls back to the first two characters if there's only one word. */
export function getInitials(name: string = ''): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** 42 -> "42 cr" */
export function formatCredits(n: number): string {
  return `${n.toLocaleString()} cr`;
}

/** 18240 -> "$18,240" */
export function formatCurrency(n: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);
}

/** 3910 -> "3.9K" */
export function formatCompactNumber(n: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(n);
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', opts ?? { month: 'short', day: 'numeric' });
}

type dateType = 'relative' | 'datetime' | "date" | "time" | "short"
export function formatTime(time: string, type: dateType = "relative"): string {
    if (!time) return 'N/A';

    let date: Date;

    if (time.match(/^\d{4}-\d{2}-\d{2}T/)) {
        date = new Date(time);
    } else {
        return time;
    }

    if (isNaN(date.getTime())) return 'Invalid date';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    switch (type) {
        case 'relative':
            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
            if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
            if (diffDays === 1) return 'Yesterday';
            if (diffDays < 7) return `${diffDays} days ago`;
            return date.toLocaleDateString();

        case 'time':
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        case 'date':
            return date.toLocaleDateString();

        case 'datetime':
            return date.toLocaleString();

        case 'short':
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;

        default:
            return date.toISOString();
    }
}


/** Clamp a number between min and max. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}
