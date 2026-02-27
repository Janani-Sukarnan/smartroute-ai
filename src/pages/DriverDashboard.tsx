import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LogOut, Play, Square, Users, MapPin, Navigation, AlertTriangle } from "lucide-react";

const stops = ["Dindigul", "Nilakottai", "Natham", "Sivagangai", "Karaikudi"];

const DriverDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tripActive, setTripActive] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [passengerCount, setPassengerCount] = useState(32);

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero text-primary-foreground p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-lg">Driver Dashboard</h1>
            <p className="text-xs text-primary-foreground/60">{user?.name || "Driver"}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-5">
        {/* Trip control */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Assigned Route</p>
              <p className="font-display font-semibold">Dindigul → Karaikudi</p>
              <p className="text-xs text-muted-foreground">Bus: TN-58-AB-1234 · Express Blue</p>
            </div>
            <Button
              onClick={() => setTripActive(!tripActive)}
              className={`h-12 px-6 font-semibold border-0 ${tripActive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "gradient-primary text-primary-foreground"}`}
            >
              {tripActive ? <><Square className="w-4 h-4 mr-2" /> End Trip</> : <><Play className="w-4 h-4 mr-2" /> Start Trip</>}
            </Button>
          </div>

          {tripActive && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Route Progress</p>
              <div className="flex items-center gap-1">
                {stops.map((stop, i) => (
                  <div key={stop} className="flex items-center gap-1 flex-1">
                    <button
                      onClick={() => { setCurrentStop(i); if (i > 0) setPassengerCount(Math.max(10, passengerCount - Math.floor(Math.random() * 5))); }}
                      className={`w-full py-2 px-1 rounded-lg text-xs font-medium transition-colors ${
                        i <= currentStop ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stop}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-4">
            <Users className="w-5 h-5 text-primary mb-2" />
            <p className="font-display text-2xl font-bold">{passengerCount}</p>
            <p className="text-xs text-muted-foreground">Passengers</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-xl p-4">
            <Navigation className="w-5 h-5 text-accent mb-2" />
            <p className="font-display text-2xl font-bold">{stops[currentStop]}</p>
            <p className="text-xs text-muted-foreground">Current Stop</p>
          </motion.div>
        </div>

        {/* Traffic alert */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-4 border-l-4 border-crowd-medium">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-crowd-medium" />
            <p className="text-sm font-semibold">AI Route Suggestion</p>
          </div>
          <p className="text-xs text-muted-foreground">Heavy traffic detected on NH-45 near Natham. Suggest alternate route via State Highway 33 — saves ~12 min.</p>
          <Button variant="outline" size="sm" className="mt-3 text-xs">View Alternate Route</Button>
        </motion.div>

        {/* Map placeholder */}
        <div className="glass-card rounded-xl overflow-hidden h-48 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Live Map</p>
            <p className="text-xs">Google Maps integration area</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
