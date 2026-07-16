'use server'

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({ eventId, slug, email }: {eventId: string; slug: string; email: string}) => {
    try {
        await connectDB();

        await Booking.create({
            eventId,
            slug,
            email,
        });

        return {
            success: true,
        };

        return { success: true};
    }catch(e) {
        console.error('Create Booking Failed', e);
        return {success: false, error: e}
    }
}

export const getBookingCount = async (eventId: string) => {
    try {
        await connectDB();

        const count = await Booking.countDocuments({
            eventId,
        });

        return count;

    } catch(e){
        console.error("Get Booking Count Failed", e);
        return 0;
    }
};