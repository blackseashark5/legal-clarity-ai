import { Calendar } from "lucide-react";
import { useState } from "react";

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

const hearings = [
  { id: "CRL-123/2024", court: "Court Room 5", date: "2024-03-25", time: "10:30 AM", type: "criminal" },
  { id: "CIV-456/2024", court: "Court Room 3", date: "2024-03-26", time: "11:00 AM", type: "civil" },
  { id: "WP-789/2024", court: "Court Room 1", date: "2024-03-27", time: "2:00 PM", type: "writ" },
  { id: "ARB-012/2024", court: "Court Room 7", date: "2024-03-28", time: "10:00 AM", type: "arbitration" },
];

const Dashboard = () => {
  const [filter, setFilter] = useState<"Today" | "Week" | "Month">("Today");

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className={`${card.bg} ${card.fg} rounded-lg p-4`}>
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
          </div>
          <div className="p-4">
            <div className="flex gap-2 mb-4">
              {(["Today", "Week", "Month"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {hearings.map((h) => (
                <div key={h.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${h.type === 'criminal' ? 'bg-destructive' : 'bg-primary'}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{h.id}</p>
                      <p className="text-xs text-muted-foreground">{h.court}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{h.date}</p>
                    <p className="text-xs text-muted-foreground">{h.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground text-lg">APRIL 2026</h3>
            <div className="flex gap-2">
              <button className="text-primary hover:bg-accent rounded p-1">‹</button>
              <button className="text-primary hover:bg-accent rounded p-1">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
              <div key={d} className="py-2 font-bold text-muted-foreground">{d}</div>
            ))}
            {Array.from({ length: 2 }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const isToday = day === 8;
              const isHoliday = [3, 24].includes(day);
              const isPartial = [5, 12, 19, 26].includes(day);
              return (
                <div key={day} className={`py-2 rounded text-sm cursor-pointer transition-colors ${
                  isToday ? 'bg-primary text-primary-foreground font-bold' :
                  isHoliday ? 'text-destructive font-bold' :
                  isPartial ? 'text-warning font-bold' :
                  'text-foreground hover:bg-secondary'
                }`}>
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex gap-6 mt-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-destructive" /> Holidays</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-warning" /> Partial Court Working Days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
