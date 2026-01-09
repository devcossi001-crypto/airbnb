import Link from "next/link";
import { Search, SlidersHorizontal, MapPin, Star, Shield, Home as HomeIcon, Heart } from "lucide-react";

// Mock listing data
const listings = [
    {
        id: 1,
        title: "Cozy Bedsitter Near Kabarak",
        location: "KABARAK",
        price: 6000,
        priceType: "week",
        image: "/api/placeholder/400/300",
        rating: 4.9,
        reviews: 23,
        verified: true,
        trustBadge: "GOLD",
        amenities: ["WiFi", "Water", "Security"],
        host: "Jane M.",
    },
    {
        id: 2,
        title: "Spacious Single Room - Nakuru Town",
        location: "NAKURU_TOWN",
        price: 8500,
        priceType: "week",
        image: "/api/placeholder/400/300",
        rating: 4.8,
        reviews: 18,
        verified: true,
        trustBadge: "VERIFIED",
        amenities: ["WiFi", "Parking", "Kitchen"],
        host: "David K.",
    },
    {
        id: 3,
        title: "Modern Bedsitter RVIST Area",
        location: "RVIST",
        price: 5500,
        priceType: "week",
        image: "/api/placeholder/400/300",
        rating: 4.7,
        reviews: 15,
        verified: true,
        trustBadge: "SILVER",
        amenities: ["Water", "Security", "Balcony"],
        host: "Sarah W.",
    },
    {
        id: 4,
        title: "Affordable Room Near Kabarak Gate",
        location: "KABARAK",
        price: 4500,
        priceType: "week",
        image: "/api/placeholder/400/300",
        rating: 4.5,
        reviews: 12,
        verified: true,
        trustBadge: "BRONZE",
        amenities: ["Water", "Security"],
        host: "John P.",
    },
    {
        id: 5,
        title: "Luxury Bedsitter Nakuru CBD",
        location: "NAKURU_TOWN",
        price: 12000,
        priceType: "week",
        image: "/api/placeholder/400/300",
        rating: 5.0,
        reviews: 31,
        verified: true,
        trustBadge: "VERIFIED",
        amenities: ["WiFi", "Parking", "Kitchen", "Security", "Gym"],
        host: "Mary N.",
    },
    {
        id: 6,
        title: "Student-Friendly RVIST Bedsitter",
        location: "RVIST",
        price: 5800,
        priceType: "week",
        image: "/api/placeholder/400/300",
        rating: 4.6,
        reviews: 9,
        verified: true,
        trustBadge: "SILVER",
        amenities: ["WiFi", "Water", "Security"],
        host: "Peter M.",
    },
    {
        id: 7,
        title: "Modern Bedsitter Isavo Estate",
        location: "ISAVO_ESTATE",
        price: 7500,
        priceType: "week",
        image: "/isavo_bedsitter_luxury_png_1767876981003.png",
        rating: 4.9,
        reviews: 27,
        verified: true,
        trustBadge: "GOLD",
        amenities: ["WiFi", "Water", "Security", "Parking"],
        host: "Grace A.",
    },
    {
        id: 8,
        title: "Spacious Single Room - Isavo Estate",
        location: "ISAVO_ESTATE",
        price: 9000,
        priceType: "week",
        image: "/isavo_bedsitter_luxury_png_1767876981003.png",
        rating: 4.8,
        reviews: 21,
        verified: true,
        trustBadge: "VERIFIED",
        amenities: ["WiFi", "Kitchen", "Security", "Balcony"],
        host: "Michael T.",
    },
];

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg">
                                <HomeIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">StudentStay</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-3">
                            <Link href="/login" className="btn-ghost px-4 py-2 text-sm">Login</Link>
                            <Link href="/register" className="btn-primary px-4 py-2 text-sm">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search by location or keyword..."
                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-primary-500 text-lg"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            <button className="btn-ghost px-6 flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5" />
                                Filters
                            </button>
                            <button className="btn-primary px-8 font-bold">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Location Filter */}
                            <div className="card">
                                <h3 className="font-bold text-lg mb-4">Location</h3>
                                <div className="space-y-3">
                                    {["Kabarak", "Nakuru Town", "RVIST", "Isavo Estate"].map((loc) => (
                                        <label key={loc} className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                            <span className="text-gray-700">{loc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="card">
                                <h3 className="font-bold text-lg mb-4">Price Range (per week)</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-sm text-gray-600 mb-1 block">Min</label>
                                            <input type="number" placeholder="4,000" className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 mb-1 block">Max</label>
                                            <input type="number" placeholder="15,000" className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Property Type */}
                            <div className="card">
                                <h3 className="font-bold text-lg mb-4">Property Type</h3>
                                <div className="space-y-3">
                                    {["Bedsitter", "Single Room"].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                            <span className="text-gray-700">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="card">
                                <h3 className="font-bold text-lg mb-4">Amenities</h3>
                                <div className="space-y-3">
                                    {["WiFi", "Water", "Security", "Parking", "Kitchen"].map((amenity) => (
                                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                            <span className="text-gray-700">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Verified Only */}
                            <div className="card bg-accent-50 border-accent-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500" defaultChecked />
                                    <div>
                                        <div className="font-bold text-gray-900 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-accent-600" />
                                            Verified Only
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Show only admin-approved listings</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </aside>

                    {/* Listings Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Available Rentals</h1>
                                <p className="text-gray-600 mt-1">{listings.length} verified listings found</p>
                            </div>

                            <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 font-medium">
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Rating: High to Low</option>
                                <option>Newest First</option>
                            </select>
                        </div>

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {listings.map((listing) => (
                                <Link key={listing.id} href={`/book/${listing.id}`} className="card p-0 hover-lift overflow-hidden group border-none shadow-sm hover:shadow-2xl">
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                                        <img
                                            src={listing.image}
                                            alt={listing.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        {listing.verified && (
                                            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow-sm border border-gray-100">
                                                <Shield className="w-3.5 h-3.5 text-primary-500" />
                                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">
                                                    {listing.trustBadge === "VERIFIED" ? "Verified" : listing.trustBadge}
                                                </span>
                                            </div>
                                        )}
                                        <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-md">
                                            <Heart className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{listing.title}</h3>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                            <MapPin className="w-4 h-4" />
                                            <span>{listing.location.replace("_", " ")}</span>
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-primary-500 text-primary-500" />
                                                <span className="font-semibold text-gray-900">{listing.rating}</span>
                                                <span className="text-sm text-gray-500">({listing.reviews})</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {listing.amenities.slice(0, 3).map((amenity) => (
                                                <span key={amenity} className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                                            <div className="text-sm text-gray-600">
                                                Hosted by {listing.host}
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-primary-600">KSh {listing.price.toLocaleString()}</div>
                                                <div className="text-xs text-gray-500 text-right">per {listing.priceType}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <button className="px-4 py-2 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition">
                                Previous
                            </button>
                            {[1, 2, 3, 4].map((page) => (
                                <button
                                    key={page}
                                    className={`w-10 h-10 rounded-lg font-semibold transition ${page === 1
                                        ? "bg-primary-600 text-white"
                                        : "border-2 border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="px-4 py-2 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
