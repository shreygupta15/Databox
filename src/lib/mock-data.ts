// Mock data generators for the analytics dashboard

export interface KpiData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  revenue: number;
  users: number;
  sessions: number;
}

export interface ActivityEvent {
  id: string;
  type: 'signup' | 'purchase' | 'upgrade' | 'alert' | 'milestone';
  message: string;
  timestamp: Date;
  user?: string;
  amount?: number;
}

export interface UserMetric {
  name: string;
  active: number;
  new: number;
  returning: number;
}

export const generateKpis = (): KpiData[] => [
  { title: 'Total Revenue', value: '$48,352', change: 12.5, trend: 'up', icon: 'dollar' },
  { title: 'Active Users', value: '2,847', change: 8.2, trend: 'up', icon: 'users' },
  { title: 'Growth Rate', value: '23.1%', change: 4.3, trend: 'up', icon: 'trending' },
  { title: 'Active Sessions', value: '1,429', change: -2.1, trend: 'down', icon: 'activity' },
];

export const generateRevenueData = (): ChartDataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((name, i) => ({
    name,
    revenue: 20000 + Math.floor(Math.random() * 30000) + i * 2000,
    users: 800 + Math.floor(Math.random() * 1500) + i * 100,
    sessions: 1500 + Math.floor(Math.random() * 3000) + i * 200,
  }));
};

export const generateUserMetrics = (): UserMetric[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(name => ({
    name,
    active: 200 + Math.floor(Math.random() * 300),
    new: 50 + Math.floor(Math.random() * 100),
    returning: 150 + Math.floor(Math.random() * 200),
  }));
};

export const generatePieData = () => [
  { name: 'Direct', value: 35, fill: 'hsl(217, 91%, 60%)' },
  { name: 'Organic', value: 28, fill: 'hsl(172, 66%, 50%)' },
  { name: 'Referral', value: 20, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Social', value: 17, fill: 'hsl(280, 65%, 60%)' },
];

const userNames = ['Sarah Chen', 'Alex Rivera', 'Jordan Kim', 'Morgan Lee', 'Casey Taylor', 'Riley Park', 'Avery Quinn', 'Blake Foster'];
const eventTemplates: { type: ActivityEvent['type']; messages: string[] }[] = [
  { type: 'signup', messages: ['signed up for a free trial', 'created an account', 'joined the platform'] },
  { type: 'purchase', messages: ['upgraded to Pro plan', 'purchased Enterprise license', 'renewed subscription'] },
  { type: 'upgrade', messages: ['upgraded from Starter to Pro', 'added 5 team seats', 'enabled advanced analytics'] },
  { type: 'alert', messages: ['Traffic spike detected on /api', 'Unusual login pattern detected', 'Server response time above threshold'] },
  { type: 'milestone', messages: ['reached 1000 API calls today', 'completed onboarding', 'hit monthly revenue target'] },
];

let eventCounter = 0;

export const generateActivityEvent = (): ActivityEvent => {
  const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
  const user = userNames[Math.floor(Math.random() * userNames.length)];
  const message = template.messages[Math.floor(Math.random() * template.messages.length)];
  eventCounter++;
  return {
    id: `evt-${eventCounter}-${Date.now()}`,
    type: template.type,
    message: template.type === 'alert' ? message : `${user} ${message}`,
    user: template.type !== 'alert' ? user : undefined,
    timestamp: new Date(),
    amount: template.type === 'purchase' ? Math.floor(Math.random() * 500) + 29 : undefined,
  };
};

export const generateInitialActivity = (count: number): ActivityEvent[] => {
  const events: ActivityEvent[] = [];
  for (let i = 0; i < count; i++) {
    const event = generateActivityEvent();
    event.timestamp = new Date(Date.now() - (count - i) * 60000 * Math.random() * 10);
    events.push(event);
  }
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const generateTransactions = () => [
  { id: 'TXN-001', customer: 'Acme Corp', amount: 2400, status: 'completed', date: '2024-03-15' },
  { id: 'TXN-002', customer: 'Globex Inc', amount: 1850, status: 'completed', date: '2024-03-14' },
  { id: 'TXN-003', customer: 'Initech', amount: 3200, status: 'pending', date: '2024-03-14' },
  { id: 'TXN-004', customer: 'Umbrella Corp', amount: 950, status: 'completed', date: '2024-03-13' },
  { id: 'TXN-005', customer: 'Stark Industries', amount: 5100, status: 'failed', date: '2024-03-13' },
  { id: 'TXN-006', customer: 'Wayne Enterprises', amount: 4200, status: 'completed', date: '2024-03-12' },
  { id: 'TXN-007', customer: 'Cyberdyne Systems', amount: 1600, status: 'pending', date: '2024-03-12' },
  { id: 'TXN-008', customer: 'Oscorp', amount: 2900, status: 'completed', date: '2024-03-11' },
];
