import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockBookings } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, QrCode, MapPin } from "lucide-react";

const BookingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero text-primary-foreground p-4">
        <div className="container mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-display font-bold text-lg">My Bookings</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-3">
        {mockBookings.map((booking, i) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-display font-semibold">{booking.busName}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {booking.fromStop} → {booking.toStop}
                </p>
              </div>
              <Badge variant={booking.status === "confirmed" ? "default" : "destructive"}>
                {booking.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="space-y-1 text-muted-foreground">
                <p>Date: {booking.date}</p>
                <p>Seat: #{booking.seatNumber}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-primary text-lg">₹{booking.price}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <QrCode className="w-3 h-3" /> {booking.qrCode}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
