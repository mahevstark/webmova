import { Suspense } from "react";
import Sigin from "../../../components/pages-require-suspense/Signin";
import Loading from "../../../components/loading";

export default function VerificationPage() {
  return (
    <Suspense
      fallback={
        <>
          <Loading />
        </>
      }
    >
      <Sigin />
    </Suspense>
  );
}
