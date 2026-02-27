import { useParams, useNavigate } from "react-router-dom";
import { mockBuses } from "@/data/mockData";
import CrowdIndicator from "@/components/CrowdIndicator";
import SeatMap from "@/components/SeatMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, User, Bus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BusDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bus = mockBuses.find((b) => b.id === id);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  if (!bus) return <div className="p-8 text-center">Bus not found</div>;

  const handleBook = () => {
    if (!selectedSeat) {
      toast({ title: "Select a seat first", variant: "destructive" });
      return;
    }
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Seat #${selectedSeat} on ${bus.name}. Ticket: QR-${Date.now().toString(36).toUpperCase()}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="gradient-hero text-primary-foreground p-4">
        <div className="container mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-display font-bold text-lg">{bus.name}</h1>
            <p className="text-xs text-primary-foreground/60">{bus.number}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-5 max-w-2xl">
        {/* Route info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold">{bus.route}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {bus.stops.map((stop, i) => (
              <div key={stop} className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">{stop}</Badge>
                {i < bus.stops.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /><div><p className="text-muted-foreground text-xs">Departure</p><p className="font-medium">{bus.departureTime}</p></div></div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /><div><p className="text-muted-foreground text-xs">Arrival</p><p className="font-medium">{bus.arrivalTime}</p></div></div>
            <div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /><div><p className="text-muted-foreground text-xs">Driver</p><p className="font-medium">{bus.driverName}</p></div></div>
          </div>
        </motion.div>

        {/* Crowd indicator */}
        <CrowdIndicator level={bus.crowdLevel} occupied={bus.occupiedSeats} total={bus.totalSeats} />

        {/* Micro-segment notice */}
        {bus.crowdLevel !== "low" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-4 border-l-4 border-accent">
            <p className="text-sm font-semibold text-foreground">💡 Segment Availability</p>
            <p className="text-xs text-muted-foreground mt-1">
              1 seat available from <strong>Natham → Karaikudi</strong>. You can book micro-segment tickets for intermediate stops.
            </p>
          </motion.div>
        )}

        {/* Seat map */}
        <SeatMap totalSeats={bus.totalSeats} occupiedSeats={bus.occupiedSeats} onSelect={setSelectedSeat} />

        {/* Book button */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button onClick={handleBook} className="w-full h-12 gradient-primary text-primary-foreground border-0 font-display font-semibold text-base">
            Book Seat {selectedSeat ? `#${selectedSeat}` : ""} — ₹{bus.price}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BusDetailPage;
