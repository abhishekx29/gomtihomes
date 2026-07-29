import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Phone, MessageCircle, MapPin, CheckCircle2, GraduationCap, TreePine,
  Route as RouteIcon, TrendingUp, Building2, Droplet, Zap, Shield,
  ShoppingBag, Hospital, School, Plane, Train, Star, ChevronDown,
  Home, Sparkles, Clock, IndianRupee, ArrowRight, Landmark,
} from "lucide-react";
import heroImg from "@/assets/hero-aerial.jpg";
import logoImg from "@/assets/logo.png";
import gRoads from "@/assets/g-roads.jpg";
import gPlot from "@/assets/g-plot.jpg";
import plotsGraphic from "@/assets/plots graphics.png";

const PHONE = "+918604940110";
const WHATSAPP = "918604940110";
const WA_MSG = encodeURIComponent("Hi, I'm interested in the Gomti Nagar Extension plots. Please share details.");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Residential Plots in Gomti Nagar Extension, Lucknow | Near Amity University" },
      { name: "description", content: "1250 sq.ft. residential plots in Gomti Nagar Extension near Amity University. Wide roads, good community, bank loan assistance. Book your site visit today." },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Own Your Dream Plot in Gomti Nagar Ext, Lucknow" },
      { property: "og:description", content: "Premium residential plots near Amity University — excellent connectivity & high appreciation potential." },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Premium Plots in Gomti Nagar Extension, Lucknow" },
      { name: "twitter:description", content: "Residential plots near Amity University. Book a site visit today." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: "Green Meadows Plots — Gomti Nagar Extension",
        areaServed: "Lucknow",
        address: { "@type": "PostalAddress", addressLocality: "Gomti Nagar Extension", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
        telephone: PHONE,
        priceRange: "₹₹",
      }),
    }],
  }),
  component: LandingPage,
});

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <Nav scrolled={scrolled} />
      <Hero />
      <Stats />
      <WhyInvest />
      <Location />
      <Highlights />
      <Layout />
      <Pricing />
      <Investment />
      <Gallery />
      <Testimonials />
      <Faq openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <LeadForm />
      <Trust />
      <Footer />
      <FloatingWhatsApp />
      <StickyMobile />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ scrolled }: { scrolled: boolean }) {
  const links = [
    ["Why Invest", "#why"],
    ["Location", "#location"],
    ["Master Plan", "#layout"],
    ["Pricing", "#pricing"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-card py-2.5" : "bg-transparent py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-display font-bold">
          <span className={`grid h-[3.5rem] w-[3.5rem] place-items-center rounded-xl bg-white shadow-elegant p-1`}>
            <img src={logoImg} alt="Gomti Homes" className="h-[2.1rem] w-[2.1rem] object-contain" />
          </span>
          <span className={`text-[1.6875rem] ${scrolled ? "text-foreground" : "text-white"}`}>Gomti Homes</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className={`text-sm font-medium transition-colors ${scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"}`}>{l}</a>
          ))}
        </nav>
        <a href={`tel:${PHONE}`} className="hidden items-center gap-2 rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-semibold text-cta-foreground shadow-cta-glow transition hover:scale-105 sm:inline-flex">
          <Phone className="h-4 w-4" /> Call Now
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const badges = ["Registry Available", "Ready for Construction", "Bank Loan Assistance"];
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <img src={heroImg} alt="Aerial view of residential plots in Gomti Nagar Extension near Amity University" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1200} />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-32 pb-36 sm:px-6">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Now Booking · Phase II
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-white drop-shadow-[0_20px_60px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-7xl">
            Own Your Dream Plot in <span className="text-gold">Gomti Nagar Ext</span>, Lucknow
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg md:text-xl">
            Premium Residential Plots Near Amity University · Excellent Connectivity · High Appreciation Potential.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md">
                <CheckCircle2 className="h-3.5 w-3.5 text-gold" /> {b}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-cta px-6 py-3.5 font-semibold text-cta-foreground shadow-cta-glow transition hover:scale-105">
              Schedule Site Visit <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-primary shadow-elegant transition hover:scale-105">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-white shadow-elegant transition hover:scale-105">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Hero stat strip */}
      <div className="absolute inset-x-0 bottom-4 z-10">
        <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/20 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md md:grid-cols-4">
            {[
              ["Starting From", "₹29 Lakhs"],
              ["Plot Sizes", "1250 sq.ft."],
              ["Location", "Prime · Gomti Nagar Ext."],
              ["Inventory", "Limited · Phase II"],
            ].map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-[11px] uppercase tracking-wider text-white/70">{k}</div>
                <div className="mt-1 font-display text-lg font-bold text-white sm:text-xl">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS strip removed (merged into hero) ---------------- */
function Stats() {
  return (
    <section className="border-b border-border/60 bg-gradient-soft py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center sm:px-6 md:grid-cols-4">
        {[
          ["50+", "Happy Families"],
          ["12+", "Years of Trust"],
          ["100%", "Approvals"],
          ["4.9★", "Buyer Rating"],
        ].map(([n, l]) => (
          <div key={l}>
            <div className="font-display text-3xl font-extrabold text-primary sm:text-4xl">{n}</div>
            <div className="mt-1 text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WHY INVEST ---------------- */
function WhyInvest() {
  const items = [
    [GraduationCap, "Near Amity University", "1.4 kilometer from Amity University campus."],
    [TrendingUp, "Rapidly Developing Area", "Infrastructure growth driving prices."],
    [RouteIcon, "Wide 30 ft Roads", "Well planned internal road grid."],
    [TreePine, "Green Environment", "Landscaped parks & tree-lined avenues."],
    [Train, "Excellent Connectivity", "Metro, expressway & airport nearby."],
    [IndianRupee, "High ROI Potential", "Projected 2× appreciation in 5 yrs."],
    [Building2, "Future Metro Line", "Upcoming metro just 2 km away."],
    [Droplet, "24×7 Water & Power", "Underground utilities in place."],
    [Shield, "Good Community", "Become part of a vibrant community that offers safety and convenience"],
    [Home, "Peaceful Residential", "Low-density, family-friendly zone."],
  ];
  return (
    <Section id="why" eyebrow="Why Invest" title="Ten reasons this is the smartest plot buy in Lucknow" desc="Growth drivers you can see today, and appreciation you'll feel tomorrow.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map(([Icon, t, d]) => (
          <div key={t as string} className="group hover-lift rounded-2xl bg-card p-5 shadow-card">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white shadow-elegant">
              
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-foreground">{t as string}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- LOCATION ---------------- */
function Location() {
  const near = [
    [GraduationCap, "Amity University", "5 min"],
    [ShoppingBag, "Lulu Mall", "15 min"],
    [RouteIcon, "Shaheed Path", "8 min"],
    [RouteIcon, "Sultanpur Road", "6 min"],
    [MapPin, "Gomti Nagar Ext.", "In-locality"],
    [Plane, "CCS Airport", "35 min"],
    [Train, "Charbagh Station", "30 min"],
    [Hospital, "Medanta Hospital", "12 min"],
    [School, "CMS / DPS Schools", "10 min"],
    [ShoppingBag, "Phoenix Palassio", "18 min"],
  ];
  return (
    <Section id="location" eyebrow="Location" title="A prime address at the centre of new Lucknow" desc="Everything that matters — education, healthcare, retail, transit — within a short drive.">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="overflow-hidden rounded-3xl shadow-elegant lg:col-span-3">
          <iframe
            title="Project location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28479.192139622213!2d81.0353916347656!3d26.843163999999977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1784982054269!5m2!1sen!2sin"
            className="h-[420px] w-full border-0 lg:h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
          {near.map(([Icon, name, time]) => (
            <div key={name as string} className="hover-lift flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-foreground">{name as string}</div>
                <div className="text-xs text-muted-foreground">Distance</div>
              </div>
              <div className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                <Clock className="mr-1 inline h-3 w-3" />{time as string}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- HIGHLIGHTS ---------------- */
function Highlights() {
  const items = [
    ["🏡", "Residential Plots"],
    ["🛣️", "Wide Roads"],
    ["🌳", "Green Environment"],
    ["💧", "24×7 Water"],
    ["⚡", "Electricity"],
    ["🏫", "Educational Hub"],
    ["🏥", "Hospitals Nearby"],
    ["🛒", "Markets Nearby"],
    ["🚗", "Great Connectivity"],
    ["📈", "Investment Grade"],
  ];
  return (
    <Section id="highlights" eyebrow="Project Highlights" title="Built for the way modern families want to live" desc="Every detail engineered around comfort, community and long-term value.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {items.map(([e, t]) => (
          <div key={t} className="hover-lift group rounded-2xl bg-gradient-soft p-5 text-center shadow-card">
            <div className="text-3xl transition group-hover:scale-110">{e}</div>
            <div className="mt-2 text-sm font-semibold text-foreground">{t}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- MASTER PLAN ---------------- */
function Layout() {
  // 6x5 grid of plots
  const plots = Array.from({ length: 30 }, (_, i) => {
    const mod = i % 5;
    const status = mod === 0 ? "sold" : mod === 1 ? "booked" : "available";
    return { id: i + 1, status };
  });
  const [selected, setSelected] = useState<number | null>(null);
  const legend = [
    ["Available", "bg-primary"],
    ["Booked", "bg-gold"],
    ["Sold", "bg-muted-foreground/60"],
  ];
  return (
    <Section id="layout" eyebrow="Master Plan" title="Choose your plot on the interactive layout" desc="Hurry Up! only few left">
      <div className="overflow-hidden rounded-3xl bg-card p-6 shadow-elegant">
        
        <div className="w-full">
          <img src={plotsGraphic} alt="Master plan layout" className="w-full rounded-lg object-cover" />
        </div>
        {selected && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-accent px-4 py-3">
            <div className="text-sm">
              <span className="font-semibold text-primary">Plot #{selected}</span>
              <span className="ml-2 text-muted-foreground">is available · Enquire for size & price.</span>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-cta px-4 py-2 text-sm font-semibold text-cta-foreground shadow-cta-glow">
              Reserve Plot <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}

/* ---------------- PRICING ---------------- */
function Pricing() {
  const plots = [
    { label: "Plot 1", size: "1250", price: "29.00" },
    { label: "Plot 2", size: "1250", price: "29.00" },
  ];
  return (
    <Section id="pricing" eyebrow="Plot Sizes & Pricing" title="Transparent pricing across every plot size" desc="All-inclusive indicative pricing. Final rate depends on plot position, corner premium & payment plan.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {plots.map((p) => (
          <div key={p.label} className="hover-lift relative rounded-3xl p-6 bg-card shadow-card">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-muted-foreground/10 px-3 py-1 text-[11px] font-bold uppercase text-muted-foreground shadow-sm">
              {p.label}
            </span>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plot Size</div>
            <div className="mt-1 font-display text-3xl font-extrabold">{p.size} <span className="text-base font-medium opacity-80">sq.ft.</span></div>
            <div className="mt-4 text-xs text-muted-foreground">Starting Price</div>
            <div className="font-display text-3xl font-extrabold">₹{p.price} L<span className="text-sm font-medium opacity-80">*</span></div>
            <a href="#contact" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-cta px-4 py-2.5 text-sm font-semibold text-cta-foreground shadow-cta-glow transition hover:scale-[1.02]">
              Book Site Visit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-xs text-muted-foreground">*Prices are indicative and subject to change. Limited inventory — book early to lock current rates.</p>
    </Section>
  );
}

/* ---------------- INVESTMENT TIMELINE ---------------- */
function Investment() {
  const steps = [
    ["2024", "Growing Infrastructure", "Sultanpur Road & Shaheed Path expansion complete."],
    ["2025", "Amity University Campus", "New campus operational — student & staff demand surges."],
    ["2026", "Road & Metro Expansion", "Proposed metro corridor extension nears completion."],
    ["2027", "Commercial Growth", "Retail hubs & office parks push property demand higher."],
    ["2028+", "Peak Appreciation", "Projected 2×–2.5× value on today's rates."],
  ];
  return (
    <Section id="investment" eyebrow="Investment Timeline" title="Get in before the next growth wave" desc="Every milestone below is a documented catalyst for property appreciation in the corridor.">
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-gold to-cta md:left-1/2 md:-translate-x-1/2" />
        <div className="space-y-6">
          {steps.map(([y, t, d], i) => (
            <div key={t} className={`relative flex flex-col gap-4 md:flex-row md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <div className="hidden w-1/2 md:block" />
              <div className="absolute left-4 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-white shadow-elegant md:left-1/2">
                {i + 1}
              </div>
              <div className="ml-12 w-full rounded-2xl bg-card p-5 shadow-card md:ml-0 md:w-1/2 md:px-8">
                <div className="text-xs font-bold uppercase tracking-wider text-cta">{y}</div>
                <div className="mt-1 font-display text-lg font-semibold text-foreground">{t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const imgs = [
    [heroImg, "Aerial view", "row-span-2 col-span-2"],
    [gRoads, "2 plots", ""],
    [gPlot, "Ready plots", "col-span-2"],
  ];
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <Section id="gallery" eyebrow="Gallery" title="See the project through the lens" desc="Real photos from site — updated regularly.">
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
        {imgs.map(([src, alt, cls]) => (
          <button
            key={alt as string}
            onClick={() => setLightbox(src as string)}
            className={`group relative overflow-hidden rounded-2xl shadow-card ${cls as string}`}
          >
            <img src={src as string} alt={alt as string} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 translate-y-2 text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              {alt as string}
            </div>
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-h-[92vh] max-w-[95vw] rounded-2xl shadow-elegant" />
        </div>
      )}
    </Section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    { n: "Rakesh Sharma", r: "Investor · Delhi", t: "Bought two plots in Phase I — value has appreciated 45% in 18 months. Genuine team, clean paperwork." },
    { n: "Ananya Verma", r: "IT Professional · Lucknow", t: "Wanted a home near Amity for my daughter. Location & connectivity are unbeatable. Highly recommended." },
    { n: "Dr. Imran Khan", r: "NRI Buyer · Dubai", t: "Handled every step remotely — from documentation to registry. Zero hassle, complete transparency." },
    { n: "Priya Mehta", r: "First-time Buyer", t: "Loan assistance made it so smooth. I couldn't have asked for a better first investment." },
  ];
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="Trusted by families and investors" desc="Real stories from real buyers.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((t) => (
          <div key={t.n} className="hover-lift flex h-full flex-col rounded-2xl bg-card p-6 shadow-card">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">"{t.t}"</p>
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-bold text-white">{t.n[0]}</div>
              <div>
                <div className="text-sm font-semibold text-foreground">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq({ openFaq, setOpenFaq }: { openFaq: number | null; setOpenFaq: (n: number | null) => void }) {
  const qs = [
    ["Is Registry Available?", "Yes. Registry is available on every plot immediately upon full payment, at the sub-registrar office."],
    ["Is a Home Loan Available?", "Yes. We're empanelled with SBI, HDFC, ICICI, LIC HFL and Bank of Baroda. Our team assists you end-to-end."],
       ["Is the project approved?", "Yes. The layout has all necessary approvals and NOCs available for inspection at our site office."],
    ["When is the possession?", "Immediate. Plots are physically demarcated, boundary-walled and ready for construction."],
    ["What payment plans do you offer?", "Down-payment, 3/6/12 month instalment and construction-linked plans. Custom plans available on request."],
    ["Are there construction rules?", "Yes. Standard LDA norms apply: setback, FAR, and height as per zoning. Full guidelines shared at booking."],
  ];
  return (
    <Section id="faq" eyebrow="FAQs" title="Everything you wanted to ask" desc="Quick answers to the most common buyer questions.">
      <div className="mx-auto max-w-3xl space-y-3">
        {qs.map(([q, a], i) => {
          const open = openFaq === i;
          return (
            <div key={q} className="overflow-hidden rounded-2xl bg-card shadow-card">
              <button className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" onClick={() => setOpenFaq(open ? null : i)}>
                <span className="font-display font-semibold text-foreground">{q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- LEAD FORM ---------------- */
function LeadForm() {
  const [modal, setModal] = useState<{ title: string; message: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name")?.toString().trim() || "",
      phone: data.get("phone")?.toString().trim() || "",
      email: data.get("email")?.toString().trim() || "",
      date: data.get("date")?.toString().trim() || "",
      message: data.get("message")?.toString().trim() || "",
    };

    try {
      const submitUrl = typeof window !== "undefined" ? new URL("/api/submit-lead", window.location.origin).toString() : "/api/submit-lead";
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        credentials: "same-origin",
      });

      const responseText = await response.text();
      let result: { success?: boolean; error?: string; fallback?: boolean; message?: string } = { success: false };

      try {
        result = JSON.parse(responseText) as { success?: boolean; error?: string; fallback?: boolean; message?: string };
      } catch {
        result = { success: response.ok };
      }

      if (!response.ok) {
        throw new Error(result.error || result.message || "Unable to send your request.");
      }

      if (result.success !== true && result.fallback !== true) {
        throw new Error(result.error || result.message || "Unable to send your request.");
      }

      setModal({
        title: "Request received",
        message: result.message || "Thanks! Our team will contact you shortly.",
        type: "success",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      setModal({
        title: "Submission failed",
        message: "We couldn't send your request right now. Please call us directly at +918604940110.",
        type: "error",
      });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Limited Inventory
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Reserve Your Plot Before Prices Rise
          </h2>
          <p className="mt-4 max-w-lg text-white/85">
            Prices expected to increase in the next phase. Book a site visit today — free pickup & drop from Lucknow within 15 km.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href={`tel:${PHONE}`} className="flex items-center gap-3 rounded-2xl glass-dark p-4 text-white transition hover:scale-[1.02]">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-cta shadow-cta-glow"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/70">Call</div>
                <div className="font-semibold">+918604940110</div>
              </div>
            </a>
            <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl glass-dark p-4 text-white transition hover:scale-[1.02]">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-whatsapp"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/70">WhatsApp</div>
                <div className="font-semibold">Instant Reply</div>
              </div>
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} action="/api/submit-lead" method="post" className="rounded-3xl bg-card p-6 shadow-elegant sm:p-8">
          <h3 className="font-display text-2xl font-bold text-foreground">Book Your Site Visit</h3>
          <p className="mt-1 text-sm text-muted-foreground">Fill the form — our senior consultant will call you within 15 minutes.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" name="name" type="text" required />
            <Field label="Phone" name="phone" type="tel" required />
            <Field label="Email" name="email" type="email" />
            <Field label="Preferred Visit Date" name="date" type="date" />
          </div>
          <div className="mt-4">
            <Field label="Message" name="message" as="textarea" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-cta px-6 py-3 font-semibold text-cta-foreground shadow-cta-glow transition hover:scale-[1.02] sm:flex-none">
              Book Site Visit <ArrowRight className="h-4 w-4" />
            </button>
            <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white transition hover:scale-[1.02]">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">By submitting, you agree to be contacted about this project. We respect your privacy.</p>
        </form>

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{modal.type === "success" ? "Success" : "Error"}</p>
                  <h3 className="mt-3 text-2xl font-bold text-foreground">{modal.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="text-foreground/70 transition hover:text-foreground"
                >
                  ×
                </button>
              </div>
              <p className={`mt-5 text-sm ${modal.type === "success" ? "text-foreground/80" : "text-red-700"}`}>
                {modal.message}
              </p>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, as, options }: { label: string; name: string; type?: string; required?: boolean; as?: "select" | "textarea"; options?: string[] }) {
  const base = "mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
  return (
    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}{required && <span className="text-cta"> *</span>}
      {as === "select" ? (
        <select name={name} required={required} className={base} defaultValue="">
          <option value="" disabled>Select…</option>
          {options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : as === "textarea" ? (
        <textarea name={name} rows={3} className={base} placeholder="Anything specific you're looking for?" />
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  );
}

/* ---------------- TRUST ---------------- */
function Trust() {
  const items = [
    "Approvals", "Transparent Documentation", "Registry Support",
    "Bank Loan Assistance", "Professional Sales Team", "Secure Investment",
  ];
  return (
    <Section id="trust" eyebrow="Why Trust Us" title="Backed by trust, delivered with transparency" desc="Every promise we make is backed by paperwork and proof.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <div key={t} className="hover-lift flex items-center gap-3 rounded-2xl bg-card p-5 shadow-card">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-gold text-gold-foreground shadow-gold-glow">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">{t}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-[3.5rem] w-[3.5rem] place-items-center rounded-xl bg-white p-1"><img src={logoImg} alt="Gomti Homes" className="h-[2.1rem] w-[2.1rem] object-contain" /></span>
            <span className="font-display text-[1.6875rem] font-bold">Gomti Homes</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/75">
            Premium residential plots in Gomti Nagar Extension, Lucknow — near Amity University campus.
          </p>
    
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /> +918604940110</li>
            <li className="flex gap-2"><MessageCircle className="h-4 w-4 shrink-0" /> WhatsApp 24×7</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" /> Gomti Nagar Ext., Lucknow, UP</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            {[["Why Invest", "#why"], ["Master Plan", "#layout"], ["Pricing", "#pricing"], ["Gallery", "#gallery"], ["FAQs", "#faq"]].map(([l, h]) => (
              <li key={h}><a href={h} className="hover:text-gold">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/70 sm:flex-row sm:px-6">
          <div>© {new Date().getFullYear()} Gomti Homes. All rights reserved.</div>
          <div className="flex gap-4"><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Terms</a><a href="#" className="hover:text-white">Disclaimer</a></div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating & Sticky ---------------- */
function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`}
      target="_blank" rel="noopener"
      className="animate-float fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-elegant transition hover:scale-110 md:bottom-6"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function StickyMobile() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-1 border-t border-border bg-card p-2 shadow-elegant md:hidden">
      <a href={`tel:${PHONE}`} className="flex flex-col items-center rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground">
        <Phone className="h-4 w-4" /> Call
      </a>
      <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noopener" className="flex flex-col items-center rounded-xl bg-whatsapp py-2 text-xs font-semibold text-white">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
      <a href="#contact" className="flex flex-col items-center rounded-xl bg-gradient-cta py-2 text-xs font-semibold text-cta-foreground">
        <MapPin className="h-4 w-4" /> Site Visit
      </a>
    </div>
  );
}

/* ---------------- Section wrapper ---------------- */
function Section({ id, eyebrow, title, desc, children }: { id?: string; eyebrow: string; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            {eyebrow}
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">{title}</h2>
          {desc && <p className="mt-3 text-base text-muted-foreground">{desc}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
