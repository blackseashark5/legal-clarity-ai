import { Upload, FileText, AlertTriangle, Shield, CheckCircle, Loader2, Brain, Sparkles } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import * as pdfjsLib from "pdfjs-dist";
import { toast } from "sonner";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface AnalysisResult {
  fileName: string;
  pageCount: number;
  fullText: string;
  risks: string[];
  obligations: string[];
  rights: string[];
  summary: string;
  documentType?: string;
  riskLevel?: string;
}

const riskLevelColors: Record<string, string> = {
  low: "bg-green-100 text-green-700 border-green-300",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
  high: "bg-orange-100 text-orange-700 border-orange-300",
  critical: "bg-red-100 text-red-700 border-red-300",
};

const DocumentAnalyzer = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showFullText, setShowFullText] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const extractText = useCallback(async (file: File): Promise<{ text: string; pageCount: number }> => {
    if (file.type === "application/pdf") {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        pages.push(content.items.map((item: any) => item.str).join(" "));
      }
      return { text: pages.join("\n\n"), pageCount: pdf.numPages };
    } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      return { text: await file.text(), pageCount: 1 };
    }
    throw new Error("Unsupported file type. Please upload a PDF or TXT file.");
  }, []);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setLoading(true);
    setAnalysis(null);

    try {
      setLoadingStage("Extracting text from document...");
      const { text, pageCount } = await extractText(file);

      if (!text.trim()) {
        setError("No readable text found. It may be a scanned image PDF.");
        setLoading(false);
        return;
      }

      setLoadingStage("RanveerAI is analyzing your document...");

      const { data, error: fnError } = await supabase.functions.invoke("analyze-document", {
        body: { text, fileName: file.name },
      });

      if (fnError) {
        throw new Error(fnError.message || "AI analysis failed");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setAnalysis({
        fileName: file.name,
        pageCount,
        fullText: text,
        risks: data.risks || [],
        obligations: data.obligations || [],
        rights: data.rights || [],
        summary: data.summary || "No summary available.",
        documentType: data.documentType,
        riskLevel: data.riskLevel,
      });

      toast.success("Document analyzed successfully by RanveerAI!");
    } catch (e: any) {
      const msg = e?.message || "Unknown error";
      setError(msg);
      toast.error("Analysis failed: " + msg);
    } finally {
      setLoading(false);
      setLoadingStage("");
    }
  }, [extractText]);

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
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold font-heading text-foreground">RanveerAI Document Analyzer</h2>
        </div>
        <p className="text-muted-foreground mt-1 flex items-center gap-1">
          <Sparkles className="h-4 w-4" />
          Powered by AI — Upload a legal document for intelligent analysis, risk detection, and plain-English summaries.
        </p>
      </div>

      {loading && (
        <div className="border-2 border-dashed border-primary/40 rounded-xl p-12 text-center bg-accent/30">
          <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="font-medium text-foreground">{loadingStage}</p>
          <p className="text-sm text-muted-foreground mt-1">This may take a moment for large documents</p>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 text-center">
          <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive font-medium">{error}</p>
          <Button variant="outline" className="mt-3" onClick={() => setError(null)}>Try Again</Button>
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
          <p className="text-sm text-muted-foreground mt-1">Supports PDF, TXT — Analyzed by RanveerAI</p>
          <input ref={fileRef} type="file" accept=".pdf,.txt" className="hidden" onChange={onFileSelect} />
        </div>
      )}

      {analysis && (
        <div className="space-y-4">
          {/* Header card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">{analysis.fileName}</span>
              <span className="text-xs text-muted-foreground">{analysis.pageCount} page(s)</span>
              {analysis.documentType && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{analysis.documentType}</span>
              )}
              {analysis.riskLevel && (
                <span className={`text-xs px-2 py-0.5 rounded-full border ml-auto font-semibold ${riskLevelColors[analysis.riskLevel] || "bg-muted text-muted-foreground"}`}>
                  Risk: {analysis.riskLevel.toUpperCase()}
                </span>
              )}
            </div>

            {/* Stats grid */}
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
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                <p className="text-sm font-semibold text-foreground">{analysis.rights.length} Right(s)</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  {analysis.rights.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              RanveerAI Summary
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summary}</p>
          </div>

          {/* Extracted Text */}
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
