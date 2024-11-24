import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff } from 'lucide-react'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("helloworld@gmail.com")
  const [password, setPassword] = useState("")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-12">
            <Image
              src="/placeholder.svg"
              alt="Logo"
              width={48}
              height={48}
              className="dark:invert"
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <div className="text-right">
            <Link
              href="#"
              className="text-sm text-primary hover:text-primary/90"
            >
              Forgot password?
            </Link>
          </div>
          <Button className="w-full bg-black text-white hover:bg-black/90">
            Log in
          </Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or Login with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              <Image
                src="/placeholder.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />
            </Button>
            <Button variant="outline" className="w-full">
              <Image
                src="/placeholder.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
            </Button>
            <Button variant="outline" className="w-full">
              <Image
                src="/placeholder.svg"
                alt="Apple"
                width={20}
                height={20}
                className="mr-2"
              />
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="#"
              className="text-primary hover:text-primary/90"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

