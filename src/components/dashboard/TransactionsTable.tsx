import { ExportButton } from './ExportButton';

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

interface TransactionsTableProps {
  data: Transaction[];
}

const statusVariant: Record<string, string> = {
  completed: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function TransactionsTable({ data }: TransactionsTableProps) {
  return (
    <div className="chart-container animate-fade-up stagger-3" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium">Recent Transactions</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Latest payment activity</p>
        </div>
        <ExportButton data={data} filename="transactions" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
              <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tx) => (
              <tr key={tx.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{tx.id}</td>
                <td className="py-3 px-2 font-medium">{tx.customer}</td>
                <td className="py-3 px-2 text-right font-medium">${tx.amount.toLocaleString()}</td>
                <td className="py-3 px-2 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusVariant[tx.status] || ''}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-right text-muted-foreground">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
