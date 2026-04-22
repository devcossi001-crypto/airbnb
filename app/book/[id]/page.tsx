"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Shield, Lock, Smartphone, CheckCircle, Loader2 } from "lucide-react";

export default function BookingPage() {
    const params = useParams();
    const id = params.id;
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const whatsappNumber = "254757450716";
    const message = encodeURIComponent(`Hi, I'm interested in booking a space (ID: ${id}). Please provide more details.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    const handleWhatsAppRedirect = () => {
        setLoading(true);
        // Simulate a small delay for better UX
        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
            setLoading(false);
            setSuccess(true);
        }, 800);
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
                    <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Redirected!</h1>
                    <p className="text-gray-600 font-medium mb-8">
                        We've opened WhatsApp for you to chat with the host of <span className="font-bold text-primary-500">Cozy Student Bedsitter</span>.
                    </p>
                    <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-left border border-gray-100">
                        <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-500 font-bold uppercase tracking-wider">Status</span>
                            <span className="font-bold text-emerald-600">WhatsApp Opened</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center italic">
                            If the tab didn't open, please click the button below.
                        </p>
                    </div>
                    <a href={whatsappUrl} target="_blank" className="w-full py-4 bg-emerald-500 text-white block rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-600 mb-4 transition-all">
                        Open WhatsApp Again
                    </a>
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
                    <p className="text-white/80 text-lg font-medium">Chat with the host to finalize your stay</p>
                </div>
            </header>

            <main className="container mx-auto px-4 pb-20 relative z-10 flex-1">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Communication Details */}
                    <div>
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl p-8 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-primary-500"></div>

                            <div className="flex items-center justify-between mb-10">
                                <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center text-lg">1</span>
                                    Communication
                                </h1>
                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <Smartphone className="w-5 h-5 text-emerald-600" />
                                    <span className="text-emerald-700 font-bold text-sm">WhatsApp</span>
                                </div>
                            </div>

                            <div className="mb-10 text-center">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Smartphone className="w-10 h-10 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Chat with Host</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    Click the button below to start a conversation with the host on WhatsApp. You can discuss the booking details and finalize everything directly.
                                </p>
                            </div>

                            <div className="bg-primary-50/50 border border-primary-100 rounded-2xl p-6 mb-10 flex gap-4">
                                <div className="bg-white p-3 rounded-2xl shadow-sm h-fit">
                                    <Shield className="w-6 h-6 text-primary-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base mb-1">Direct Communication</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                        Skip the middleman and talk directly to your future host. It's the fastest way to get your questions answered.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleWhatsAppRedirect}
                                disabled={loading}
                                className="w-full py-5 bg-emerald-500 text-white text-xl font-black rounded-2xl shadow-xl shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:bg-emerald-600 hover:-translate-y-1 active:scale-[0.98] transition-all"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-7 h-7 animate-spin" />
                                        Opening WhatsApp...
                                    </>
                                ) : (
                                    <>
                                        <Smartphone className="w-6 h-6" />
                                        Chat on WhatsApp to Book
                                    </>
                                )}
                            </button>
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
