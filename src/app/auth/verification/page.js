import { Suspense } from "react";
import Verification from "../../../components/pages-require-suspense/Verification";
import Loading from "@/components/loading";

export default function VerificationPage() {
  return (
    <Suspense
      fallback={
        <>
          <Loading />
        </>
      }
    >
      <Verification />
    </Suspense>
  );
}
