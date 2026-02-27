import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockBuses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LogOut, Bus, Users, MapPin, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const peakData = [
  { hour: "6AM", passengers: 120 },
  { hour: "8AM", passengers: 340 },
  { hour: "10AM", passengers: 180 },
  { hour: "12PM", passengers: 220 },
  { hour: "2PM", passengers: 150 },
  { hour: "4PM", passengers: 280 },
  { hour: "6PM", passengers: 350 },
  { hour: "8PM", passengers: 200 },
];

const routeData = [
  { name: "Dindigul-Karaikudi", value: 35 },
  { name: "Dindigul-Coimbatore", value: 25 },
  { name: "Dindigul-Madurai", value: 30 },
  { name: "Dindigul-Trichy", value: 10 },
];

const COLORS = ["hsl(0, 72%, 55%)", "hsl(40, 90%, 50%)", "hsl(215, 90%, 50%)", "hsl(145, 65%, 42%)"];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalBuses = mockBuses.length;
  const avgOccupancy = Math.round(mockBuses.reduce((a, b) => a + (b.occupiedSeats / b.totalSeats) * 100, 0) / totalBuses);

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero text-primary-foreground p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-lg">Admin Panel</h1>
            <p className="text-xs text-primary-foreground/60">Transport Management System</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: <Bus className="w-5 h-5" />, value: totalBuses, label: "Active Buses", color: "text-primary" },
            { icon: <Users className="w-5 h-5" />, value: "1,247", label: "Today's Riders", color: "text-accent" },
            { icon: <TrendingUp className="w-5 h-5" />, value: `${avgOccupancy}%`, label: "Avg Occupancy", color: "text-crowd-medium" },
            { icon: <DollarSign className="w-5 h-5" />, value: "₹48.5K", label: "Today's Revenue", color: "text-crowd-low" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4"
            >
              <div className={stat.color}>{stat.icon}</div>
              <p className="font-display text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Peak Hour Analysis
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={peakData}>
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="passengers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-xl p-5">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Route Crowd Distribution
            </h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie data={routeData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                    {routeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 text-xs">
                {routeData.map((r, i) => (
                  <div key={r.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-muted-foreground">{r.name}: {r.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bus fleet table */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
          <h3 className="font-display font-semibold mb-4">Fleet Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Bus</th>
                  <th className="pb-2 font-medium">Route</th>
                  <th className="pb-2 font-medium">Driver</th>
                  <th className="pb-2 font-medium">Seats</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockBuses.map((bus) => (
                  <tr key={bus.id} className="border-b border-border/50">
                    <td className="py-3 font-medium">{bus.name}<br /><span className="text-xs text-muted-foreground">{bus.number}</span></td>
                    <td className="py-3 text-muted-foreground text-xs">{bus.route}</td>
                    <td className="py-3">{bus.driverName}</td>
                    <td className="py-3">{bus.availableSeats}/{bus.totalSeats}</td>
                    <td className="py-3">
                      <Badge className={`border-0 text-xs ${bus.crowdLevel === "low" ? "crowd-low" : bus.crowdLevel === "medium" ? "crowd-medium" : "crowd-high"}`}>
                        {bus.crowdLevel}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
