import { redirect } from "next/navigation";

import ProfileForm from "@/component/ProfileForm";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center wrapper py-16">
      <h1 className="mb-8 text-3xl font-bold text-center">
        Account Settings
      </h1>

      <ProfileForm user={user} />
    </main>
  );
}