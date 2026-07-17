import { redirect } from "next/navigation";

import ProfileForm from "@/component/ProfileForm";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function ProfilePage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="wrapper py-10">
            <h1 className="mb-8 text-3xl font-bold">
                Account Settings
            </h1>

            <ProfileForm user={user} />
        </main>
    );
}

