import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { LayoutDashboard, Users, DollarSign, Activity, FileText, Settings, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const pages = [
  { title: 'Overview', url: '/', icon: LayoutDashboard, keywords: 'home dashboard overview kpi' },
  { title: 'User Analytics', url: '/users', icon: Users, keywords: 'users retention sessions active' },
  { title: 'Revenue', url: '/revenue', icon: DollarSign, keywords: 'revenue mrr arr money transactions' },
  { title: 'Activity Feed', url: '/activity', icon: Activity, keywords: 'activity events feed realtime' },
  { title: 'Reports', url: '/reports', icon: FileText, keywords: 'reports export download csv pdf' },
  { title: 'Settings', url: '/settings', icon: Settings, keywords: 'settings preferences config' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const goTo = useCallback((url: string) => {
    navigate(url);
    setOpen(false);
  }, [navigate]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.url}
              value={`${page.title} ${page.keywords}`}
              onSelect={() => goTo(page.url)}
            >
              <page.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{page.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => { toggleTheme(); setOpen(false); }}>
            {theme === 'dark' ? <Sun className="mr-2 h-4 w-4 text-muted-foreground" /> : <Moon className="mr-2 h-4 w-4 text-muted-foreground" />}
            <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

interface CommandPaletteButtonProps {
  onClick: () => void;
}

export function CommandPaletteButton() {
  const [, setOpen] = useState(false);

  const handleClick = () => {
    // Trigger keyboard shortcut
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden sm:inline text-[10px] bg-background/60 px-1.5 py-0.5 rounded border border-border/50">⌘K</kbd>
    </button>
  );
}
