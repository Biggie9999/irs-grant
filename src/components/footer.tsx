import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold">IRS Grant Program</span>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            The IRS Federal Grant Program provides financial assistance to eligible senior citizens and disabled individuals across the United States.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} IRS Grant Program</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
