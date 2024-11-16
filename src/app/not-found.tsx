import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-primary/85 rounded border p-6 shadow-sm">
      <div className="text-center">
        <h1 className="text-background mb-4 text-3xl font-bold">
          Oops! Page Not Found
        </h1>
        <p className="text-background/80 mb-6">
          The page you{"'"}re looking for doesn{"'"}t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="outline">Go Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}
