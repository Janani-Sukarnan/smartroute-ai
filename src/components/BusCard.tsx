import { Bus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface BusCardProps {
  bus: Bus;
  onClick: () => void;
}

const crowdConfig = {
  low: { label: "Low Crowd", className: "crowd-low" },
  medium: { label: "Medium", className: "crowd-medium" },
  high: { label: "Full", className: "crowd-high" },
};

const BusCard = ({ bus, onClick }: BusCardProps) => {
  const crowd = crowdConfig[bus.crowdLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className="glass-card rounded-xl p-5 cursor-pointer transition-shadow hover:shadow-xl"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">{bus.name}</h3>
          <p className="text-sm text-muted-foreground">{bus.number}</p>
        </div>
        <Badge className={`${crowd.className} border-0 text-xs font-medium`}>
          {crowd.label}
        </Badge>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <MapPin className="w-4 h-4 text-primary" />
        <span>{bus.route}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {bus.departureTime}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {bus.availableSeats} seats
          </span>
        </div>
        <span className="font-display font-bold text-primary text-lg">₹{bus.price}</span>
      </div>

      {/* Seat fill bar */}
      <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            bus.crowdLevel === "low" ? "bg-crowd-low" :
            bus.crowdLevel === "medium" ? "bg-crowd-medium" : "bg-crowd-high"
          }`}
          style={{ width: `${(bus.occupiedSeats / bus.totalSeats) * 100}%` }}
        />
      </div>
    </motion.div>
  );
};

export default BusCard;
