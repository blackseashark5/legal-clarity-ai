import { Calendar, ChevronLeft, ChevronRight, X, TrendingUp, Users, Clock, BarChart3 } from "lucide-react";
import { useState, useMemo } from "react";

const statCards = [
  { label: "High Court Complexes", value: "39", bg: "bg-destructive", fg: "text-destructive-foreground" },
  { label: "HC Pending Cases", value: "6.27 M", bg: "bg-olive", fg: "text-olive-foreground" },
  { label: "HC Disposed Cases", value: "41.09 M", bg: "bg-purple-stat", fg: "text-purple-stat-foreground" },
  { label: "HC Cases Listed Today", value: "48.25 K", bg: "bg-maroon", fg: "text-maroon-foreground" },
  { label: "District & Taluka Court Complexes", value: "3,601", bg: "bg-success", fg: "text-success-foreground" },
  { label: "DC Pending Cases", value: "44.93 M", bg: "bg-primary", fg: "text-primary-foreground" },
  { label: "DC Disposed Cases in Last Month", value: "3.29 M", bg: "bg-purple-stat", fg: "text-purple-stat-foreground" },
  { label: "DC Cases Listed Today", value: "551.14 K", bg: "bg-teal-stat", fg: "text-teal-stat-foreground" },
];

interface Hearing {
  id: string;
  court: string;
  date: string;
  time: string;
  type: "criminal" | "civil" | "writ" | "arbitration" | "corporate" | "family";
  judge?: string;
  parties?: string;
}

const allHearings: Hearing[] = [
  { id: "CRL-123/2024", court: "Court Room 5", date: "2026-04-08", time: "10:30 AM", type: "criminal", judge: "Hon. Justice Sharma", parties: "State vs. R. Kumar" },
  { id: "CIV-456/2024", court: "Court Room 3", date: "2026-04-08", time: "11:00 AM", type: "civil", judge: "Hon. Justice Patel", parties: "M. Singh vs. N. Gupta" },
  { id: "WP-789/2024", court: "Court Room 1", date: "2026-04-08", time: "2:00 PM", type: "writ", judge: "Hon. Justice Reddy", parties: "A. Das vs. State" },
  { id: "CIV-890/2024", court: "Court Room 2", date: "2026-04-09", time: "10:00 AM", type: "civil", judge: "Hon. Justice Iyer", parties: "Tech Corp vs. InfoSys Ltd" },
  { id: "ARB-012/2024", court: "Court Room 7", date: "2026-04-09", time: "11:30 AM", type: "arbitration", judge: "Hon. Justice Mehta", parties: "ABC Ltd vs. XYZ Inc" },
  { id: "FAM-345/2024", court: "Court Room 4", date: "2026-04-10", time: "9:30 AM", type: "family", judge: "Hon. Justice Kapoor", parties: "S. Verma vs. P. Verma" },
  { id: "CRL-567/2024", court: "Court Room 6", date: "2026-04-10", time: "1:00 PM", type: "criminal", judge: "Hon. Justice Bose", parties: "State vs. K. Rao" },
  { id: "CORP-111/2024", court: "Court Room 8", date: "2026-04-11", time: "10:00 AM", type: "corporate", judge: "Hon. Justice Nair", parties: "GlobalTech vs. IndiaFin" },
  { id: "WP-222/2024", court: "Court Room 1", date: "2026-04-12", time: "11:00 AM", type: "writ", judge: "Hon. Justice Singh", parties: "Citizens Forum vs. MCD" },
  { id: "CIV-333/2024", court: "Court Room 3", date: "2026-04-14", time: "10:30 AM", type: "civil", judge: "Hon. Justice Joshi", parties: "R. Agarwal vs. S. Mishra" },
  { id: "ARB-444/2024", court: "Court Room 7", date: "2026-04-15", time: "2:00 PM", type: "arbitration", judge: "Hon. Justice Desai", parties: "Infra Corp vs. BuildWell" },
  { id: "CRL-555/2024", court: "Court Room 5", date: "2026-04-15", time: "10:00 AM", type: "criminal", judge: "Hon. Justice Sharma", parties: "State vs. V. Pandey" },
  { id: "FAM-666/2024", court: "Court Room 4", date: "2026-04-17", time: "9:30 AM", type: "family", judge: "Hon. Justice Kapoor", parties: "N. Jain vs. M. Jain" },
  { id: "CORP-777/2024", court: "Court Room 8", date: "2026-04-22", time: "11:00 AM", type: "corporate", judge: "Hon. Justice Nair", parties: "MegaCorp vs. StartupX" },
  { id: "WP-888/2024", court: "Court Room 1", date: "2026-04-24", time: "10:00 AM", type: "writ", judge: "Hon. Justice Reddy", parties: "NGO Trust vs. State" },
  { id: "CIV-999/2024", court: "Court Room 2", date: "2026-04-28", time: "2:30 PM", type: "civil", judge: "Hon. Justice Iyer", parties: "D. Shah vs. P. Chopra" },
];

const dayEvents: Record<string, { label: string; type: "hearing" | "holiday" | "deadline" | "meeting" }[]> = {
  "2026-04-03": [{ label: "Good Friday — Court Holiday", type: "holiday" }],
  "2026-04-08": [
    { label: "CRL-123/2024 Hearing", type: "hearing" },
    { label: "CIV-456/2024 Hearing", type: "hearing" },
    { label: "WP-789/2024 Hearing", type: "hearing" },
  ],
  "2026-04-09": [
    { label: "CIV-890/2024 Hearing", type: "hearing" },
    { label: "ARB-012/2024 Hearing", type: "hearing" },
    { label: "Term Sheet Signing — GlobalTech", type: "meeting" },
  ],
  "2026-04-10": [
    { label: "FAM-345/2024 Hearing", type: "hearing" },
    { label: "CRL-567/2024 Hearing", type: "hearing" },
  ],
  "2026-04-11": [{ label: "CORP-111/2024 Hearing", type: "hearing" }],
  "2026-04-12": [{ label: "WP-222/2024 Hearing", type: "hearing" }],
  "2026-04-14": [
    { label: "CIV-333/2024 Hearing", type: "hearing" },
    { label: "Ambedkar Jayanti — Partial Working", type: "holiday" },
  ],
  "2026-04-15": [
    { label: "ARB-444/2024 Hearing", type: "hearing" },
    { label: "CRL-555/2024 Hearing", type: "hearing" },
    { label: "Contract Renewal Deadline — ABC Ltd", type: "deadline" },
  ],
  "2026-04-17": [{ label: "FAM-666/2024 Hearing", type: "hearing" }],
  "2026-04-22": [
    { label: "CORP-777/2024 Hearing", type: "hearing" },
    { label: "Board Meeting — Legal Review", type: "meeting" },
  ],
  "2026-04-24": [
    { label: "WP-888/2024 Hearing", type: "hearing" },
    { label: "Compliance Filing Deadline", type: "deadline" },
  ],
  "2026-04-26": [{ label: "Court Holiday — Sunday", type: "holiday" }],
  "2026-04-28": [{ label: "CIV-999/2024 Hearing", type: "hearing" }],
};

const typeColors: Record<string, string> = {
  criminal: "bg-destructive",
  civil: "bg-primary",
  writ: "bg-purple-stat",
  arbitration: "bg-warning",
  corporate: "bg-teal-stat",
  family: "bg-success",
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

const Dashboard = () => {
  const [filter, setFilter] = useState<"Today" | "Week" | "Month">("Today");
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(3); // April = 3 (0-indexed)
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const today = "2026-04-08";

  const filteredHearings = useMemo(() => {
    const todayDate = new Date(today);
    return allHearings.filter(h => {
      const hDate = new Date(h.date);
      if (filter === "Today") return h.date === today;
      if (filter === "Week") {
        const weekEnd = new Date(todayDate);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return hDate >= todayDate && hDate < weekEnd;
      }
      // Month
      return hDate.getMonth() === todayDate.getMonth() && hDate.getFullYear() === todayDate.getFullYear();
    });
  }, [filter]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    return { firstDay, daysInMonth };
  }, [calYear, calMonth]);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const getDateStr = (day: number) => {
    const m = String(calMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${calYear}-${m}-${d}`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className={`${card.bg} ${card.fg} rounded-lg p-4 hover:scale-[1.02] transition-transform cursor-default`}>
            <p className="text-xs font-medium opacity-90">{card.label}</p>
            <p className="text-2xl md:text-3xl font-bold font-heading mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Hearings */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-primary p-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-foreground" />
            <h3 className="font-heading font-semibold text-primary-foreground">Upcoming Hearings</h3>
            <span className="ml-auto text-xs bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full">
              {filteredHearings.length} cases
            </span>
          </div>
          <div className="p-4">
            <div className="flex gap-2 mb-4">
              {(["Today", "Week", "Month"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    filter === f ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {filteredHearings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No hearings scheduled for this period
                </div>
              ) : (
                filteredHearings.map((h) => (
                  <div key={h.id} className="flex items-center justify-between py-3 px-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${typeColors[h.type] || 'bg-primary'}`} />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{h.id}</p>
                        <p className="text-xs text-muted-foreground">{h.court} • {h.judge}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{h.parties}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-sm font-medium text-foreground">{h.date}</p>
                      <p className="text-xs text-muted-foreground">{h.time}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded mt-1 inline-block text-primary-foreground ${typeColors[h.type]}`}>
                        {h.type}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="text-primary hover:bg-accent rounded-lg p-2 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="font-heading font-bold text-foreground text-lg uppercase tracking-wide">
              {MONTHS[calMonth]} {calYear}
            </h3>
            <button onClick={nextMonth} className="text-primary hover:bg-accent rounded-lg p-2 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {DAYS.map(d => (
              <div key={d} className="py-2 font-bold text-muted-foreground">{d}</div>
            ))}
            {Array.from({ length: calendarDays.firstDay }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: calendarDays.daysInMonth }, (_, i) => {
              const day = i + 1;
              const dateStr = getDateStr(day);
              const events = dayEvents[dateStr];
              const isToday = dateStr === today;
              const hasHearing = events?.some(e => e.type === "hearing");
              const isHoliday = events?.some(e => e.type === "holiday");
              const hasDeadline = events?.some(e => e.type === "deadline");
              const hasMeeting = events?.some(e => e.type === "meeting");
              const isSelected = selectedDay === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                  className={`py-2 rounded-lg text-sm cursor-pointer transition-all relative ${
                    isSelected ? 'bg-primary text-primary-foreground font-bold ring-2 ring-primary/30' :
                    isToday ? 'bg-primary text-primary-foreground font-bold' :
                    isHoliday && !hasHearing ? 'text-destructive font-bold' :
                    'text-foreground hover:bg-secondary'
                  }`}
                >
                  {day}
                  {(hasHearing || hasDeadline || hasMeeting) && !isSelected && !isToday && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {hasHearing && <span className="w-1 h-1 rounded-full bg-primary" />}
                      {hasDeadline && <span className="w-1 h-1 rounded-full bg-destructive" />}
                      {hasMeeting && <span className="w-1 h-1 rounded-full bg-warning" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-destructive" /> Holidays</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary" /> Hearings</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-warning" /> Meetings</div>
          </div>

          {/* Day detail popup */}
          {selectedDay && dayEvents[selectedDay] && (
            <div className="mt-4 bg-secondary/50 border border-border rounded-lg p-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-semibold text-foreground text-sm">{selectedDay}</h4>
                <button onClick={() => setSelectedDay(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="space-y-1.5">
                {dayEvents[selectedDay].map((ev, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      ev.type === "hearing" ? "bg-primary" : ev.type === "holiday" ? "bg-destructive" : ev.type === "deadline" ? "bg-destructive" : "bg-warning"
                    }`} />
                    <span className="text-foreground">{ev.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedDay && !dayEvents[selectedDay] && (
            <div className="mt-4 bg-secondary/50 border border-border rounded-lg p-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-heading font-semibold text-foreground text-sm">{selectedDay}</h4>
                <button onClick={() => setSelectedDay(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cases This Week</p>
              <p className="text-xl font-bold font-heading text-foreground">127</p>
            </div>
          </div>
          <p className="text-xs text-success font-medium">↑ 12% from last week</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active Advocates</p>
              <p className="text-xl font-bold font-heading text-foreground">2,845</p>
            </div>
          </div>
          <p className="text-xs text-success font-medium">↑ 5% from last month</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Disposal Time</p>
              <p className="text-xl font-bold font-heading text-foreground">18 Days</p>
            </div>
          </div>
          <p className="text-xs text-destructive font-medium">↓ 3% slower</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-stat/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-purple-stat" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Documents Reviewed</p>
              <p className="text-xl font-bold font-heading text-foreground">3,412</p>
            </div>
          </div>
          <p className="text-xs text-success font-medium">↑ 22% this month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-heading font-semibold text-foreground mb-4">Recent RanveerAI Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Document Analyzed", detail: "Rental Agreement — 3 risks identified", time: "2 mins ago", color: "bg-destructive" },
            { action: "Hearing Reminder", detail: "CRL-123/2024 — Court Room 5 at 10:30 AM", time: "15 mins ago", color: "bg-primary" },
            { action: "Contract Review", detail: "Vendor Agreement — Auto-renewal clause flagged", time: "1 hour ago", color: "bg-warning" },
            { action: "Compliance Check", detail: "NDA Template — All clauses compliant", time: "3 hours ago", color: "bg-success" },
            { action: "Risk Alert", detail: "Service Agreement — Liability cap missing", time: "5 hours ago", color: "bg-destructive" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
