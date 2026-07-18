import { Suspense } from "react";
import ProtectedContent from "./ProtectedContent"

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditEventPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedContent slug={slug} />
      </Suspense>
    </main>
  );
}