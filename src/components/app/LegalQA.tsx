import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useState } from "react";

const sampleMessages = [
  { role: "bot" as const, text: "Hello! I'm RanveerAI Legal Assistant. Ask me anything about your legal documents or general legal questions." },
];

const LegalQA = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { role: "user" as const, text: input },
      { role: "bot" as const, text: "Based on RanveerAI's analysis, the clause you're referring to typically means that the agreement will automatically extend for another term unless either party provides written notice of termination at least 30 days before the current term expires. This is common in subscription-based agreements." },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold font-heading text-foreground">RanveerAI Legal Q&A</h2>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'bot' && <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><Bot className="h-4 w-4 text-primary" /></div>}
              <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
              }`}>
                {msg.text}
              </div>
              {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0"><User className="h-4 w-4 text-accent-foreground" /></div>}
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask RanveerAI about your legal document..."
            className="flex-1 bg-secondary rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <button onClick={handleSend} className="bg-primary text-primary-foreground rounded-lg p-2 hover:bg-primary/90 transition-colors">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalQA;
