import Image from "next/image"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-[#f5f5f5] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">

        {/* EY Logo */}
        <div className="flex justify-center">
          <Image
            src="https://www.vectorlogo.zone/logos/ey/ey-ar21.svg"
            alt="EY Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  )
}
