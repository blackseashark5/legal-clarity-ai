import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, FileText, AlertTriangle, MessageSquare, Brain, Eye, ChevronRight, Scale, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: FileText, title: "Simplify Legal Text", desc: "Transform complex legal language into clear, easy-to-understand summaries." },
  { icon: AlertTriangle, title: "Risk Detection", desc: "Automatically identify hidden penalties, risks, and unfavorable terms." },
  { icon: Shield, title: "Obligation Tracking", desc: "Highlight your obligations, rights, and important clauses at a glance." },
  { icon: MessageSquare, title: "Interactive Q&A", desc: "Ask questions about any clause and get instant, contextual answers." },
  { icon: Brain, title: "Smart Guidance", desc: "Step-by-step guidance through documents with actionable recommendations." },
  { icon: Eye, title: "Clause Analysis", desc: "Deep analysis of each clause with compliance checks and suggestions." },
];

const stats = [
  { value: "10K+", label: "Documents Analyzed" },
  { value: "99.2%", label: "Accuracy Rate" },
  { value: "50K+", label: "Users Trusted" },
  { value: "24/7", label: "AI Availability" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground">RanveerAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
          </div>
          <Button onClick={() => navigate("/app")} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            Launch App <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              AI-Powered Legal Intelligence
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground leading-tight mb-6">
              Review Legal Documents<br />
              <span className="text-primary">Faster with RanveerAI</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Transform complex legal text into clear, actionable understanding. Make informed decisions before signing any document.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/app")} className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 font-semibold">
                Launch App <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 border-border text-foreground hover:bg-secondary">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl font-bold font-heading text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mt-2">
              More Accurate Legal Reviews
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Free up your legal team to focus on quality with RanveerAI contract review software.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mt-2">
              The 4 Stages of RanveerAI
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {["Upload Document", "AI Analysis", "Review Insights", "Take Action"].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex items-center gap-4">
                <div className={`px-6 py-3 rounded-lg border-2 font-heading font-semibold text-sm ${i === 1 ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground'}`}>
                  {step}
                </div>
                {i < 3 && <div className="hidden md:block w-12 h-0.5 bg-border" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar / Important Dates Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Stay Organized</span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mt-2 mb-4">
                Never Miss a Deadline
              </h2>
              <p className="text-muted-foreground mb-6">
                RanveerAI automatically extracts important dates from your legal documents — hearings, term sheet signings, renewal deadlines — and organizes them in an interactive calendar.
              </p>
              <ul className="space-y-3">
                {["Hearing date reminders", "Contract renewal alerts", "Term sheet signing deadlines", "Compliance review dates"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground">April 2026</h3>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
                  <div key={d} className="py-2 font-semibold text-muted-foreground">{d}</div>
                ))}
                {Array.from({ length: 2 }, (_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: 30 }, (_, i) => {
                  const day = i + 1;
                  const isHighlight = [8, 15, 22].includes(day);
                  const isDeadline = [3, 24].includes(day);
                  return (
                    <div key={day} className={`py-2 rounded-md text-sm ${isHighlight ? 'bg-primary text-primary-foreground font-bold' : isDeadline ? 'bg-destructive/10 text-destructive font-bold' : 'text-foreground hover:bg-secondary'}`}>
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary" /> Hearings</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-destructive/30" /> Deadlines</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-20 px-6 bg-card">
        <div className="container mx-auto text-center max-w-3xl">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Impact</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mt-2 mb-6">
            Transform Legal Documents into Actionable Knowledge
          </h2>
          <p className="text-muted-foreground mb-10">
            RanveerAI makes legal understanding accessible to everyone. Reduce uninformed consent, improve transparency, and enable safer participation in legal and financial ecosystems.
          </p>
          <Button size="lg" onClick={() => navigate("/app")} className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 font-semibold">
            Get Started with RanveerAI <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Scale className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold text-foreground">RanveerAI</span>
          </div>
          <p>© 2026 RanveerAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
