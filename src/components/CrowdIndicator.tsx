import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CrowdIndicatorProps {
  level: "low" | "medium" | "high";
  occupied: number;
  total: number;
}

const CrowdIndicator = ({ level, occupied, total }: CrowdIndicatorProps) => {
  const percentage = Math.round((occupied / total) * 100);
  const config = {
    low: { label: "Low Crowd", emoji: "🟢", color: "bg-crowd-low" },
    medium: { label: "Moderate", emoji: "🟡", color: "bg-crowd-medium" },
    high: { label: "Highly Crowded", emoji: "🔴", color: "bg-crowd-high" },
  };
  const c = config[level];

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-card rounded-xl p-4"
    >
      <p className="text-sm font-medium text-muted-foreground mb-2">AI Crowd Prediction</p>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{c.emoji}</span>
        <div>
          <p className="font-display font-semibold text-foreground">{c.label}</p>
          <p className="text-xs text-muted-foreground">{occupied}/{total} seats occupied ({percentage}%)</p>
        </div>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${c.color}`}
        />
      </div>
    </motion.div>
  );
};

export default CrowdIndicator;
