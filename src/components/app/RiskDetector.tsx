import { AlertTriangle, Shield, Eye, CheckCircle } from "lucide-react";

const risks = [
  { severity: "high", title: "Auto-Renewal Clause", desc: "Contract automatically renews for 24 months unless 30-day prior notice is given.", action: "Negotiate a shorter renewal period or add a reminder clause." },
  { severity: "high", title: "Unlimited Liability", desc: "No cap on liability for indirect or consequential damages.", action: "Request liability cap limited to fees paid in last 12 months." },
  { severity: "medium", title: "Non-Compete Restriction", desc: "6-month restriction on using competing services post-termination.", action: "Negotiate removal or reduction of non-compete duration." },
  { severity: "low", title: "Data Retention Policy", desc: "Provider retains your data for 90 days after termination.", action: "Request immediate data deletion upon termination." },
];

const RiskDetector = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    <div>
      <h2 className="text-2xl font-bold font-heading text-foreground">RanveerAI Risk Detector</h2>
      <p className="text-muted-foreground mt-1">Proactively detect potential dangers or unfavorable terms in your documents.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
        <p className="text-2xl font-bold font-heading text-foreground">2</p>
        <p className="text-xs text-muted-foreground">High Risk</p>
      </div>
      <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 text-center">
        <Eye className="h-8 w-8 text-warning mx-auto mb-2" />
        <p className="text-2xl font-bold font-heading text-foreground">1</p>
        <p className="text-xs text-muted-foreground">Medium Risk</p>
      </div>
      <div className="bg-success/5 border border-success/20 rounded-xl p-4 text-center">
        <Shield className="h-8 w-8 text-success mx-auto mb-2" />
        <p className="text-2xl font-bold font-heading text-foreground">1</p>
        <p className="text-xs text-muted-foreground">Low Risk</p>
      </div>
    </div>
    <div className="space-y-3">
      {risks.map((r, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
              r.severity === 'high' ? 'bg-destructive' : r.severity === 'medium' ? 'bg-warning' : 'bg-success'
            }`} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{r.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  r.severity === 'high' ? 'bg-destructive/10 text-destructive' : r.severity === 'medium' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                }`}>{r.severity}</span>
              </div>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
              <div className="mt-2 flex items-start gap-2 bg-accent/50 rounded-lg p-3">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-foreground"><span className="font-medium">RanveerAI suggests:</span> {r.action}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RiskDetector;
