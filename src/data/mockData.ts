export interface Bus {
  id: string;
  name: string;
  number: string;
  route: string;
  stops: string[];
  totalSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  crowdLevel: "low" | "medium" | "high";
  departureTime: string;
  arrivalTime: string;
  driverName: string;
  price: number;
}

export interface Booking {
  id: string;
  busId: string;
  busName: string;
  route: string;
  fromStop: string;
  toStop: string;
  date: string;
  seatNumber: number;
  status: "confirmed" | "cancelled";
  price: number;
  qrCode: string;
}

export const mockBuses: Bus[] = [
  {
    id: "1", name: "Express Blue", number: "TN-58-AB-1234",
    route: "Dindigul → Natham → Karaikudi", stops: ["Dindigul", "Nilakottai", "Natham", "Sivagangai", "Karaikudi"],
    totalSeats: 45, occupiedSeats: 38, availableSeats: 7, crowdLevel: "medium",
    departureTime: "08:00 AM", arrivalTime: "11:30 AM", driverName: "Rajesh K", price: 120,
  },
  {
    id: "2", name: "City Liner", number: "TN-58-CD-5678",
    route: "Dindigul → Palani → Coimbatore", stops: ["Dindigul", "Oddanchatram", "Palani", "Pollachi", "Coimbatore"],
    totalSeats: 50, occupiedSeats: 12, availableSeats: 38, crowdLevel: "low",
    departureTime: "09:15 AM", arrivalTime: "01:00 PM", driverName: "Suresh M", price: 180,
  },
  {
    id: "3", name: "Rapid Connect", number: "TN-58-EF-9012",
    route: "Dindigul → Madurai → Rameswaram", stops: ["Dindigul", "Madurai", "Paramakudi", "Ramanathapuram", "Rameswaram"],
    totalSeats: 40, occupiedSeats: 39, availableSeats: 1, crowdLevel: "high",
    departureTime: "06:30 AM", arrivalTime: "12:00 PM", driverName: "Kumar S", price: 250,
  },
  {
    id: "4", name: "Green Transit", number: "TN-58-GH-3456",
    route: "Dindigul → Trichy → Thanjavur", stops: ["Dindigul", "Trichy", "Kumbakonam", "Thanjavur"],
    totalSeats: 48, occupiedSeats: 20, availableSeats: 28, crowdLevel: "low",
    departureTime: "10:00 AM", arrivalTime: "01:30 PM", driverName: "Anand R", price: 150,
  },
  {
    id: "5", name: "Night Rider", number: "TN-58-IJ-7890",
    route: "Natham → Sivagangai → Karaikudi", stops: ["Natham", "Sivagangai", "Karaikudi"],
    totalSeats: 42, occupiedSeats: 35, availableSeats: 7, crowdLevel: "medium",
    departureTime: "07:00 PM", arrivalTime: "09:30 PM", driverName: "Vijay P", price: 90,
  },
];

export const mockBookings: Booking[] = [
  {
    id: "BK001", busId: "1", busName: "Express Blue", route: "Dindigul → Karaikudi",
    fromStop: "Dindigul", toStop: "Karaikudi", date: "2026-02-28",
    seatNumber: 12, status: "confirmed", price: 120, qrCode: "QR-BK001",
  },
  {
    id: "BK002", busId: "4", busName: "Green Transit", route: "Dindigul → Thanjavur",
    fromStop: "Dindigul", toStop: "Trichy", date: "2026-03-01",
    seatNumber: 5, status: "confirmed", price: 85, qrCode: "QR-BK002",
  },
];
