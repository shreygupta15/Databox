import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileText, Download, Filter } from 'lucide-react';

const reports = [
  { name: 'Monthly Revenue Summary', date: 'Mar 2024', type: 'Revenue', status: 'Ready' },
  { name: 'User Growth Report', date: 'Mar 2024', type: 'Users', status: 'Ready' },
  { name: 'Churn Analysis Q1', date: 'Q1 2024', type: 'Retention', status: 'Ready' },
  { name: 'Traffic Sources Breakdown', date: 'Mar 2024', type: 'Traffic', status: 'Generating' },
  { name: 'Conversion Funnel Report', date: 'Feb 2024', type: 'Conversion', status: 'Ready' },
];

const Reports = () => {
  return (
    <DashboardLayout title="Reports">
      <div className="chart-container animate-fade-up" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-medium">Custom Reports</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Generate and download insights</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Filter className="h-3.5 w-3.5" />
            New Report
          </button>
        </div>
        <div className="space-y-2">
          {reports.map((report) => (
            <div
              key={report.name}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.type} · {report.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  report.status === 'Ready'
                    ? 'bg-success/10 text-success'
                    : 'bg-warning/10 text-warning'
                }`}>
                  {report.status}
                </span>
                {report.status === 'Ready' && (
                  <button className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
