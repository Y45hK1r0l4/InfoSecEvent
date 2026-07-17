import { Suspense } from "react";
import CreateEventForm from "@/component/CreateEvent";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateEventForm />
        </Suspense>
    );
}


