import Link from "next/link";

import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/error-alert";

export default function NotFound() {
  return (
    <ErrorAlert title="Oops! Page Not Found">
      <div className="flex items-center justify-center gap-2">
        <Link href="/" className="text-sm text-foreground/80">
          <Button variant="outline" type="button" aria-label="Go Back To Home">
            Go Back To Home
          </Button>
        </Link>
      </div>
    </ErrorAlert>
  );
}
