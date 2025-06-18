import Image from "next/image"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="bg-[#f5f5f5] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">

        {/* EY Logo outside the white card */}
        <div className="flex justify-center">
          <Image
            src="https://www.vectorlogo.zone/logos/ey/ey-ar21.svg"
            alt="EY Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        {/* Forgot Password Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg space-y-6">
          <ForgotPasswordForm />

          <div className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <a href="/login" className="text-yellow-500 font-medium hover:underline">
              Sign in
            </a>
          </div>
        </div>
        
      </div>
    </div>
  )
}
