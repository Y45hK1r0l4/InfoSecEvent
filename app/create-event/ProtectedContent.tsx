import { Suspense } from "react";
import EventForm from "@/component/EventForm";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventForm mode="create" />
        </Suspense>
    );
}


