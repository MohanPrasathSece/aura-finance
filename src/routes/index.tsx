import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LiquidEther from "@/components/LiquidEther";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aether — The Future of Digital Wealth" },
      { name: "description", content: "Institutional crypto investing for people who move markets. Enter the advanced financial operating system." },
      { property: "og:title", content: "Aether — The Future of Digital Wealth" },
      { property: "og:description", content: "Institutional-grade crypto investing, AI portfolios, and tokenization for market movers." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Services />
      <Showcase />
      <Experience />
      <Contact />
      <Footer />
      <ScrollProgress />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full glass px-6 py-3 mx-4 md:mx-auto">
        <a href="#" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-gradient-brand shadow-[0_0_20px_rgba(0,198,255,0.6)]" />
          <span className="text-lg font-bold tracking-tight">Aether</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#showcase" className="hover:text-white transition">Platform</a>
          <a href="#experience" className="hover:text-white transition">Experience</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <div className="hidden lg:flex items-center gap-3 text-xs">
          <Ticker />
        </div>
        <button className="shine-btn rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-[#03040A]">
          Launch App
        </button>
      </div>
    </header>
  );
}

function Ticker() {
  const items = [
    { s: "BTC", p: "$71,240", c: "+2.4%", pos: true },
    { s: "ETH", p: "$3,812", c: "+1.9%", pos: true },
    { s: "SOL", p: "$182.10", c: "-0.6%", pos: false },
  ];
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
      {items.map((i) => (
        <div key={i.s} className="flex items-center gap-1.5">
          <span className="font-semibold text-white/90">{i.s}</span>
          <span className="text-white/60">{i.p}</span>
          <span className={i.pos ? "text-[#14F195]" : "text-[#ff6b81]"}>{i.c}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const dashRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>("[data-letter]");
    gsap.set(spans, { yPercent: 120, opacity: 0, filter: "blur(20px)" });
    gsap.to(spans, {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.025,
      delay: 0.2,
    });
    if (subRef.current) {
      gsap.fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.9, ease: "power3.out" });
    }
    if (dashRef.current) {
      gsap.fromTo(dashRef.current, { scale: 0.85, opacity: 0, rotateY: -15 }, { scale: 1, opacity: 1, rotateY: 0, duration: 1.4, delay: 0.4, ease: "power3.out" });
    }
  }, []);

  // mouse parallax for dashboard
  useEffect(() => {
    const hero = heroRef.current;
    const dash = dashRef.current;
    if (!hero || !dash) return;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(dash, { rotationY: x * 12, rotationX: -y * 10, x: x * 20, y: y * 20, duration: 0.6, ease: "power2.out" });
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  const line1 = "BUILD";
  const line2 = "THE FUTURE";
  const line3 = "OF WEALTH";
  const renderLetters = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} data-letter className="inline-block will-change-transform" style={{ whiteSpace: "pre" }}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden pt-24">
      {/* Liquid ether background */}
      <div className="pointer-events-auto absolute inset-0">
        <LiquidEther
          colors={["#00C6FF", "#6A5CFF", "#14F195"]}
          mouseForce={22}
          cursorSize={120}
          resolution={0.5}
          autoDemo
          autoSpeed={0.55}
          autoIntensity={2.4}
        />
      </div>
      {/* Dark overlays for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#03040A_85%)]" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pt-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#14F195] animate-pulse" />
            The Financial Operating System · v4.2
          </div>
          <h1
            ref={headingRef}
            className="font-display font-black uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(56px, 11vw, 150px)" }}
          >
            <div className="overflow-hidden">{renderLetters(line1)}</div>
            <div className="overflow-hidden">{renderLetters(line2)}</div>
            <div className="overflow-hidden">
              <span className="text-gradient">{renderLetters(line3)}</span>
            </div>
          </h1>
          <p ref={subRef} className="mt-8 max-w-xl text-lg text-white/70">
            Institutional crypto investing for people who move markets. One system for portfolios, custody, AI signals and tokenized assets.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="shine-btn rounded-full bg-gradient-brand px-8 py-4 text-base font-semibold text-[#03040A] shadow-[0_0_40px_rgba(0,198,255,0.35)] hover:shadow-[0_0_60px_rgba(106,92,255,0.5)] transition-shadow">
              Launch Portfolio →
            </button>
            <button className="glass rounded-full px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition">
              ▶ Watch Platform
            </button>
          </div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6">
            {[
              { k: "$12B+", v: "AUM" },
              { k: "152", v: "Countries" },
              { k: "99.99%", v: "Uptime" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl font-bold text-white">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating glass dashboard */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div ref={dashRef} style={{ transformStyle: "preserve-3d", perspective: 1200 }} className="animate-float-tilt w-full max-w-md">
            <FloatingDashboard />
          </div>
        </div>
      </div>

      {/* Bottom curved marquee */}
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-10 overflow-hidden">
        <div className="pointer-events-auto flex animate-marquee gap-10 whitespace-nowrap py-3 text-white/60">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-10 text-2xl md:text-4xl font-black uppercase tracking-tight">
              {["Bitcoin", "Ethereum", "Solana", "AI", "Tokenization", "Web3", "Custody", "Yield"].map((w) => (
                <span key={w} className="flex items-center gap-10">
                  <span className="text-gradient">{w}</span>
                  <span className="text-white/30">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingDashboard() {
  return (
    <div className="glass-strong noise relative overflow-hidden rounded-3xl p-5 shadow-[0_30px_120px_-20px_rgba(0,198,255,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50">Total Balance</div>
          <div className="mt-1 text-3xl font-bold">$4,281,904.22</div>
          <div className="mt-1 text-sm text-[#14F195]">+ $128,401 · +3.09% today</div>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-brand shadow-[0_0_25px_rgba(106,92,255,0.6)]" />
      </div>

      {/* mini chart */}
      <div className="mt-5 h-28 w-full">
        <MiniChart />
      </div>

      <div className="mt-4 space-y-2">
        {[
          { s: "BTC", n: "Bitcoin", p: "$71,240", c: "+2.4%", pos: true, w: "62%" },
          { s: "ETH", n: "Ethereum", p: "$3,812", c: "+1.9%", pos: true, w: "48%" },
          { s: "SOL", n: "Solana", p: "$182.10", c: "-0.6%", pos: false, w: "34%" },
        ].map((c) => (
          <div key={c.s} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-[10px] font-bold text-[#03040A]">{c.s}</span>
              <div>
                <div className="text-sm font-semibold">{c.n}</div>
                <div className="text-[10px] text-white/50">{c.p}</div>
              </div>
            </div>
            <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-brand" style={{ width: c.w }} />
            </div>
            <div className={"text-xs font-semibold " + (c.pos ? "text-[#14F195]" : "text-[#ff6b81]")}>{c.c}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniChart() {
  // static SVG spark w/ gradient
  const pts = [4,10,7,15,12,20,18,14,22,28,25,34,30,40,36,48,42,55,48,50,55,64,60,72,68,68,74,82,80,90];
  const w = 320, h = 100;
  const max = Math.max(...pts);
  const step = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step},${h - (p / max) * h}`).join(" ");
  const area = `${path} L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
      <defs>
        <linearGradient id="lg" x1="0" x2="1">
          <stop offset="0%" stopColor="#00C6FF" />
          <stop offset="50%" stopColor="#6A5CFF" />
          <stop offset="100%" stopColor="#14F195" />
        </linearGradient>
        <linearGradient id="fg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6A5CFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6A5CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#fg)" />
      <path d={path} fill="none" stroke="url(#lg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const services = [
    { t: "Digital Assets", d: "Access 300+ curated tokens with institutional liquidity, deep pools and 24/7 execution across every major venue.", i: "◈" },
    { t: "Institutional Security", d: "Multi-party custody, SOC 2 Type II, MPC key management and cold-vault storage insured up to $250M.", i: "⛨" },
    { t: "AI Portfolio", d: "Adaptive models rebalance in real time, surface alpha across market regimes and hedge tail risk automatically.", i: "✦" },
  ];
  const gridRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".svc-card");
    gsap.fromTo(
      cards,
      { y: 100, opacity: 0, rotateX: -18 },
      {
        y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out", stagger: 0.15,
        scrollTrigger: undefined,
      }
    );
  }, []);
  return (
    <section id="services" className="relative py-32">
      <LineWaves />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full glass px-3 py-1 text-xs text-white/70">02 · What we build</div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight">
            Powering the next generation<br />
            <span className="text-gradient">of investors</span>
          </h2>
        </div>
        <div ref={gridRef} className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.t} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ t, d, i }: { t: string; d: string; i: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current, g = glowRef.current;
    if (!el || !g) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      g.style.background = `radial-gradient(400px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,198,255,0.25), transparent 40%)`;
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className="svc-card gradient-border noise relative overflow-hidden rounded-3xl glass p-8 transition-transform duration-300 hover:-translate-y-2"
    >
      <div ref={glowRef} className="pointer-events-none absolute inset-0" />
      <div className="relative">
        <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-3xl text-[#03040A] shadow-[0_0_40px_rgba(0,198,255,0.4)]">
          {i}
        </div>
        <h3 className="font-display text-2xl font-bold">{t}</h3>
        <p className="mt-3 text-white/60 leading-relaxed">{d}</p>
        <div className="mt-8 flex items-center gap-2 text-sm text-white/70">
          Explore <span className="text-gradient">→</span>
        </div>
      </div>
    </div>
  );
}

function LineWaves() {
  // SVG animated waves at 15% opacity
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.15]">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
        <defs>
          <linearGradient id="wg" x1="0" x2="1">
            <stop offset="0%" stopColor="#00C6FF" />
            <stop offset="100%" stopColor="#6A5CFF" />
          </linearGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${100 + i * 30} Q 250 ${60 + i * 30} 500 ${100 + i * 30} T 1000 ${100 + i * 30}`}
            fill="none"
            stroke="url(#wg)"
            strokeWidth="1"
          >
            <animate attributeName="d" dur={`${8 + i * 0.3}s`} repeatCount="indefinite"
              values={`M0 ${100 + i * 30} Q 250 ${60 + i * 30} 500 ${100 + i * 30} T 1000 ${100 + i * 30};
                      M0 ${100 + i * 30} Q 250 ${140 + i * 30} 500 ${100 + i * 30} T 1000 ${100 + i * 30};
                      M0 ${100 + i * 30} Q 250 ${60 + i * 30} 500 ${100 + i * 30} T 1000 ${100 + i * 30}`} />
          </path>
        ))}
      </svg>
    </div>
  );
}

/* ---------------- SHOWCASE ---------------- */
function Showcase() {
  return (
    <section id="showcase" className="relative overflow-hidden py-40">
      {/* Magic rings */}
      <MagicRings />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <div className="mb-4 inline-flex rounded-full glass px-3 py-1 text-xs text-white/70">03 · Platform</div>
        <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight">
          One command center for<br /><span className="text-gradient">digital wealth</span>
        </h2>

        <div className="relative mx-auto mt-20 flex h-[520px] max-w-3xl items-center justify-center">
          {/* Orbiting coins */}
          <OrbitCoin label="BTC" radius={260} duration="24s" />
          <OrbitCoin label="ETH" radius={320} duration="34s" reverse />
          <OrbitCoin label="SOL" radius={220} duration="18s" />
          {/* Center floating device */}
          <div className="relative z-10 animate-float">
            <div className="glass-strong noise relative w-[280px] rounded-[36px] p-3 shadow-[0_60px_150px_-30px_rgba(106,92,255,0.55)]">
              <div className="rounded-[28px] bg-[#03040A] p-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Portfolio · Live</div>
                <div className="mt-1 text-2xl font-bold">$4.28M</div>
                <div className="text-xs text-[#14F195]">+3.09%</div>
                <div className="mt-3 h-24"><MiniChart /></div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["BTC","ETH","SOL"].map((s)=>(
                    <div key={s} className="rounded-lg bg-white/5 p-2 text-center text-[10px]">
                      <div className="font-bold">{s}</div>
                      <div className="text-[#14F195]">+2.1%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Reflection */}
            <div className="mx-auto mt-2 h-16 w-[240px] rounded-[24px] bg-gradient-brand opacity-20 blur-2xl" />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { k: "$12B+", v: "Assets Managed" },
            { k: "99.99%", v: "Uptime" },
            { k: "152", v: "Countries" },
            { k: "24/7", v: "Trading" },
          ].map((s) => (
            <Counter key={s.v} label={s.v} value={s.k} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MagicRings() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="absolute h-[780px] w-[780px] rounded-full border border-white/5 animate-spin-slow" />
      <div className="absolute h-[600px] w-[600px] rounded-full border border-white/10 animate-spin-slower" />
      <div className="absolute h-[420px] w-[420px] rounded-full border border-white/10" />
      <div className="absolute h-[780px] w-[780px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,198,255,0.25),transparent_60%)] animate-pulse-glow" />
      <div className="absolute h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(106,92,255,0.2),transparent_60%)]" />
    </div>
  );
}

function OrbitCoin({ label, radius, duration, reverse }: { label: string; radius: number; duration: string; reverse?: boolean }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{ animation: `spin-slow ${duration} linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
        <div
          className="glass-strong absolute grid h-14 w-14 place-items-center rounded-full text-xs font-bold shadow-[0_0_30px_rgba(0,198,255,0.5)]"
          style={{ top: -28, left: "50%", transform: "translateX(-50%)" }}
        >
          <span className="text-gradient">{label}</span>
        </div>
      </div>
    </div>
  );
}

function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !shown) {
        setShown(true);
        // pulse-in
        gsap.fromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.6)" });
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return (
    <div ref={ref} className="glass gradient-border rounded-2xl p-6 text-left">
      <div className="font-display text-4xl font-black text-gradient">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}

/* ---------------- EXPERIENCE ---------------- */
function Experience() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const sphereRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const s = sectionRef.current, l = lineRef.current, sp = sphereRef.current;
      if (!s || !l || !sp) return;
      const r = s.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - r.top / vh));
      l.style.height = `${progress * 100}%`;
      sp.style.transform = `rotate(${progress * 360}deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const steps = [
    { n: "01", t: "Join", d: "Onboard in minutes with institutional-grade KYC." },
    { n: "02", t: "Secure Wallet", d: "Assets held in MPC custody with insurance built in." },
    { n: "03", t: "Invest", d: "Choose AI portfolios, custom baskets or manual strategies." },
    { n: "04", t: "Grow", d: "Compound, hedge and rebalance on autopilot." },
  ];
  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden py-40">
      {/* DarkVeil-ish subtle warp */}
      <div className="pointer-events-none absolute inset-0 opacity-40 noise" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,198,255,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(20,241,149,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="mb-4 inline-flex rounded-full glass px-3 py-1 text-xs text-white/70">04 · Experience</div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight">
            Experience the future<br />
            <span className="text-gradient">before everyone else</span>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="relative pl-10">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10">
              <div ref={lineRef} className="w-px bg-gradient-brand" style={{ height: "0%" }} />
            </div>
            <div className="space-y-10">
              {steps.map((s) => (
                <div key={s.n} className="relative">
                  <div className="absolute -left-[38px] top-1 grid h-8 w-8 place-items-center rounded-full glass text-[10px] font-bold shadow-[0_0_20px_rgba(0,198,255,0.4)]">
                    <span className="text-gradient">{s.n}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-white/60 max-w-md">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(106,92,255,0.35),transparent_65%)] blur-3xl" />
            <div
              ref={sphereRef}
              className="relative h-[380px] w-[380px] rounded-full glass-strong noise shadow-[0_0_120px_rgba(0,198,255,0.4)]"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 40%), conic-gradient(from 0deg, #00C6FF, #6A5CFF, #14F195, #00C6FF)",
              }}
            >
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-white/10" />
              <div className="absolute inset-24 rounded-full border border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full glass px-3 py-1 text-xs text-white/70">05 · Access</div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight">
            Ready to build<br />
            your <span className="text-gradient">crypto empire?</span>
          </h2>
          <p className="mt-6 max-w-md text-white/60">
            Aether is invite-only for allocators, family offices and funds moving at least $1M. Request access — we get back within 24 hours.
          </p>
        </div>

        <form className="glass-strong gradient-border noise relative rounded-3xl p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Field label="Full Name" placeholder="Your name" />
          <Field label="Email" placeholder="you@fund.com" type="email" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Country" placeholder="United States" />
            <Field label="Investment Budget" placeholder="$1M — $10M" />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest text-white/50">Message</label>
            <textarea rows={4} placeholder="Tell us about your strategy…"
              className="w-full resize-none rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#00C6FF] transition" />
          </div>
          <button className="shine-btn mt-2 w-full rounded-full bg-gradient-brand px-8 py-4 text-base font-semibold text-[#03040A] shadow-[0_0_40px_rgba(0,198,255,0.4)]">
            Request Access
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-widest text-white/50">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-[#00C6FF] transition"
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-gradient-brand" />
          <span className="font-bold">Aether</span>
          <span className="text-xs text-white/40 ml-2">© 2026 · The Future of Digital Wealth</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">Docs</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SCROLL PROGRESS ---------------- */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      ref.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
      <div ref={ref} className="h-full origin-left bg-gradient-brand" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#fcfbf8" }}
    >
      <img
        data-lovable-blank-page-placeholder="REMOVE_THIS"
        src="https://cdn.gpteng.co/blank-app-v1.svg"
        alt="Your app will live here!"
      />
    </div>
  );
}
