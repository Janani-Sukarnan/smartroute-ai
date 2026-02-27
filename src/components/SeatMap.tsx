import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SeatMapProps {
  totalSeats: number;
  occupiedSeats: number;
  onSelect: (seat: number) => void;
}

const SeatMap = ({ totalSeats, occupiedSeats, onSelect }: SeatMapProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const occupiedSet = new Set(
    Array.from({ length: occupiedSeats }, (_, i) => i + 1)
  );

  const handleClick = (seat: number) => {
    if (occupiedSet.has(seat)) return;
    setSelected(seat);
    onSelect(seat);
  };

  const cols = 4;
  const rows = Math.ceil(totalSeats / cols);

  return (
    <div className="glass-card rounded-xl p-5">
      <p className="text-sm font-medium text-muted-foreground mb-1">Select Your Seat</p>
      <div className="flex gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted border" /> Available</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary" /> Selected</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-destructive" /> Occupied</span>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: 220 }}>
        {Array.from({ length: rows * cols }, (_, i) => {
          const seat = i + 1;
          if (seat > totalSeats) return <div key={i} />;
          const isOccupied = occupiedSet.has(seat);
          const isSelected = selected === seat;
          return (
            <motion.button
              key={seat}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(seat)}
              disabled={isOccupied}
              className={`w-12 h-10 rounded-lg text-xs font-medium transition-colors ${
                isOccupied
                  ? "bg-destructive/80 text-destructive-foreground cursor-not-allowed"
                  : isSelected
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted hover:bg-primary/20 text-foreground"
              }`}
            >
              {seat}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatMap;
