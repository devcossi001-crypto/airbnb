import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { Home, Calendar, Clock, MapPin, Shield, Star, CreditCard, ChevronRight } from "lucide-react";

// Mock listing data for decoration (since we don't have a Listing model)
const listingDetails: Record<string, any> = {
    "1": { title: "Cozy Bedsitter Near Kabarak", image: "/api/placeholder/400/300", location: "KABARAK" },
    "2": { title: "Spacious Single Room - Nakuru Town", image: "/api/placeholder/400/300", location: "NAKURU_TOWN" },
    "3": { title: "Modern Bedsitter RVIST Area", image: "/api/placeholder/400/300", location: "RVIST" },
    "4": { title: "Affordable Room Near Kabarak Gate", image: "/api/placeholder/400/300", location: "KABARAK" },
    "5": { title: "Luxury Bedsitter Nakuru CBD", image: "/api/placeholder/400/300", location: "NAKURU_TOWN" },
    "6": { title: "Student-Friendly RVIST Bedsitter", image: "/api/placeholder/400/300", location: "RVIST" },
    "7": { title: "Modern Bedsitter Isavo Estate", image: "/isavo_bedsitter_luxury_png_1767876981003.png", location: "ISAVO_ESTATE" },
    "8": { title: "Spacious Single Room - Isavo Estate", image: "/isavo_bedsitter_luxury_png_1767876981003.png", location: "ISAVO_ESTATE" },
};

export default async function DashboardPage() {
    const session = await getSession();

    if (!session || !session.user) {
        redirect("/login?from=/dashboard");
    }

    const bookings = await prisma.booking.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg">
                        <Home className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-2xl font-black text-gray-900 tracking-tighter">StudentStay</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-4 px-6 py-4 bg-primary-50 text-primary-600 rounded-2xl font-bold transition-all">
                        <Calendar className="w-5 h-5" />
                        Bookings
                    </Link>
                    <Link href="/search" className="flex items-center gap-4 px-6 py-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold transition-all group">
                        <MapPin className="w-5 h-5 group-hover:text-primary-500" />
                        Explore
                    </Link>
                    <Link href="/profile" className="flex items-center gap-4 px-6 py-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold transition-all group">
                        <Shield className="w-5 h-5 group-hover:text-primary-500" />
                        Profile
                    </Link>
                </nav>

                <div className="mt-auto pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                            {session.user.fullName?.charAt(0) || "U"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">{session.user.fullName}</span>
                            <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Student</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">My Bookings</h1>
                        <p className="text-gray-500 font-medium">Manage your student housing stays and payments</p>
                    </div>
                    <Link href="/search" className="btn-primary px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary-100">
                        Find New Place
                    </Link>
                </header>

                <div className="grid gap-6">
                    {bookings.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="w-10 h-10 text-gray-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h2>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't booked any student housing yet. Explore verified listings to get started.</p>
                            <Link href="/search" className="text-primary-500 font-bold hover:underline">Browse Listings &rarr;</Link>
                        </div>
                    ) : (
                        bookings.map((booking) => {
                            const details = listingDetails[booking.listingId] || { title: "Student Housing", image: "/api/placeholder/400/300", location: "Unknown" };
                            return (
                                <div key={booking.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        <div className="w-full lg:w-64 h-48 rounded-2xl overflow-hidden shadow-inner relative">
                                            <img src={details.image} alt={details.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute top-4 left-4">
                                                <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm border border-white/50 flex items-center gap-1.5">
                                                    <Shield className="w-3.5 h-3.5 text-primary-500" />
                                                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Verified</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Booking ID: #{booking.id.slice(-6).toUpperCase()}</span>
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${booking.status === "SUCCESS" || booking.status === "PAID"
                                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                                : "bg-amber-50 text-amber-600 border border-amber-100"
                                                            }`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                        <span className="text-sm font-bold text-gray-900">4.9</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{details.title}</h3>
                                                <div className="flex items-center gap-2 text-gray-500 font-medium mb-6">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{details.location.replace("_", " ")}</span>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-gray-50">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Check-in</span>
                                                        <span className="font-bold text-gray-900">Fri, Dec 20</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Guests</span>
                                                        <span className="font-bold text-gray-900">1 Student</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Amount</span>
                                                        <span className="font-bold text-primary-600">KSh {booking.amount.toLocaleString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Date</span>
                                                        <span className="font-bold text-gray-900">{new Date(booking.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mt-6">
                                                <button className="flex-1 md:flex-none px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                                                    View Details
                                                </button>
                                                <button className="flex-1 md:flex-none px-6 py-3 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                                                    Contact Host
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Sidebar context/recommendations */}
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-indigo-600 to-primary-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">Need help?</h3>
                            <p className="text-white/80 mb-6 font-medium">Our student support team is available 24/7 during the holiday season.</p>
                            <button className="px-6 py-3 bg-white text-primary-600 rounded-xl font-bold text-sm hover:scale-105 transition-all">
                                Chat With Support
                            </button>
                        </div>
                        <Shield className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10" />
                    </div>
                    <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">Invite Friends</h3>
                            <p className="text-white/80 mb-6 font-medium">Get KSh 500 off your next booking for every friend who joins.</p>
                            <button className="px-6 py-3 bg-primary-500 text-white rounded-xl font-bold text-sm hover:scale-105 transition-all">
                                Get Referral Link
                            </button>
                        </div>
                        <CreditCard className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
                    </div>
                </div>
            </main>
        </div>
    );
}
