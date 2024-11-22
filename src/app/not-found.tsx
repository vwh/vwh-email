import Link from "next/link";

import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/error-alert";

export default function NotFound() {
  return (
    <ErrorAlert title="Oops! page not found">
      <div className="flex items-center justify-center gap-2">
        <Link
          href="/"
          className="text-sm text-foreground/80"
          title="Go back to home"
        >
          <Button variant="outline" type="button" aria-label="Go back to home">
            Go back to home
          </Button>
        </Link>
      </div>
    </ErrorAlert>
  );
}
