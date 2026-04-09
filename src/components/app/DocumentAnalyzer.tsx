import { Upload, FileText, AlertTriangle, Shield, CheckCircle, Loader2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import * as pdfjsLib from "pdfjs-dist";

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface AnalysisResult {
  fileName: string;
  pageCount: number;
  fullText: string;
  risks: string[];
  obligations: string[];
  rights: string[];
  summary: string;
}

function analyzeText(text: string): Omit<AnalysisResult, "fileName" | "pageCount" | "fullText"> {
  const lower = text.toLowerCase();

  const riskKeywords = [
    { pattern: /auto[- ]?renew/i, label: "Auto-renewal clause detected" },
    { pattern: /penalt(y|ies)/i, label: "Penalty terms present" },
    { pattern: /liabilit(y|ies)\s*(shall|will)?\s*(not|be limited)/i, label: "Liability limitation clause" },
    { pattern: /waiver/i, label: "Waiver clause found" },
    { pattern: /indemnif(y|ication)/i, label: "Indemnification requirement" },
    { pattern: /non[- ]?compete/i, label: "Non-compete restriction" },
    { pattern: /terminat(e|ion)\s*(without|for)\s*cause/i, label: "Termination without cause allowed" },
    { pattern: /liquidated damages/i, label: "Liquidated damages clause" },
    { pattern: /force majeure/i, label: "Force majeure clause" },
  ];

  const obligationKeywords = [
    { pattern: /shall pay|payment (is |shall |will )?due/i, label: "Payment obligation" },
    { pattern: /notice\s*(period|of|shall)/i, label: "Notice period requirement" },
    { pattern: /confidential(ity)?/i, label: "Confidentiality obligation" },
    { pattern: /shall (deliver|provide|submit)/i, label: "Delivery/submission obligation" },
    { pattern: /comply with|compliance/i, label: "Compliance requirement" },
    { pattern: /report(ing)?\s*(requirement|obligation)/i, label: "Reporting obligation" },
  ];

  const rightsKeywords = [
    { pattern: /right to terminat/i, label: "Right to terminate" },
    { pattern: /right to (access|inspect)/i, label: "Right to access/inspect" },
    { pattern: /dispute resolution|arbitration/i, label: "Dispute resolution mechanism" },
    { pattern: /right to (cure|remedy)/i, label: "Right to cure/remedy" },
    { pattern: /intellectual property.*retain/i, label: "IP retention rights" },
    { pattern: /assign(ment)?\s*right/i, label: "Assignment rights" },
  ];

  const risks = riskKeywords.filter(k => k.pattern.test(text)).map(k => k.label);
  const obligations = obligationKeywords.filter(k => k.pattern.test(text)).map(k => k.label);
  const rights = rightsKeywords.filter(k => k.pattern.test(text)).map(k => k.label);

  if (risks.length === 0) risks.push("No major risks detected — review manually recommended");
  if (obligations.length === 0) obligations.push("No specific obligations identified");
  if (rights.length === 0) rights.push("No explicit rights clauses found");

  const wordCount = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const previewSentences = sentences.slice(0, 5).join(". ").trim();

  const summary = `This document contains approximately ${wordCount.toLocaleString()} words across its pages. ` +
    `RanveerAI identified ${risks.length} potential risk(s), ${obligations.length} obligation(s), and ${rights.length} right(s). ` +
    (previewSentences ? `Document begins with: "${previewSentences.slice(0, 300)}..."` : "") +
    ` RanveerAI recommends reviewing all highlighted items carefully before signing.`;

  return { risks, obligations, rights, summary };
}

const DocumentAnalyzer = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFullText, setShowFullText] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setLoading(true);
    setAnalysis(null);

    try {
      let fullText = "";
      let pageCount = 0;

      if (file.type === "application/pdf") {
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        pageCount = pdf.numPages;
        const pages: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          pages.push(content.items.map((item: any) => item.str).join(" "));
        }
        fullText = pages.join("\n\n");
      } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        fullText = await file.text();
        pageCount = 1;
      } else {
        setError("Unsupported file type. Please upload a PDF or TXT file.");
        setLoading(false);
        return;
      }

      if (!fullText.trim()) {
        setError("No readable text found in this document. It may be a scanned image PDF.");
        setLoading(false);
        return;
      }

      const result = analyzeText(fullText);
      setAnalysis({ fileName: file.name, pageCount, fullText, ...result });
    } catch (e: any) {
      setError("Failed to process document: " + (e?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading text-foreground">RanveerAI Document Analyzer</h2>
        <p className="text-muted-foreground mt-1">Upload a legal document to get AI-powered analysis and simplified explanations.</p>
      </div>

      {loading && (
        <div className="border-2 border-dashed border-primary/40 rounded-xl p-12 text-center bg-accent/30">
          <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="font-medium text-foreground">Processing your document...</p>
          <p className="text-sm text-muted-foreground mt-1">Extracting text and analyzing clauses</p>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 text-center">
          <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive font-medium">{error}</p>
          <Button variant="outline" className="mt-3" onClick={() => { setError(null); }}>Try Again</Button>
        </div>
      )}

      {!analysis && !loading && !error && (
        <div
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
        >
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-medium text-foreground">Drop your legal document here or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">Supports PDF, TXT</p>
          <input ref={fileRef} type="file" accept=".pdf,.txt" className="hidden" onChange={onFileSelect} />
        </div>
      )}

      {analysis && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">{analysis.fileName}</span>
              <span className="text-xs text-muted-foreground">{analysis.pageCount} page(s)</span>
              <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full ml-auto">Analyzed</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <AlertTriangle className="h-5 w-5 text-destructive mb-2" />
                <p className="text-sm font-semibold text-foreground">{analysis.risks.length} Risk(s) Found</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  {analysis.risks.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </div>
              <div className="bg-accent border border-primary/20 rounded-lg p-4">
                <Shield className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-semibold text-foreground">{analysis.obligations.length} Obligation(s)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  {analysis.obligations.map((o, i) => <li key={i}>• {o}</li>)}
                </ul>
              </div>
              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-success mb-2" />
                <p className="text-sm font-semibold text-foreground">{analysis.rights.length} Right(s)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  {analysis.rights.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-heading font-semibold text-foreground mb-3">RanveerAI Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summary}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-foreground">Extracted Text</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFullText(!showFullText)}>
                {showFullText ? "Collapse" : "Expand"}
              </Button>
            </div>
            <pre className={`text-xs text-muted-foreground whitespace-pre-wrap bg-muted/50 rounded-lg p-4 overflow-auto ${showFullText ? "max-h-[600px]" : "max-h-40"}`}>
              {analysis.fullText}
            </pre>
          </div>

          <Button variant="outline" onClick={() => { setAnalysis(null); setShowFullText(false); }} className="border-border text-foreground">
            Analyze Another Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentAnalyzer;
