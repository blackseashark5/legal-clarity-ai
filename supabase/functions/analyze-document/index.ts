import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, fileName } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'text' field" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Truncate text to ~8000 words to stay within token limits
    const words = text.split(/\s+/);
    const truncatedText = words.slice(0, 8000).join(" ");
    const wasTruncated = words.length > 8000;

    const systemPrompt = `You are RanveerAI, an expert legal document analyst. Analyze the provided legal document text and return a structured JSON analysis.

You MUST respond with ONLY valid JSON in this exact format:
{
  "risks": ["risk 1 description", "risk 2 description"],
  "obligations": ["obligation 1", "obligation 2"],
  "rights": ["right 1", "right 2"],
  "summary": "A comprehensive 3-5 sentence summary of the document, its key terms, and important considerations.",
  "documentType": "Contract/Agreement/NDA/Lease/Terms of Service/etc",
  "riskLevel": "low/medium/high/critical"
}

Guidelines:
- Identify ALL potential risks including auto-renewal, penalties, liability limitations, indemnification, non-compete, termination clauses, force majeure, etc.
- List ALL obligations each party must fulfill including payments, deliverables, notice periods, compliance requirements.
- List ALL rights granted including termination rights, access rights, dispute resolution, IP retention, assignment rights.
- The summary should be in plain English, understandable by a non-lawyer.
- Assess overall risk level based on how many concerning clauses exist.
- If the document is not a legal document, still analyze it but note that in the summary.
- Be thorough but concise in each item.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Analyze this legal document${fileName ? ` (${fileName})` : ""}${wasTruncated ? " (text was truncated due to length)" : ""}:\n\n${truncatedText}`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage credits exhausted. Please add funds in Settings > Workspace > Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON from AI response (handle markdown code blocks)
    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI analysis");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-document error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
