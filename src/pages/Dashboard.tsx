import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";
import { Logo } from "@/components/Logo";
import {
  TrendingUp,
  LogOut,
  Sparkles,
  Zap,
  Activity,
  ArrowUpRight,
  Shield,
  Layers,
  Cpu,
  Mail,
  Phone,
  User,
  MessageSquare
} from "lucide-react";

/* ---------------- REUSABLE SCROLL REVEAL WRAPPER ---------------- */
function ScrollSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          gsap.fromTo(
            el,
            { y: 30, opacity: 0, filter: "blur(6px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out" }
          );
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Fade in dashboard initial container
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }
  }, []);

  if (!user) return null;

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-24 pb-20">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,198,255,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(20,241,149,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />

      {/* Nav Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4">
        <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full glass px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-white">Aether</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full glass px-3 py-1 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]" />
              {user.email}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 transition cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 space-y-32">
        {/* 1. HERO GREETING SECTION */}
        <ScrollSection className="text-center mt-10">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-[#00C6FF]" /> Premium Command Center
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            Welcome back, <span className="text-gradient">{user.name}</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Your wealth command center is fully active. Deploy automated bots and lock in high-yield strategies to multiply your crypto income.
          </p>
        </ScrollSection>

        {/* 2. HOW WE GROW YOUR CAPITAL */}
        <ScrollSection>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-[#00C6FF]">
                01 · Smart Staking
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black leading-tight text-white">
                How We <span className="text-gradient">Grow Your Capital</span>
              </h2>
              <p className="text-white/60 leading-relaxed">
                We believe in simple, transparent wealth generation. Instead of speculative trading, Aether allocates your assets into verified node networks and liquidity pools that generate consistent returns.
              </p>
              <div className="space-y-4">
                {[
                  {
                    t: "Automated Compounding",
                    d: "Earnings are automatically reinvested daily to maximize compound interest."
                  },
                  {
                    t: "Constant Optimization",
                    d: "Funds are dynamically routed 24/7 to the safest high-yield options."
                  },
                  {
                    t: "Zero Leverage Speculation",
                    d: "We do not trade directional assets; your returns come from liquidity premiums."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00C6FF]/10 text-[#00C6FF] font-bold text-[10px]">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.t}</h4>
                      <p className="text-xs text-white/50">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 w-full">
              <CapitalGrowthSimulator />
            </div>
          </div>
        </ScrollSection>

        {/* 3. WHY YOUR MONEY IS SAFE */}
        <ScrollSection>
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-[#14F195]">
              02 · Risk Management
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black leading-tight text-white">
              Why Your <span className="text-gradient">Money is Safe</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Our absolute priority is the defense of your capital. We implement multiple automated and architectural layers to neutralize volatility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                t: "Multi-Signature Vaults",
                desc: "We route all deposits through multi-party computation (MPC) cold custody vaults. No single key or individual can access or withdraw your funds.",
                icon: <Shield className="h-6 w-6 text-[#14F195]" />,
                badge: "Architectural Safeguard"
              },
              {
                t: "Automated Loss Caps",
                desc: "If system parameters trigger unexpected market adjustments, automated stop-locks instantly convert assets back to secured stablecoins.",
                icon: <Cpu className="h-6 w-6 text-[#00C6FF]" />,
                badge: "Algorithmic Protection"
              },
              {
                t: "Delta-Neutral Strategies",
                desc: "By maintaining balanced directional exposure, your yield is generated from trading volumes rather than the volatile prices of crypto tokens.",
                icon: <Layers className="h-6 w-6 text-[#6A5CFF]" />,
                badge: "Hedging Model"
              }
            ].map((prod, i) => (
              <div key={i} className="glass-strong gradient-border rounded-3xl p-6 text-left flex flex-col justify-between h-full space-y-6 group hover:translate-y-[-4px] transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                      {prod.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-white/50 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                      {prod.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[#00C6FF] transition-colors">{prod.t}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{prod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollSection>

        {/* 4. CONTACT / ENQUIRY FORM SECTION */}
        <ScrollSection className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-[#6A5CFF]">
              03 · Request Custom Access
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black leading-tight text-white">
              Consultation <span className="text-gradient">Desk</span>
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Want a customized grid setup or specialized yield lock-ins? Submit your goals and our desk will respond in 24 hours.
            </p>
          </div>

          <ContactEnquiryLoggedIn
            initialName={user.name}
            initialEmail={user.email}
            initialPhone={user.phone}
          />
        </ScrollSection>
      </div>

      {/* Footer */}
      <footer className="relative mt-32 border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" glow={false} />
            <span className="font-bold text-white">Aether</span>
            <span className="text-xs text-white/40 ml-2">
              &copy; 2026 &middot; The Future of Digital Wealth
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- CAPITAL GROWTH SIMULATOR ---------------- */
function CapitalGrowthSimulator() {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(3);

  const bankApy = 0.015; // 1.5%
  const aetherApy = 0.22; // 22%

  const bankGrowth = amount * Math.pow(1 + bankApy, years);
  const aetherGrowth = amount * Math.pow(1 + aetherApy, years);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="glass-strong gradient-border rounded-3xl p-6 md:p-8 space-y-6 text-left relative overflow-hidden">
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white">Compound Growth Simulator</h3>
        <p className="text-xs text-white/60">
          Compare Aether's yield optimization to traditional banking options over time.
        </p>
      </div>

      <div className="space-y-6">
        {/* Slider for Amount */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Initial Deposit</span>
            <span className="text-white font-bold">{formatter.format(amount)}</span>
          </div>
          <input
            type="range"
            min="5000"
            max="250000"
            step="5000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00C6FF]"
          />
        </div>

        {/* Buttons for Years */}
        <div className="space-y-2">
          <div className="text-xs text-white/60">Duration</div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((y) => (
              <button
                key={y}
                onClick={() => setYears(y)}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  years === y
                    ? "bg-gradient-brand text-[#03040A] border-transparent"
                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                }`}
              >
                {y} {y === 1 ? "Yr" : "Yrs"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-white/40">Standard Bank Return (1.5% APY)</span>
          <span className="text-xl font-bold text-white/80 mt-2">{formatter.format(bankGrowth)}</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#00C6FF]/5 border border-[#00C6FF]/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-12 w-12 bg-[#00C6FF]/10 blur-xl rounded-full" />
          <span className="text-[10px] uppercase font-bold text-[#00C6FF]">Aether Optimized Yield (22% APY)</span>
          <span className="text-2xl font-black text-gradient mt-2">{formatter.format(aetherGrowth)}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- LOGGED-IN PAGE CONTACT FORM ---------------- */
function ContactEnquiryLoggedIn({
  initialName,
  initialEmail,
  initialPhone,
}: {
  initialName: string;
  initialEmail: string;
  initialPhone: string;
}) {
  const [form, setForm] = useState({
    name: initialName,
    email: initialEmail,
    phone: initialPhone,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const validatePhone = (val: string) => {
    const cleanPhone = val.replace(/\s+/g, "");
    if (!cleanPhone) return "Please enter a phone number";
    const phoneRegex = /^(\+41|0041|41|0)?[1-9]\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return "Please enter a valid phone number (e.g. 0791234567)";
    }
    return undefined;
  };

  const validateEmail = (val: string) => {
    if (!val) return "Please enter an email address";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return "Please enter a valid email address";
    return undefined;
  };

  const validateName = (val: string) => {
    if (!val.trim()) return "Please enter your full name";
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const phoneErr = validatePhone(form.phone);

    if (nameErr || emailErr || phoneErr) {
      setValidationErrors({ name: nameErr, email: emailErr, phone: phoneErr });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setStatus({
          type: "success",
          msg: "Thank you! Your enquiry has been received successfully.",
        });
        setForm({ ...form, message: "" });
        setValidationErrors({});
      } else {
        setStatus({
          type: "error",
          msg: data.error || "An error occurred during submission.",
        });
      }
    } catch (err: unknown) {
      setLoading(false);
      setStatus({ type: "error", msg: "Network error. Please try again." });
    }
  };

  return (
    <div className="glass-strong noise rounded-3xl p-8 border border-white/10 relative">
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-white/50 font-bold">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setValidationErrors((prev) => ({ ...prev, name: validateName(e.target.value) }));
                }}
                className={`w-full rounded-xl bg-white/5 border ${validationErrors.name ? "border-destructive" : "border-white/10"} px-4 py-3 outline-none focus:border-[#00C6FF] transition text-white`}
              />
            </div>
            {validationErrors.name && (
              <p className="text-xs text-destructive mt-1.5">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-white/50 font-bold">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setValidationErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                }}
                className={`w-full rounded-xl bg-white/5 border ${validationErrors.email ? "border-destructive" : "border-white/10"} px-4 py-3 outline-none focus:border-[#00C6FF] transition text-white`}
              />
            </div>
            {validationErrors.email && (
              <p className="text-xs text-destructive mt-1.5">{validationErrors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50 font-bold">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                setValidationErrors((prev) => ({ ...prev, phone: validatePhone(e.target.value) }));
              }}
              className={`w-full rounded-xl bg-white/5 border ${validationErrors.phone ? "border-destructive" : "border-white/10"} px-4 py-3 outline-none focus:border-[#00C6FF] transition text-white`}
            />
          </div>
          {validationErrors.phone && (
            <p className="text-xs text-destructive mt-1.5">{validationErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50 font-bold">
            Message (Optional)
          </label>
          <textarea
            rows={4}
            placeholder="Outline your investment goals…"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#00C6FF] transition text-white"
          />
        </div>

        {status && (
          <div
            className={`rounded-xl border p-4 text-xs leading-relaxed ${status.type === "success" ? "border-accent/20 bg-accent/10 text-[#14F195]" : "border-destructive/20 bg-destructive/10 text-destructive"}`}
          >
            {status.msg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="shine-btn w-full rounded-full bg-gradient-brand px-6 py-4 text-sm font-semibold text-[#03040A] shadow-[0_0_20px_rgba(0,198,255,0.3)] disabled:opacity-50 transition cursor-pointer"
        >
          {loading ? "Submitting enquiry..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
}
