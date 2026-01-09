"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Mail, Lock, User, Phone, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-primary-500 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl text-center animate-fade-in">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Account Created!</h1>
                    <p className="text-gray-600 font-medium mb-10 leading-relaxed">
                        Welcome to StudentStay! Your account is ready. You can now log in and book your stay.
                    </p>
                    <Link href="/login" className="w-full py-4 bg-primary-500 text-white text-lg font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary-100 hover:bg-primary-600 transition-all">
                        Continue to Login
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-primary-500 z-0"></div>

            <div className="w-full max-w-xl relative z-10">
                <Link href="/" className="flex items-center justify-center gap-3 mb-10 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                        <Home className="w-7 h-7 text-primary-500" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tighter">StudentStay</span>
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Join Us</h1>
                        <p className="text-gray-500 font-medium">Find your perfect student home in seconds</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold animate-shake">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-900 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    name="fullName"
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-bold text-gray-900 disabled:opacity-50"
                                    placeholder="Ian Soft"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-900 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-bold text-gray-900 disabled:opacity-50"
                                    placeholder="ian@university.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-900 uppercase tracking-widest ml-1">Phone Number</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-bold text-gray-900 disabled:opacity-50"
                                    placeholder="0712 345 678"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-900 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-bold text-gray-900 disabled:opacity-50"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-primary-500 text-white text-xl font-black rounded-2xl shadow-2xl shadow-primary-500/20 hover:bg-primary-600 hover:-translate-y-1 active:scale-95 transition-all mt-4 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-7 h-7 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 font-medium">
                            Already part of StudentStay?{" "}
                            <Link href="/login" className="text-primary-500 font-black hover:underline underline-offset-4 decoration-2">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
