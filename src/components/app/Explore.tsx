import { Scale, FileText, BarChart3, Info, UserCheck, Ticket, Library, Building2, Gavel, BookOpen, ScrollText, Monitor, ExternalLink, ArrowRight, Newspaper, Bell, Shield } from "lucide-react";

const services = [
  { icon: Scale, label: "Verdict Finder", url: "https://verdictfinder.sci.gov.in/elk_frontend/", desc: "Search Supreme Court verdicts" },
  { icon: FileText, label: "SCR", url: "https://scr.sci.gov.in/scrsearch/", desc: "Supreme Court Reports" },
  { icon: BarChart3, label: "NJDG", url: "https://scdg.sci.gov.in/scnjdg/", desc: "National Judicial Data Grid" },
  { icon: Info, label: "Right to Information", url: "https://www.sci.gov.in/rti/", desc: "RTI Portal" },
  { icon: UserCheck, label: "Online Appearance Portal", url: "https://appearance.sci.gov.in/", desc: "Advocate appearance filing" },
  { icon: Ticket, label: "SuSwagatam (e-Pass)", url: "https://suswagatam.sci.gov.in/public/Index.aspx", desc: "Visitor e-Pass system" },
  { icon: Library, label: "Judges Library", url: "https://www.sci.gov.in/judges-library/", desc: "Legal reference library" },
  { icon: Building2, label: "Centre for Research & Planning", url: "https://www.sci.gov.in/centre-for-research-and-planning/", desc: "Judicial research hub" },
  { icon: Gavel, label: "GSICC", url: "https://www.sci.gov.in/gender-sensitization-and-internal-complaints-committee/", desc: "Gender sensitization committee" },
  { icon: BookOpen, label: "NALSA", url: "https://nalsa.gov.in/", desc: "National Legal Services Authority" },
  { icon: ScrollText, label: "SCLSC", url: "https://sclsc.gov.in/", desc: "SC Legal Services Committee" },
  { icon: Monitor, label: "e-Committee", url: "https://ecommitteesci.gov.in/", desc: "e-Courts & digital initiatives" },
];

const newsItems = [
  { title: "Supreme Court adopts AI-assisted case management", date: "April 7, 2026" },
  { title: "New guidelines for virtual hearings issued", date: "April 5, 2026" },
  { title: "National Judicial Infrastructure Authority established", date: "April 3, 2026" },
  { title: "E-filing made mandatory for commercial disputes", date: "April 1, 2026" },
];

const quickLinks = [
  { icon: Newspaper, label: "Latest Judgments", desc: "Access recent Supreme Court judgments and orders" },
  { icon: Bell, label: "Court Notices", desc: "View important circulars and notifications" },
  { icon: Shield, label: "Legal Aid", desc: "Free legal assistance for eligible citizens" },
  { icon: FileText, label: "Cause Lists", desc: "Daily cause list for all court rooms" },
];

const Explore = () => (
  <div className="space-y-8">
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Explore</h2>
      <p className="text-muted-foreground mt-1">Quick access to important legal services and portals</p>
    </div>

    {/* Service Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {services.map((s, i) => (
        <a
          key={i}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-lg hover:border-primary/30 transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
            <s.icon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground leading-tight">{s.label}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{s.desc}</p>
          <ExternalLink className="h-3 w-3 text-muted-foreground mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      ))}
    </div>

    {/* Quick Links + News */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* Quick Links */}
      <div>
        <h3 className="font-heading font-semibold text-foreground text-lg mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest News */}
      <div>
        <h3 className="font-heading font-semibold text-foreground text-lg mb-4">Latest Legal News</h3>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {newsItems.map((news, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{news.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{news.date}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* RanveerAI Promo */}
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
      <h3 className="font-heading font-bold text-foreground text-xl mb-2">Powered by RanveerAI</h3>
      <p className="text-muted-foreground text-sm max-w-lg mx-auto">
        All these services are integrated with RanveerAI's intelligent legal assistant. Get AI-powered insights, document analysis, and risk detection across all portals.
      </p>
    </div>
  </div>
);

export default Explore;
