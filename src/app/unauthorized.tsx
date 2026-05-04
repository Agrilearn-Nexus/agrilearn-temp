import Link from "next/link";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <Lock className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            401 Unauthorized
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Please log in to access this page. You do not have the required credentials to view this content.
          </p>
        </div>
        <Link
          href="/auth/login" 
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}