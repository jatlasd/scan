import { SignInButton } from "@clerk/nextjs"

const NotLoggedIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Reclaiming Control
          <div className="h-1 w-24 bg-primary mx-auto mt-4" />
        </h1>
        
        <p className="text-xl text-muted-foreground italic">
          "Small victories in an ongoing war."
        </p>

        <div className="mt-12 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
          <p className="text-lg text-muted-foreground mb-8">
            Take control of your health journey by tracking and understanding your body's responses.
            Sign in to start documenting your path to wellness.
          </p>
          
          <SignInButton mode="modal">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer">
              Begin Your Journey
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  )
}

export default NotLoggedIn