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

        {/* 2. CRYPTO TRADING BOTS SECTION */}
        <ScrollSection>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 text-left space-y-4">
              <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-[#00C6FF]">
                01 · Automation
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black leading-tight text-white">
                Crypto <span className="text-gradient">Trading Bots</span>
              </h2>
              <p className="text-white/60 leading-relaxed">
                Maximize returns on autopilot. Deploy high-frequency algorithms and grid strategies designed to capture profits from short-term price movements 24/7.
              </p>
              <div className="pt-4 h-48 rounded-2xl bg-white/5 border border-white/5 p-4 relative overflow-hidden">
                <div className="absolute top-3 left-4 text-[10px] uppercase text-white/40 font-bold flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-[#14F195] animate-pulse" /> Live Market Signal Feed
                </div>
                <div className="mt-4 h-36">
                  <CandlestickChart />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  t: "Alpha Grid Bot",
                  d: "Executes DCA & automatic grid sweeps within volatility channels. Configured for major pairs.",
                  apy: "28.4% APY",
                  state: "Active",
                  color: "#14F195",
                  details: "Grid Range: $68,500 - $72,500"
                },
                {
                  t: "Arbitrage Scanner",
                  d: "Constantly scans cross-venue rate mismatches between integrated institutional exchanges.",
                  apy: "18.2% APY",
                  state: "Idle",
                  color: "#ffd063",
                  details: "Bypasses Aether Custody clearing desk"
                },
                {
                  t: "Neural Momentum Tracker",
                  d: "Leverages machine learning sentiment filters and RSI indicators for trend scaling.",
                  apy: "34.6% APY",
                  state: "Active",
                  color: "#14F195",
                  details: "Max Drawdown Cap: 4.5%"
                }
              ].map((bot, i) => (
                <div key={i} className="glass-strong gradient-border rounded-3xl p-6 text-left relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-md">
                    <div className="flex items-center gap-3">
                      <span className="flex h-2.5 w-2.5 rounded-full animate-pulse" style={{ backgroundColor: bot.color }} />
                      <h3 className="font-display text-xl font-bold text-white">{bot.t}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-white/40">{bot.state}</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{bot.d}</p>
                    <div className="text-[10px] text-white/40 font-mono">{bot.details}</div>
                  </div>
                  <div className="text-right flex md:flex-col items-baseline md:items-end justify-between md:justify-center border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <span className="text-xs text-white/50 md:mb-1">Target Yield</span>
                    <span className="text-2xl font-black text-gradient">{bot.apy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* 3. HIGH YIELD PRODUCTS SECTION */}
        <ScrollSection>
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-[#14F195]">
              02 · Maximize Returns
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black leading-tight text-white">
              High-Yield <span className="text-gradient">Opportunities</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Access high-return yield pools and leverage vaults designed to accelerate your passive earnings while secured under insured custody.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                t: "Leveraged ETH Vault",
                desc: "3x leveraged consensus node staking optimization strategy utilizing lending loops.",
                apy: "42.8% APY",
                risk: "Moderate Risk",
                icon: <Zap className="h-6 w-6 text-[#00C6FF]" />,
                detail: "Liquidation Buffer: 28%"
              },
              {
                t: "USDC Market Maker Pool",
                desc: "Delta-neutral automated market maker provision strategy exploiting liquidity premiums.",
                apy: "24.5% APY",
                risk: "Low Risk",
                icon: <Layers className="h-6 w-6 text-[#6A5CFF]" />,
                detail: "Zero directional exposure"
              },
              {
                t: "Tokenized RWA Pool",
                desc: "Stable off-chain yields backed fully by trade finance invoicing and corporate credit debt.",
                apy: "19.8% APY",
                risk: "Very Low Risk",
                icon: <Shield className="h-6 w-6 text-[#14F195]" />,
                detail: "Quarterly liquidity windows"
              }
            ].map((prod, i) => (
              <div key={i} className="glass-strong gradient-border rounded-3xl p-6 text-left flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      {prod.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-white/50 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                      {prod.risk}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{prod.t}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{prod.desc}</p>
                </div>
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <div className="text-[10px] text-white/40 font-mono">{prod.detail}</div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gradient">{prod.apy}</div>
                  </div>
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

/* ---------------- CUSTOM CANDLESTICK SIMULATOR ---------------- */
function CandlestickChart() {
  const [candles, setCandles] = useState<{ o: number; h: number; l: number; c: number }[]>([]);
  const w = 450,
    h = 160;

  useEffect(() => {
    // Generate initial candles
    const list = [];
    let cur = 71200;
    for (let i = 0; i < 22; i++) {
      const o = cur;
      const c = cur + (Math.random() - 0.48) * 80;
      const h = Math.max(o, c) + Math.random() * 30;
      const l = Math.min(o, c) - Math.random() * 30;
      list.push({ o, h, l, c });
      cur = c;
    }
    setCandles(list);

    // Live ticker update
    const interval = setInterval(() => {
      setCandles((prev) => {
        const next = [...prev];
        next.shift();
        const last = next[next.length - 1];
        const o = last.c;
        const c = last.c + (Math.random() - 0.48) * 90;
        const h = Math.max(o, c) + Math.random() * 35;
        const l = Math.min(o, c) - Math.random() * 35;
        next.push({ o, h, l, c });
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  if (candles.length === 0) return null;

  const minVal = Math.min(...candles.map((c) => c.l));
  const maxVal = Math.max(...candles.map((c) => c.h));
  const valRange = maxVal - minVal;

  const getX = (i: number) => i * (w / candles.length) + w / candles.length / 2;
  const getY = (val: number) => h - ((val - minVal) / valRange) * h;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible">
      {candles.map((c, i) => {
        const x = getX(i);
        const yOpen = getY(c.o);
        const yClose = getY(c.c);
        const yHigh = getY(c.h);
        const yLow = getY(c.l);
        const isUp = c.c >= c.o;
        const color = isUp ? "#14F195" : "#ff6b81";
        const width = 10;

        return (
          <g key={i}>
            {/* Wick */}
            <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1.5" />
            {/* Body */}
            <rect
              x={x - width / 2}
              y={Math.min(yOpen, yClose)}
              width={width}
              height={Math.max(2, Math.abs(yOpen - yClose))}
              fill={color}
              rx="1.5"
            />
          </g>
        );
      })}
    </svg>
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
