import { Suspense } from "react";
import ProtectedContent from "./ProtectedContent";

export default async function Page() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProtectedContent />
        </Suspense>
    );
}


