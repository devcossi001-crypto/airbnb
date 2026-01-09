import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { login } from "../../../lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Missing email or password" },
                { status: 400 }
            );
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Log user in
        const sessionUser = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
        };

        await login(sessionUser);

        return NextResponse.json({
            message: "Logged in successfully",
            user: sessionUser
        });

    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Something went wrong during login" },
            { status: 500 }
        );
    }
}
