"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Ticket, 
  Users, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Music, 
  Gamepad2, 
  Zap, 
  ChevronRight,
  Monitor,
  Flame
} from "lucide-react";

const TICKETS = [
  {
    id: "general",
    name: "General Admission",
    price: 150,
    currency: "AED",
    desc: "Access to all exhibition halls, live shows & gaming zones",
    perks: ["All Exhibit Halls", "Live Performances", "Gaming Zones", "Food Court Access"],
    color: "#3b82f6",
    badge: "",
  },
  {
    id: "vip",
    name: "VIP Elite Pass",
    price: 450,
    currency: "AED",
    desc: "Premium experience with priority access & exclusive lounges",
    perks: ["All General Benefits", "VIP Lounge Access", "Priority Entry", "Meet & Greet Artists", "Official Merchandise"],
    color: "#f59e0b",
    badge: "MOST POPULAR",
  },
  {
    id: "ultimate",
    name: "Legendary Pass",
    price: 950,
    currency: "AED",
    desc: "The full champion experience — tournaments, backstage & more",
    perks: ["All VIP Benefits", "Tournament Entry", "Backstage Pass", "Pro Player Session", "Premium Gift Pack", "VIP Parking"],
    color: "#a855f7",
    badge: "ULTIMATE EXPERIENCE",
  },
];

const ARTISTS = [
  { name: "DJ Bliss", role: "Main Stage Headliner", img: "/artist_stage.png" },
  { name: "AboFlah", role: "Gaming Influencer Legend", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" },
  { name: "BanderitaX", role: "Meet & Greet Star", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400" },
];

const EVENT_DATE = new Date("2026-05-08T10:00:00+04:00");

export default function GameExpoPage() {
  const [selected, setSelected] = useState("vip");
  const [qty, setQty] = useState(1);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [paymentStep, setPaymentStep] = useState("form"); // form, methods, processing, success
  const [selectedPayment, setSelectedPayment] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const tick = () => {
      const diff = EVENT_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ticket = TICKETS.find((t) => t.id === selected)!;
  const total = ticket.price * qty;

  return (
    <div className="bg-[#020617] min-h-screen text-white selection:bg-primary-500/30">
      {/* Dynamic Header */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="font-black text-2xl tracking-tighter bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">NexusPass Dubai</div>
              <div className="text-[10px] font-bold text-blue-500/80 tracking-[0.3em] uppercase">Official Ticketing Partner</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Expectation", id: "events" },
              { label: "Artists", id: "artists" },
              { label: "Tickets", id: "tickets" },
              { label: "Location", id: "venue" }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#tickets" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Book Tickets
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with optimized overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/gameexpo_hero_dubai.png" alt="GameExpo" className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black tracking-widest uppercase mb-8 animate-bounce-subtle">
              <Flame className="w-4 h-4 fill-current" /> Selling Fast: 85% Tickets Gone
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-8 tracking-tighter">
              <span className="block opacity-70 text-4xl md:text-5xl lg:text-6xl mb-4 font-bold tracking-normal">The Event</span>
              <span className="bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">We're Waiting For</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-medium">
              Join the world's largest gathering of gaming legends, pro esports athletes, and tech visionaries in Dubai.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <a href="#tickets" className="bg-blue-600 hover:bg-blue-500 px-10 py-5 rounded-2xl text-lg font-black transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3">
                <Ticket className="w-6 h-6" /> Get My Pass
              </a>
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold">
                  <div className="text-white">+50k Attending</div>
                  <div className="text-slate-500 text-xs font-medium">Verified Bookings</div>
                </div>
              </div>
            </div>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-4 max-w-md">
              {[["d", "Days"], ["h", "Hrs"], ["m", "Min"], ["s", "Sec"]].map(([k, label]) => (
                <div key={k} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-blue-400">
                    {String(countdown[k as keyof typeof countdown]).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Anticipation Section (New Image) */}
      <section id="events" className="py-24 bg-white/5 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
              <img 
                src="/crowd_waiting.png" 
                alt="Excited Crowd" 
                className="relative rounded-[2rem] border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
                <div className="text-2xl font-black mb-1">Unmatched Hype</div>
                <div className="text-slate-300 text-sm">Fans are already securing their spots for the most anticipated gaming week in history.</div>
              </div>
            </div>
            
            <div>
              <h2 className="text-5xl font-black mb-8 leading-tight">Millions Waiting, <br/><span className="text-blue-500">Only Thousands Get In.</span></h2>
              <div className="space-y-8">
                {[
                  { icon: <Users />, title: "Massive Community", desc: "Connect with players from over 150 countries." },
                  { icon: <Monitor />, title: "Future Tech", desc: "Be the first to play unreleased titles on next-gen hardware." },
                  { icon: <Trophy />, title: "Glory Awaits", desc: "Watch the world's top teams battle for $2M+ prize pools." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="text-blue-500 font-black tracking-widest uppercase text-sm mb-4">The Lineup</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Star Guests & Performers</h2>
            </div>
            <p className="text-slate-400 font-medium max-w-sm">Meet your favorite creators and watch legendary performances live on the GameExpo Main Stage.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTISTS.map((artist) => (
              <div key={artist.name} className="group relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/5">
                <img src={artist.img} alt={artist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-blue-600 w-12 h-1 gap-2 mb-4 group-hover:w-24 transition-all duration-500" />
                  <h3 className="text-3xl font-black mb-2">{artist.name}</h3>
                  <p className="text-blue-400 font-bold uppercase text-xs tracking-widest">{artist.role}</p>
                </div>
                {artist.name === "DJ Bliss" && (
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-32 bg-blue-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Choose Your Pass</h2>
            <p className="text-blue-100 text-xl font-medium">All tickets include access to the main arena and festival zones.</p>
          </div>

          {paymentStep === "form" ? (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {TICKETS.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => setSelected(t.id)}
                  className={`relative p-10 rounded-[2.5rem] cursor-pointer transition-all duration-500 border-2 ${selected === t.id ? "bg-white text-black border-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] scale-105" : "bg-blue-700/40 border-blue-400/30 text-white hover:bg-blue-700/60"}`}
                >
                  {t.badge && (
                    <div className="absolute -top-4 left-10 px-4 py-2 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-full">
                      {t.badge}
                    </div>
                  )}
                  
                  <div className="text-sm font-black uppercase tracking-widest mb-2 opacity-60">{t.name}</div>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-black tracking-tighter">{t.currency} {t.price}</span>
                    <span className="text-sm font-bold opacity-60">/person</span>
                  </div>

                  <div className="space-y-4 mb-10">
                    {t.perks.map(perk => (
                      <div key={perk} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${selected === t.id ? "bg-blue-600 text-white" : "bg-white/20 text-white"}`}>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-bold">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${selected === t.id ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-blue-600 hover:bg-blue-50"}`}>
                    Select {t.id === "ultimate" ? "Legend" : "Pass"}
                  </button>
                </div>
              ))}

              {/* Dynamic Booking Summary */}
              <div className="lg:col-span-3 mt-12 bg-black/20 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center justify-between">
                <div className="flex-1 space-y-6 w-full">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blue-200">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-white transition-colors font-bold placeholder:text-white/30" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blue-200">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="email@example.com" 
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-white transition-colors font-bold placeholder:text-white/30" 
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-blue-200">Quantity</label>
                      <div className="flex items-center gap-4 bg-white/10 p-2 rounded-2xl border border-white/20">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center font-black transition-colors">-</button>
                        <span className="text-xl font-black min-w-[2rem] text-center">{qty}</span>
                        <button onClick={() => setQty(Math.min(10, qty + 1))} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center font-black transition-colors">+</button>
                      </div>
                    </div>
                    <div className="pt-6">
                      <div className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Total Amount</div>
                      <div className="text-4xl font-black tracking-tighter">AED {total.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setPaymentStep("methods")}
                  className="bg-white text-blue-600 px-12 py-8 rounded-[2.5rem] text-2xl font-black hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          ) : paymentStep === "methods" ? (
              <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 animate-scale-in">
                <h3 className="text-4xl font-black mb-8 text-center">Select Payment Method</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {[
                    { id: "apple", name: "Apple Pay", icon: "🍎", color: "bg-black" },
                    { id: "card", name: "Credit/Debit Card", icon: "💳", color: "bg-blue-600" },
                    { id: "tabby", name: "Tabby", icon: "🟢", color: "bg-emerald-400" },
                  ].map(method => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-8 rounded-3xl cursor-pointer border-2 transition-all flex items-center gap-6 ${selectedPayment === method.id ? "border-white bg-white/10" : "border-white/5 bg-white/5 hover:bg-white/10"}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl ${method.color} flex items-center justify-center text-3xl shadow-lg`}>
                        {method.icon}
                      </div>
                      <div>
                        <div className="text-xl font-black">{method.name}</div>
                        <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Secure Checkout</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <button 
                    onClick={() => setPaymentStep("form")}
                    className="flex-1 py-6 rounded-2xl border border-white/10 font-black hover:bg-white/5 transition-colors"
                  >
                    Go Back
                  </button>
                  <button 
                    disabled={!selectedPayment}
                    onClick={() => {
                      setPaymentStep("processing");
                      
                      // WhatsApp Routing Logic for Apple Pay
                      if (selectedPayment === "apple") {
                        const message = `Hello! I'd like to confirm my booking for Dubai GameExpo 2026.
                        
--- BOOKING INVOICE ---
👤 Name: ${customerName || "Customer"}
📧 Email: ${customerEmail || "N/A"}
🎟️ Ticket: ${ticket.name}
🔢 Quantity: ${qty}
💰 Total: AED ${total.toLocaleString()}
💳 Method: Apple Pay
----------------------

Please provide the next steps for my e-ticket.`;
                        
                        const encodedMsg = encodeURIComponent(message);
                        const whatsappUrl = `https://wa.me/254757450716?text=${encodedMsg}`; // Simulation number
                        
                        setTimeout(() => {
                          window.open(whatsappUrl, "_blank");
                          setPaymentStep("success");
                        }, 2500);
                      } else {
                        setTimeout(() => setPaymentStep("success"), 3000);
                      }
                    }}
                    className={`flex-[2] py-6 rounded-2xl font-black text-xl transition-all shadow-2xl ${selectedPayment ? "bg-blue-600 hover:bg-blue-500" : "bg-slate-700 cursor-not-allowed opacity-50"}`}
                  >
                    {selectedPayment ? `Pay AED ${total.toLocaleString()} with ${selectedPayment.toUpperCase()}` : "Select a Payment Method"}
                  </button>
                </div>
              </div>
            ) : paymentStep === "processing" ? (
              <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-20 text-center animate-scale-in">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Processing Payment</h3>
                <p className="text-slate-400 font-medium">Connecting to secure gateway. Please do not refresh or close this window...</p>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto bg-white rounded-[3rem] p-16 text-center text-black shadow-2xl animate-scale-in">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                  <Zap className="w-12 h-12 fill-white" />
                </div>
                <h3 className="text-5xl font-black tracking-tighter mb-4">You're In!</h3>
                <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
                  Confirmation sent to your email. Get ready for the event we've all been waiting for. See you in Dubai!
                </p>
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 mb-10">
                  <div className="flex justify-between items-center mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                    <span>Payment via {selectedPayment.toUpperCase()}</span>
                    <span>Tickets</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-black">
                    <span>{ticket.name}</span>
                    <span>{qty}x</span>
                  </div>
                </div>
                <button onClick={() => {
                  setPaymentStep("form");
                  setSelectedPayment("");
                }} className="text-blue-600 font-black hover:underline">Book more tickets</button>
              </div>
            )}
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="py-32 bg-[#050a18]">
        <div className="container mx-auto px-6 text-center">
          <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-8" />
          <h2 className="text-5xl font-black mb-8">Where the Magic Happens</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Dubai World Trade Centre</h3>
              <p className="text-slate-400 mb-6">Main Exhibition Halls & Tournament Arenas. Located in the heart of the business district.</p>
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <Calendar className="w-5 h-5" /> May 22 – 24, 2026
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Expo City Dubai</h3>
              <p className="text-slate-400 mb-6">Experience the future of gaming in the high-tech pavilions of Expo 2020 Dubai site.</p>
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <Calendar className="w-5 h-5" /> May 8 – 21, 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-[#01040f] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <div className="font-black text-2xl tracking-tighter">NexusPass Dubai</div>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed font-medium">
                The official ticketing partner for the Dubai Esports & Games Festival 2026. Join the revolution of gaming entertainment.
              </p>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-500 mb-6">Explore</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Event Schedule</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tournament Brackets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Exhibitor List</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Media Kit</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-500 mb-6">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-500 text-sm font-medium">© 2026 NexusPass Dubai. All rights reserved. Built for GameExpo 2026.</div>
            <div className="flex gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-all cursor-pointer flex items-center justify-center">
                  <div className="w-5 h-5 bg-white/20 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.35; transform: scale(1.05); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        @keyframes scale-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
