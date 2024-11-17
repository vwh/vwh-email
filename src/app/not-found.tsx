import Link from "next/link";

import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/error-alert";

export default function NotFound() {
  return (
    <ErrorAlert>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-primary text-1xl font-bold sm:text-2xl">
          Oops! Page Not Found
        </h1>
        <Link href="/" className="text-sm text-foreground/80">
          <Button variant="outline">Go Back to Home</Button>
        </Link>
      </div>
    </ErrorAlert>
  );
}
