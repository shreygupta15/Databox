import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { CommandPalette, CommandPaletteButton } from './CommandPalette';
import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title = 'Overview' }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 shrink-0 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-sm font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <CommandPaletteButton />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Moon className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors relative">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary ml-1">
                JD
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
        <CommandPalette />
      </div>
    </SidebarProvider>
  );
}
