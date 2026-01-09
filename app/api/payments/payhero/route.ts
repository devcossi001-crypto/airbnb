import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const { phone, amount, reference, listingId } = await req.json();
        const session = await getSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "You must be logged in to book" },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        // Create booking in DB
        const booking = await prisma.booking.create({
            data: {
                userId: userId,
                listingId: listingId || "1", // Fallback for backward compatibility
                amount: parseFloat(amount),
                status: "PENDING",
            }
        });

        // 🔥 MOCK MODE FOR DEVELOPMENT
        if (process.env.PAYHERO_MOCK === "true") {
            console.log("Mock Payment:", { phone, amount, reference, listingId });
            return NextResponse.json({
                success: true,
                transaction_id: `MOCK_${Date.now()}`,
                reference: reference || `BK-${Date.now()}`,
                message: "Payment initiated (MOCK MODE)",
                amount,
                phone_number: phone,
                bookingId: booking.id
            });
        }

        const username = process.env.PAYHERO_USERNAME;
        const apiKey = process.env.PAYHERO_API_KEY;
        const channelId = process.env.PAYHERO_CHANNEL_ID;

        if (!username || !apiKey || !channelId) {
            console.error("Missing Payhero credentials");
            return NextResponse.json(
                { error: "Payment configuration error" },
                { status: 500 }
            );
        }

        const url = "https://backend.payhero.co.ke/api/v2/payments";

        const data = {
            amount: amount,
            phone_number: phone.startsWith("254") ? phone : `254${phone.replace(/^0/, "")}`,
            channel_id: channelId,
            provider: "m-pesa",
            external_reference: reference || `BK-${Date.now()}`,
            callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payments/payhero/callback`,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`${username}:${apiKey}`).toString("base64")}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Payhero API Error Details:", {
                status: response.status,
                statusText: response.statusText,
                body: result
            });

            // Better error message for insufficient balance
            if (result.error_message?.includes("insufficient balance")) {
                return NextResponse.json(
                    {
                        error: "Merchant account needs top-up. Please contact support or enable mock mode for testing.",
                        details: result.error_message
                    },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { error: result.message || result.error_message || "Failed to initiate payment" },
                { status: response.status }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Payhero Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}