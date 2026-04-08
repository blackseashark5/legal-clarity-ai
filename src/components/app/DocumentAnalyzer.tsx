import { Upload, FileText, AlertTriangle, Shield, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const DocumentAnalyzer = () => {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading text-foreground">RanveerAI Document Analyzer</h2>
        <p className="text-muted-foreground mt-1">Upload a legal document to get AI-powered analysis and simplified explanations.</p>
      </div>

      {!uploaded ? (
        <div
          onClick={() => setUploaded(true)}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
        >
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-medium text-foreground">Drop your legal document here</p>
          <p className="text-sm text-muted-foreground mt-1">Supports PDF, DOCX, TXT</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">sample_agreement.pdf</span>
              <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full ml-auto">Analyzed</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <AlertTriangle className="h-5 w-5 text-destructive mb-2" />
                <p className="text-sm font-semibold text-foreground">3 Risks Found</p>
                <p className="text-xs text-muted-foreground mt-1">Auto-renewal clause, penalty terms, liability waiver</p>
              </div>
              <div className="bg-accent border border-primary/20 rounded-lg p-4">
                <Shield className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-semibold text-foreground">5 Obligations</p>
                <p className="text-xs text-muted-foreground mt-1">Payment terms, notice periods, confidentiality</p>
              </div>
              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-success mb-2" />
                <p className="text-sm font-semibold text-foreground">4 Rights</p>
                <p className="text-xs text-muted-foreground mt-1">Termination right, data access, dispute resolution</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-heading font-semibold text-foreground mb-3">Simplified Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This agreement binds you to a 24-month subscription with automatic renewal. You must provide 30 days' notice before termination. 
              The vendor limits their liability to the subscription fee paid in the last 12 months. There is a non-compete clause that restricts 
              your use of similar services for 6 months after termination. <span className="text-destructive font-medium">RanveerAI recommends reviewing the auto-renewal and liability sections carefully.</span>
            </p>
          </div>
          <Button variant="outline" onClick={() => setUploaded(false)} className="border-border text-foreground">
            Analyze Another Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentAnalyzer;
