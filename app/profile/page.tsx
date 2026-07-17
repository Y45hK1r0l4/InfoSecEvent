import { Suspense } from "react";
import ProtectedContent from "./ProtectedContent"

const Profile = async () => {

    return (
        <main className="wrapper py-10">
            <h1 className="ml-76">Profile</h1>

            <Suspense fallback={<div>Loading...</div>}>
                <ProtectedContent />
            </Suspense>
        </main>
    );
};

export default Profile;