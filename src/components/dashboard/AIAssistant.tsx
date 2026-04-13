import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi! I am your AI dashboard assistant. I can help analyze your insights. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response streaming
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { 
          id: (Date.now() + 1).toString(), 
          role: 'assistant', 
          content: "Based on the current dashboard data, we are seeing a 12.5% increase in total revenue. The traffic is predominantly Direct (35%), followed closely by Organic (28%). I recommend increasing focus on the Referral channel to boost conversions!"
        }
      ]);
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn("fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl transition-all duration-300 z-50 hover:scale-105", isOpen && "scale-0 opacity-0")}
      >
        <MessageSquare className="w-6 h-6" />
      </Button>

      <div
        className={cn(
          "fixed bottom-6 right-6 w-80 sm:w-96 shadow-2xl transition-all duration-300 origin-bottom-right z-50",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <Card className="flex flex-col h-[500px] border-border/50 overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex items-center justify-between p-4 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-2 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Insight AI</h3>
                <p className="text-xs text-muted-foreground">Dashboard Assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm", msg.role === 'assistant' ? "bg-muted" : "bg-primary text-primary-foreground ml-auto")}>
                  {msg.content}
                </div>
              ))}
              {isTyping && (
                <div className="flex w-max max-w-[80%] items-center gap-1 rounded-lg bg-muted px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-3 border-t bg-muted/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your data..."
                className="flex-1 h-9 bg-background focus-visible:ring-offset-0"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="h-9 w-9 shrink-0">
                <Send className="w-4 h-4 -ml-0.5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}
