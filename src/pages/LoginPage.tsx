import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Bus, Shield, User } from "lucide-react";

const roles: { value: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: "passenger", label: "Passenger", icon: <User className="w-5 h-5" />, desc: "Book rides & track buses" },
  { value: "driver", label: "Driver", icon: <Bus className="w-5 h-5" />, desc: "Manage trips & routes" },
  { value: "admin", label: "Admin", icon: <Shield className="w-5 h-5" />, desc: "System management" },
];

const LoginPage = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<UserRole>("passenger");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      signup(name, email, password, role);
    } else {
      login(email, password, role);
    }
    const dest = role === "admin" ? "/admin" : role === "driver" ? "/driver" : "/dashboard";
    navigate(dest);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary/30" style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-primary-foreground max-w-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Bus className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold">TransitAI</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4 leading-tight">
            Smart Transport,<br />Smarter Journeys
          </h1>
          <p className="text-primary-foreground/70 text-lg">
            AI-powered predictive load balancing for public transport. Real-time crowd predictions, smart routing, and seamless booking.
          </p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Bus className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">TransitAI</span>
          </div>

          <h2 className="font-display text-2xl font-bold mb-1">{isSignup ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-muted-foreground mb-6">{isSignup ? "Join the smart transit network" : "Sign in to continue"}</p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  role === r.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className={`mx-auto mb-1 ${role === r.value ? "text-primary" : "text-muted-foreground"}`}>
                  {r.icon}
                </div>
                <p className="text-xs font-medium">{r.label}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="mt-1" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" required />
            </div>
            {!isSignup && (
              <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
            )}
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 h-11 font-semibold">
              {isSignup ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-medium hover:underline">
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
