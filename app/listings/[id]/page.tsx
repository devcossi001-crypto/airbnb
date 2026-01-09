import Link from "next/link";
import {
    MapPin, Star, Shield, Home, User, Check,
    Wifi, Car, Utensils, Tv, ShieldCheck,
    ChevronLeft, Heart
} from "lucide-react";
import ImageGallery from "@/components/listings/ImageGallery";

// Mock Data for a single listing
const listing = {
    id: "1",
    title: "Cozy Student Bedsitter Near Kabarak Main Gate",
    location: "Kabarak University Area",
    description: "Perfect for students looking for a quiet place during the holidays. Five minutes walk from the main gate. Fully secured compound with 24/7 water supply. The unit is spacious enough for two people if needed.",
    price: 6000,
    priceType: "week",
    images: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/601",
        "/api/placeholder/800/602",
        "/api/placeholder/800/603",
        "/api/placeholder/800/604",
    ],
    host: {
        name: "Jane M.",
        role: "Student Host",
        verified: true,
        joined: "Sep 2023",
        responseRate: "100%",
    },
    rating: 4.9,
    reviews: 24,
    trustBadge: "GOLD",
    amenities: [
        { name: "High-Speed WiFi", icon: Wifi },
        { name: "Secure Parking", icon: Car },
        { name: "Kitchenette", icon: Utensils },
        { name: "Security Guard", icon: ShieldCheck },
    ],
    rules: [
        "No loud parties",
        "Student ID required",
        "No smoking inside",
    ]
};

export default function ListingPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Vibrant Gradient Header */}
            <div className="h-64 bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 absolute top-0 left-0 right-0 z-0">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>

            {/* Navigation */}
            <header className="relative z-10 pt-6 px-4 mb-6">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/search" className="inline-flex items-center gap-2 text-white hover:text-white/80 font-bold w-fit bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition">
                        <ChevronLeft className="w-5 h-5" />
                        Back to Search
                    </Link>

                    <div className="flex gap-3">
                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition">
                            <ShieldCheck className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 relative z-10">
                {/* Title & Header Card */}
                <div className="glass-card p-6 md:p-8 rounded-3xl mb-8 animate-fade-in shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {listing.trustBadge} Verified
                                </span>
                                <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                                    <MapPin className="w-3 h-3" />
                                    {listing.location}
                                </div>
                            </div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {listing.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 text-yellow-700">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    <span className="font-bold">{listing.rating}</span>
                                    <span className="text-yellow-600/80">({listing.reviews} reviews)</span>
                                </div>

                                <div className="flex items-center gap-1 text-gray-600">
                                    <Shield className="w-4 h-4 text-accent-600" />
                                    <span className="text-gray-900">Payment Protected</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <div className="text-3xl font-bold text-primary-600">KSh {listing.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500 font-medium">per {listing.priceType}</div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <ImageGallery images={listing.images} title={listing.title} />
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Host Info */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 text-2xl font-bold">
                                    {listing.host.name[0]}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Hosted by {listing.host.name}</h2>
                                    <p className="text-gray-600">{listing.host.role} · Joined {listing.host.joined}</p>
                                </div>
                            </div>
                            {listing.host.verified && (
                                <div className="hidden md:flex flex-col items-end">
                                    <div className="flex items-center gap-1 text-accent-600 font-semibold">
                                        <Shield className="w-5 h-5" />
                                        Identity Verified
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Response rate: {listing.host.responseRate}</p>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">About this place</h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {listing.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6">What this place offers</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {listing.amenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                                        <amenity.icon className="w-6 h-6 text-gray-600" />
                                        <span className="text-gray-700 font-medium">{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Booking Widget (Mobile Only - Bottom Fixed) */}
                        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-50 flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold text-gray-900">
                                    KSh {listing.price.toLocaleString()} <span className="text-sm font-normal text-gray-600">/ {listing.priceType}</span>
                                </div>
                                <div className="text-xs text-gray-500 underline">Dec 20 - Dec 27</div>
                            </div>
                            <button className="btn-primary px-8 py-3 rounded-xl shadow-lg">
                                Rent Now
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Booking Widget (Desktop) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-28 bg-white rounded-2xl border border-gray-200 shadow-xl p-6">
                            <div className="flex items-end justify-between mb-6">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900">KSh {listing.price.toLocaleString()}</span>
                                    <span className="text-gray-600"> / {listing.priceType}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm font-semibold">
                                    <Star className="w-4 h-4 fill-primary-600 text-primary-600" />
                                    {listing.rating}
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="border border-gray-300 rounded-xl overflow-hidden">
                                    <div className="grid grid-cols-2 border-b border-gray-300">
                                        <div className="p-3 border-r border-gray-300">
                                            <label className="block text-xs font-bold text-gray-700 uppercase">Check-in</label>
                                            <input type="date" className="w-full text-sm outline-none text-gray-600 bg-transparent mt-1" />
                                        </div>
                                        <div className="p-3">
                                            <label className="block text-xs font-bold text-gray-700 uppercase">Check-out</label>
                                            <input type="date" className="w-full text-sm outline-none text-gray-600 bg-transparent mt-1" />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <label className="block text-xs font-bold text-gray-700 uppercase">Guests</label>
                                        <select className="w-full text-sm outline-none text-gray-600 bg-transparent mt-1">
                                            <option>1 Student</option>
                                            <option>2 Students</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-accent-50 rounded-xl p-4 flex gap-3 items-start border border-accent-100">
                                    <Shield className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-accent-800">Secure Payments</p>
                                        <p className="text-xs text-accent-700 mt-0.5">Your money is protected by StudentStay.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full btn-primary py-3.5 text-lg font-bold shadow-colored mb-4">
                                Rent This Space
                            </button>

                            <div className="text-center text-sm text-gray-500 mb-6">
                                You won't be charged yet
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span className="underline">KSh {listing.price} x 1 week</span>
                                    <span>KSh {listing.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span className="underline">Service fee</span>
                                    <span>KSh 350</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-100 text-lg">
                                    <span>Total</span>
                                    <span>KSh {(listing.price + 350).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="font-medium">Verified listing</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
