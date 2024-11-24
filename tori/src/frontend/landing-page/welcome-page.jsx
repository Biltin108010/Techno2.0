import { Button } from "@/components/ui/button"
import { useRouter } from "next/router" // Importing Next.js router for navigation

export default function WelcomeScreen() {
  const router = useRouter()

  const navigateToLogin = () => {
    router.push('/landing-page/login-acc') // Navigate to the login page
  }

  const navigateToCreateAccount = () => {
    router.push('/landing-page/create-acc') // Navigate to the create account page
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center space-y-8">
      {/* Logo */}
      <div className="w-24 h-24 relative">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M20 40 L50 20 L80 40 L50 60 Z"
            fill="#374151"
          />
          <path
            d="M20 60 L50 40 L80 60 L50 80 Z"
            fill="#6B7280"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="space-y-4 text-center max-w-[280px]">
        <h1 className="text-2xl font-bold tracking-tight">
          Explore the app
        </h1>
        <p className="text-sm text-muted-foreground">
          Discover all the tools and features designed to simplify your inventory and sales tracking.
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-[280px] space-y-3">
        <Button className="w-full" variant="default" size="lg" onClick={navigateToLogin}>
          Sign In
        </Button>
        <Button className="w-full" variant="outline" size="lg" onClick={navigateToCreateAccount}>
          Create account
        </Button>
      </div>
    </div>
  )
}
