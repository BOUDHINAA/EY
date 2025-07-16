"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/sections/input"
import { Label } from "@/components/sections/label"
import { useState } from "react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle reset logic here (API call, etc.)
    console.log("Reset password link sent to:", email)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
        Send Reset Link
      </Button>
    </form>
  )
}
