import { Suspense } from "react";
import Verification from "../../../components/Verification";

export default function VerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Loading verification page...
            </p>
          </div>
        </div>
      }
    >
      <Verification />
    </Suspense>
  );
}
