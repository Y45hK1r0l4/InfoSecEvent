import { Suspense } from "react";
import ProtectedContent from "./ProtectedContent";

const Profile = async () => {
  return (
    <main className="wrapper flex flex-col items-center justify-center py-10">
      <h1 className="text-6xl font-bold text-center">Profile</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedContent />
      </Suspense>
    </main>
  );
};

export default Profile;