import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { login } from "../../../lib/auth";

export async function POST(req: Request) {
    try {
        const { fullName, email, phone, password } = await req.json();

        if (!fullName || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                phone,
                password: hashedPassword,
            },
        });

        // Log user in
        const sessionUser = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
        };

        await login(sessionUser);

        return NextResponse.json({
            message: "User registered successfully",
            user: sessionUser
        });

    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Something went wrong during registration" },
            { status: 500 }
        );
    }
}
