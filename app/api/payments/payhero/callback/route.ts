import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log("Payhero Callback Received:", data);

        // In a real app, you would verify the signature and update the booking in the DB
        // {
        //   "status": "Success",
        //   "external_reference": "BK-123456",
        //   "transaction_id": "R...X",
        //   ...
        // }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Payhero Callback Error:", error);
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
}
