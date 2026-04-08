import { Scale, FileText, BarChart3, Info, UserCheck, Ticket, Library, Building2, Gavel, BookOpen, ScrollText, Monitor } from "lucide-react";

const services = [
  { icon: Scale, label: "Verdict Finder", url: "https://verdictfinder.sci.gov.in/elk_frontend/" },
  { icon: FileText, label: "SCR", url: "https://scr.sci.gov.in/scrsearch/" },
  { icon: BarChart3, label: "NJDG", url: "https://scdg.sci.gov.in/scnjdg/" },
  { icon: Info, label: "Right to Information", url: "https://www.sci.gov.in/rti/" },
  { icon: UserCheck, label: "Online Appearance Portal", url: "https://appearance.sci.gov.in/" },
  { icon: Ticket, label: "SuSwagatam (e-Pass)", url: "https://suswagatam.sci.gov.in/public/Index.aspx" },
  { icon: Library, label: "Judges Library", url: "https://www.sci.gov.in/judges-library/" },
  { icon: Building2, label: "Centre for Research & Planning", url: "https://www.sci.gov.in/centre-for-research-and-planning/" },
  { icon: Gavel, label: "GSICC", url: "https://www.sci.gov.in/gender-sensitization-and-internal-complaints-committee/" },
  { icon: BookOpen, label: "NALSA", url: "https://nalsa.gov.in/" },
  { icon: ScrollText, label: "SCLSC", url: "https://sclsc.gov.in/" },
  { icon: Monitor, label: "e-Committee", url: "https://ecommitteesci.gov.in/" },
];

const ExploreConnect = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Explore & Connect</h2>
      <p className="text-muted-foreground mt-1">Quick access to important legal services and portals</p>
    </div>
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
        </a>
      ))}
    </div>
  </div>
);

export default ExploreConnect;
