import { MessageSquare, Send, Bot, User, Phone, PhoneCall, Sparkles, FileText, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Message = { role: "bot" | "user"; text: string };

const sampleMessages: Message[] = [
  { role: "bot", text: "Hello! I'm RanveerAI, your intelligent legal assistant. I can help you understand legal documents, identify risks, explain clauses, and guide your decisions. How can I assist you today?" },
];

const quickPrompts = [
  { icon: FileText, label: "Explain a clause", prompt: "Can you explain what an auto-renewal clause means in my contract?" },
  { icon: Shield, label: "Check compliance", prompt: "Is my rental agreement compliant with current tenant protection laws?" },
  { icon: AlertTriangle, label: "Find risks", prompt: "What are the potential risks in a standard NDA agreement?" },
  { icon: Sparkles, label: "Simplify terms", prompt: "Can you simplify the indemnification section of my agreement?" },
];

const LegalQA = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState("");
  const [showCallModal, setShowCallModal] = useState(false);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [
      ...prev,
      { role: "user", text: msg },
      { role: "bot", text: "Based on RanveerAI's analysis, the clause you're referring to typically means that the agreement will automatically extend for another term unless either party provides written notice of termination at least 30 days before the current term expires. This is a common provision in subscription and service agreements.\n\n⚠️ RanveerAI recommends: Set a calendar reminder 45 days before your contract renewal date to give yourself adequate time to evaluate whether to continue or terminate." },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold font-heading text-foreground">RanveerAI Assistant</h2>
        </div>
        <Button
          onClick={() => setShowCallModal(true)}
          className="bg-success text-success-foreground hover:bg-success/90 font-semibold gap-2"
        >
          <PhoneCall className="h-4 w-4" />
          Call RanveerAI
        </Button>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp.prompt)}
            className="bg-card border border-border rounded-lg p-3 text-left hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <qp.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs font-medium text-foreground">{qp.label}</p>
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm whitespace-pre-line ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
              }`}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-border p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask RanveerAI about any legal question..."
            className="flex-1 bg-secondary rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <button onClick={() => handleSend()} className="bg-primary text-primary-foreground rounded-lg p-2.5 hover:bg-primary/90 transition-colors">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50" onClick={() => setShowCallModal(false)}>
          <div className="bg-card rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-success" />
            </div>
            <h3 className="font-heading font-bold text-foreground text-xl mb-2">Call RanveerAI</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Connect with RanveerAI voice assistant for real-time legal guidance and document analysis.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-success text-success-foreground hover:bg-success/90 gap-2 py-5">
                <PhoneCall className="h-5 w-5" />
                Start Voice Call
              </Button>
              <Button variant="outline" onClick={() => setShowCallModal(false)} className="w-full border-border text-foreground">
                Cancel
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4">Voice calls are powered by RanveerAI's natural language engine</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalQA;
