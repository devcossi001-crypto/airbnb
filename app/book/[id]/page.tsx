"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Shield, Lock, Smartphone, CheckCircle, Loader2 } from "lucide-react";

export default function BookingPage() {
    const params = useParams();
    const id = params.id;
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/payments/payhero", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: phone,
                    amount: 6350,
                    reference: `BK-${Date.now()}`,
                    listingId: id
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Payment failed to initiate");
            }

            // If Payhero returns success, we show our success state
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 flex items-center justify-center p-4 relative overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="bg-white max-w-md w-full p-8 text-center animate-fade-in relative z-10 rounded-[2.5rem] shadow-2xl">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Booking Confirmed!</h1>
                    <p className="text-gray-600 font-medium mb-8">
                        Your payment for <span className="font-bold text-primary-500">Cozy Student Bedsitter</span> has been secured.
                    </p>
                    <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-left border border-gray-100">
                        <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-500 font-bold uppercase tracking-wider">Booking ID</span>
                            <span className="font-mono font-bold text-gray-900">#STY-9823</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-500 font-bold uppercase tracking-wider">Check-in</span>
                            <span className="font-bold text-gray-900">Fri, Dec 20</span>
                        </div>
                        <div className="flex justify-between text-base pt-3 border-t border-gray-200">
                            <span className="text-primary-500 font-bold">Amount Paid</span>
                            <span className="font-bold text-primary-500">KSh 6,350</span>
                        </div>
                    </div>
                    <Link href="/dashboard" className="w-full py-4 bg-primary-500 text-white block rounded-2xl font-bold shadow-lg shadow-primary-100 hover:bg-primary-600 hover:-translate-y-0.5 transition-all">
                        Go to My Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Vibrant Header Background */}
            <div className="h-64 bg-gradient-to-br from-primary-600 to-accent-600 absolute top-0 left-0 right-0 z-0">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            <header className="relative z-10 pt-8 px-4 mb-8">
                <div className="container mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 font-bold w-fit bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full transition-all group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to home
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-black text-white mt-8 mb-2 tracking-tight">Confirm Your Booking</h1>
                    <p className="text-white/80 text-lg font-medium">You're one step away from your student home</p>
                </div>
            </header>

            <main className="container mx-auto px-4 pb-20 relative z-10 flex-1">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Payment Details */}
                    <div>
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl p-8 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-primary-500"></div>

                            <div className="flex items-center justify-between mb-10">
                                <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center text-lg">1</span>
                                    Payment
                                </h1>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" alt="M-PESA" className="h-6 object-contain" />
                                </div>
                            </div>

                            <form onSubmit={handlePayment}>
                                {error && (
                                    <div className="mb-8 p-4 bg-red-50 border-2 border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3 animate-shake">
                                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">!</div>
                                        {error}
                                    </div>
                                )}
                                <div className="mb-10">
                                    <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-widest">
                                        M-PESA Phone Number
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Smartphone className="h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="07XX XXX XXX"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="block w-full pl-14 pr-4 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all text-xl font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                                        Paying as <span className="font-bold text-gray-900">Ian S.</span>
                                    </div>
                                </div>

                                <div className="bg-primary-50/50 border border-primary-100 rounded-2xl p-6 mb-10 flex gap-4">
                                    <div className="bg-white p-3 rounded-2xl shadow-sm h-fit">
                                        <Shield className="w-6 h-6 text-primary-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base mb-1">Secure Payments</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                            Your safety is our priority. Every booking is protected by our verified payment guarantee.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !phone}
                                    className="w-full py-5 bg-primary-500 text-white text-xl font-black rounded-2xl shadow-xl shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:bg-primary-600 hover:-translate-y-1 active:scale-[0.98] transition-all"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-7 h-7 animate-spin" />
                                            Authorizing...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-6 h-6" />
                                            Confirm KSh 6,350
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:pl-4">
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden sticky top-8">
                            <div className="relative h-48">
                                <img src="/isavo_bedsitter_luxury_png_1767876981003.png" alt="Listing" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-[0.2em] border border-white/30 mb-2">
                                        Verified Property
                                    </div>
                                    <h2 className="text-2xl font-black text-white tracking-tight">Cozy Student Bedsitter</h2>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Location</span>
                                        <span className="text-gray-900 font-bold text-lg">Kabarak University Area</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                                        <span className="text-amber-600 font-black">4.9</span>
                                        <span className="text-amber-500 text-lg">★</span>
                                    </div>
                                </div>

                                <div className="space-y-5 mb-8">
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>7 Nights Stay</span>
                                        <span className="font-bold text-gray-900">KSh 6,000</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Cleaning & Service Fee</span>
                                        <span className="font-bold text-gray-900">KSh 350</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 my-8"></div>

                                <div className="flex justify-between items-center mb-8">
                                    <span className="font-black text-2xl text-gray-900 tracking-tight">Total due</span>
                                    <span className="font-black text-3xl text-primary-500">KSh 6,350</span>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-5 flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                        You won't be charged until you confirm payment on your phone. Free cancellation up to 24h before stay.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
