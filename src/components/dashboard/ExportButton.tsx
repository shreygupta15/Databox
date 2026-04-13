import { toast } from 'sonner';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  data: Record<string, any>[];
  filename: string;
  label?: string;
}

export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h];
        const str = String(val ?? '');
        return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  toast.success('Export complete', { description: `${filename}.csv downloaded` });
}

export function ExportButton({ data, filename, label = 'Export CSV' }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportToCSV(data, filename)}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-secondary/50 text-foreground rounded-lg hover:bg-secondary transition-colors"
    >
      <Download className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
