import Link from "next/link";
import { Search, Home, Shield, Sparkles, CheckCircle, Star, MapPin, Clock, Users, User as UserIcon } from "lucide-react";
import { getSession } from "./lib/auth";

export default async function HomePage() {
  const session = await getSession();
  const userName = session?.user?.fullName?.split(" ")[0];

  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass m-4 rounded-3xl shadow-xl border border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary-500 leading-none tracking-tighter">StudentStay</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Student Housing</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/search" className="text-gray-600 hover:text-primary-600 font-bold transition flex items-center gap-2">
                Find a Place
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary-600 font-bold transition">
                How It Works
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Hi, {userName}</span>
                </div>
              ) : (
                <>
                  <Link href="/login" className="btn-ghost px-5 py-2.5 text-sm font-bold">
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary px-6 py-2.5 text-sm font-bold rounded-2xl">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Modern Image Background with Overlay */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/isavo_estate_hero_png_1767876964658.png"
            alt="Isavo Estate Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/90"></div>
          {/* Animated Blobs */}
          <div className="absolute top-40 left-20 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float"></div>
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center animate-fade-in">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50 mb-10 slide-up">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-bold text-gray-800 tracking-wide uppercase">Verified & Trusted Student Housing Platform</span>
            </div>

            <h1 className="heading-1 mb-6 text-gray-900">
              Find Your Perfect <br />
              <span className="text-primary-500">Student Home</span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Safe, verified student housing in Kabarak, Nakuru, and
              <span className="font-bold text-primary-500"> Isavo Estate</span>.
              Personally inspected for your peace of mind.
            </p>

            {/* Smart Search Box - Revamped */}
            <div className="max-w-4xl mx-auto mb-16 px-4">
              <div className="bg-white shadow-[0_16px_32px_rgba(0,0,0,0.1)] rounded-full p-2 flex flex-col md:flex-row items-center gap-2 border border-gray-100">
                <div className="flex-1 w-full relative group px-6">
                  <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Where</label>
                  <input
                    type="text"
                    placeholder="Search locations..."
                    className="w-full p-0 text-sm bg-transparent border-none focus:ring-0 placeholder:text-gray-400 font-medium"
                  />
                </div>
                <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
                <div className="flex-1 w-full relative group px-6 text-left">
                  <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Check In</label>
                  <div className="text-sm text-gray-400 font-medium">Add dates</div>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white w-full md:w-auto p-4 rounded-full transition-all flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-8 justify-center">
                {[
                  { name: "Kabarak", icon: <MapPin className="w-4 h-4" /> },
                  { name: "Nakuru Town", icon: <MapPin className="w-4 h-4" /> },
                  { name: "RVIST", icon: <MapPin className="w-4 h-4" /> },
                  { name: "Isavo Estate", icon: <Sparkles className="w-4 h-4 text-accent-500" />, premium: true }
                ].map((loc) => (
                  <button key={loc.name} className={`px-6 py-3 rounded-2xl flex items-center gap-2 font-bold transition-all ${loc.premium
                    ? "bg-accent-50 text-accent-700 hover:bg-accent-100 border-2 border-accent-100 shadow-sm shadow-accent-100"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-100 shadow-sm"
                    }`}>
                    {loc.icon}
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats - Revamped */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-gray-100/30">
              <div className="text-center group">
                <div className="text-4xl font-extrabold gradient-text mb-2 group-hover:scale-110 transition-transform">500+</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Verified Listings</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-extrabold gradient-text-accent mb-2 group-hover:scale-110 transition-transform">1,200+</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Happy Students</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-extrabold gradient-text mb-2 group-hover:scale-110 transition-transform">98%</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Trust Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4 text-gray-900">Why StudentStay?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Built for students, with verified listings and secure payments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card hover-lift group border-2 border-transparent hover:border-primary-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Listings</h3>
              <p className="text-gray-600 leading-relaxed">
                Every listing is reviewed and verified before being published to ensure quality and authenticity
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover-lift group border-2 border-transparent hover:border-accent-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Pay with M-PESA. Your transactions are secure and protected.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover-lift group border-2 border-transparent hover:border-primary-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Admin Inspected</h3>
              <p className="text-gray-600 leading-relaxed">
                Every listing personally reviewed and approved before going live
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover-lift group border-2 border-transparent hover:border-accent-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-600 to-primary-600 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Holiday-Focused</h3>
              <p className="text-gray-600 leading-relaxed">
                Perfect for long breaks. Auto-available during academic holidays
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Location Section */}
      <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Featured Location
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Modern Student Living <br />
                at <span className="text-primary-400">Isavo Estate</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl font-medium">
                Experience premium student housing with verified hosts and secure payments.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { title: "24/7 Security", desc: "Gate guarded community" },
                  { title: "High Speed WiFi", desc: "Unlimited fiber" },
                  { title: "Study Spaces", desc: "Built-in desks" },
                  { title: "Transport", desc: "Regular shuttles" }
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/search?location=ISAVO_ESTATE" className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2">
                Explore Listings
              </Link>
            </div>

            <div className="flex-1 w-full max-w-2xl">
              <div className="relative">
                <img
                  src="/isavo_bedsitter_luxury_png_1767876981003.png"
                  alt="Isavo Estate Interior"
                  className="rounded-3xl shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl z-20 shadow-xl hidden md:block border border-gray-100">
                  <div className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Starting from</div>
                  <div className="text-gray-900 font-black text-3xl">KSh 7,500</div>
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-1">Per Week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, secure, and student-friendly</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* For Students */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary-600" />
                How It Works
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Search Easily</h4>
                    <p className="text-gray-600 text-sm">Find houses by location, price, and room type</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Book & Pay Securely</h4>
                    <p className="text-gray-600 text-sm">M-PESA payment for your peace of mind</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Get Details</h4>
                    <p className="text-gray-600 text-sm">Receive host contact and directions after payment</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Check-in</h4>
                    <p className="text-gray-600 text-sm">Simple check-in process. Enjoy your stay!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="heading-2 mb-6">Your Safety is Our Priority</h2>
            <p className="text-xl mb-12 opacity-90">
              Multiple layers of verification and secure payments protect student travelers
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass p-6 rounded-xl">
                <Star className="w-10 h-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Trust Scores</h3>
                <p className="text-sm opacity-90">Trust ratings based on reviews, verification status, and booking history</p>
              </div>

              <div className="glass p-6 rounded-xl">
                <CheckCircle className="w-10 h-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Student Verification</h3>
                <p className="text-sm opacity-90">ID upload and school email verification required</p>
              </div>

              <div className="glass p-6 rounded-xl">
                <Shield className="w-10 h-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                <p className="text-sm opacity-90">Dispute resolution and admin available anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real students</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="card hover-lift">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary-500 text-primary-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Found a perfect bedsitter near Kabarak in minutes! The search is super easy to use. Safe and affordable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <div className="font-bold">Jane M.</div>
                  <div className="text-sm text-gray-600">Kabarak University</div>
                </div>
              </div>
            </div>

            <div className="card hover-lift">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary-500 text-primary-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Listed my room during holidays and got bookings within 2 days. The payment process made me feel secure. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div>
                  <div className="font-bold">David K.</div>
                  <div className="text-sm text-gray-600">RVIST Student</div>
                </div>
              </div>
            </div>

            <div className="card hover-lift">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary-500 text-primary-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The verified badge gave me confidence. Photos were accurate, and the whole process was smooth. Best platform for student housing!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="font-bold">Sarah W.</div>
                  <div className="text-sm text-gray-600">Nakuru Intern</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center glass-card p-12 rounded-3xl">
            <h2 className="heading-2 mb-6">Ready to Find Your Home?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of students finding safe, affordable housing during holidays
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search" className="btn-primary px-12 py-4 text-lg inline-block">
                Start Searching
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Revamped */}
      <footer className="bg-[#0f172a] text-white py-24 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center shadow-lg">
                  <Home className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-black">StudentStay</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-xs">
                Premium student housing experiences in Kabarak, Nakuru, RVIST, and Isavo Estate.
                Built for safety, comfort, and success.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders could go here */}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-500 rounded-full"></div>
                For Students
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/search" className="hover:text-white hover:pl-2 transition-all">Search Listings</Link></li>
                <li><Link href="/search?location=ISAVO_ESTATE" className="text-accent-400 font-bold hover:text-accent-300 hover:pl-2 transition-all">Isavo Estate Premium</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white hover:pl-2 transition-all">How It Works</Link></li>
                <li><Link href="/safety" className="hover:text-white hover:pl-2 transition-all">Safety Tips</Link></li>
              </ul>
            </div>



            <div>
              <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-500 rounded-full"></div>
                Company
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/about" className="hover:text-white hover:pl-2 transition-all">About Us</Link></li>
                <li><Link href="/legal/terms" className="hover:text-white hover:pl-2 transition-all">Terms of Service</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-white hover:pl-2 transition-all">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-white hover:pl-2 transition-all">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm font-medium">
              &copy; 2024 StudentStay Kenya. Designed by cossi001 🇰🇪
            </p>
            <div className="flex gap-8 text-sm text-gray-500 font-medium">
              <span>Built with Love</span>
              <span>Built for Success</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
