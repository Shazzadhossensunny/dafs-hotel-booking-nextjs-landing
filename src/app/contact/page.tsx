// app/page.tsx
export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background fade-in">
      <div className="max-w-2xl text-center px-4">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
          <h1 className="text-6xl md:text-7xl font-bold text-heading relative">
            Coming Soon
          </h1>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          We're crafting an exceptional booking experience. Stay tuned!
        </p>

        <div className="relative max-w-xs mx-auto mb-12">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="w-full h-full bg-primary origin-left animate-progress" />
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">Twitter</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              ...
            </svg>
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">Facebook</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              ...
            </svg>
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              ...
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
