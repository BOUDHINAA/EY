"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      fetch(`/api/verify?token=${token}`)
        .then((res) => {
          if (res.ok) router.replace("/verify/success");
          else router.replace("/verify/failure");
        })
        .catch(() => router.replace("/verify/failure"));
    } else {
      router.replace("/verify/failure");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-lg">Verifying...</div>
    </div>
  );
}
