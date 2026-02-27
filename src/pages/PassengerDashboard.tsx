import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockBuses, Bus } from "@/data/mockData";
import BusCard from "@/components/BusCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, LogOut, Ticket, Bell, TrendingUp } from "lucide-react";

const PassengerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>(mockBuses);

  const handleSearch = () => {
    if (!source && !destination) {
      setFilteredBuses(mockBuses);
      return;
    }
    const filtered = mockBuses.filter((b) => {
      const routeLower = b.route.toLowerCase();
      const matchSource = !source || routeLower.includes(source.toLowerCase());
      const matchDest = !destination || routeLower.includes(destination.toLowerCase());
      return matchSource && matchDest;
    });
    setFilteredBuses(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg">TransitAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/bookings")}>
              <Ticket className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Hero search */}
        <div className="container mx-auto px-4 pb-8 pt-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-2xl font-bold mb-1">Hello, {user?.name || "Traveler"} 👋</h1>
            <p className="text-primary-foreground/60 text-sm mb-6">Where would you like to go today?</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-4 space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
                <Input
                  placeholder="From (e.g. Dindigul)"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="pl-9 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
                <Input
                  placeholder="To (e.g. Karaikudi)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-9 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold">
              <Search className="w-4 h-4 mr-2" /> Search Buses
            </Button>
          </motion.div>
        </div>
      </header>

      {/* AI Insights */}
      <div className="container mx-auto px-4 -mt-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4 flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI Suggestion</p>
            <p className="text-xs text-muted-foreground">Best time to travel to Karaikudi: 10:00 AM – Low crowd predicted</p>
          </div>
        </motion.div>
      </div>

      {/* Bus list */}
      <div className="container mx-auto px-4 pb-8">
        <h2 className="font-display font-semibold text-lg mb-4">Available Buses ({filteredBuses.length})</h2>
        <div className="space-y-3">
          {filteredBuses.map((bus) => (
            <BusCard key={bus.id} bus={bus} onClick={() => navigate(`/bus/${bus.id}`)} />
          ))}
          {filteredBuses.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="font-display text-lg">No buses found for this route</p>
              <p className="text-sm">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
