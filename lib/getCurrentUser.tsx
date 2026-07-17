import { cookies } from "next/headers";
import { User } from "@/database";
import { verifyToken } from "./jwt";

type TokenPayload = {
    userId: string;
};

export async function getCurrentUser() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
        return null;
    }

    try {
        const payload = verifyToken(token) as TokenPayload;

        const user = await User.findById(payload.userId)
            .select("name email")
            .lean();

        if (!user) {
            return null;
        }

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };
    } catch {
        return null;
    }
}