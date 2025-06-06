"use client";

import { useState } from "react";

import Link from "next/link";
import { randomMail } from "@/lib/random";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { RefreshCwIcon } from "lucide-react";
import CopyButton from "@/components/client/copy-button";

interface HomeInputProps {
  emailValue: string;
}

export default function HomeInput({ emailValue }: HomeInputProps) {
  const [email, setEmail] = useState<string>(emailValue);

  const regenerateEmail = () => {
    setEmail(`${randomMail()}@vwh.sh`);
  };

  return (
    <section className="w-full">
      <div className="flex items-center space-x-1">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => {
            if (!e.target.value.includes("@vwh.sh"))
              setEmail(`${e.target.value}@vwh.sh`);
          }}
          placeholder="Enter your email address"
          className="flex-grow"
          type="email"
        />
        <Button
          onClick={regenerateEmail}
          size="icon"
          variant="outline"
          type="button"
          aria-label="Regenerate Email"
          title="Regenerate Email"
        >
          <RefreshCwIcon className="h-4 w-4" />
        </Button>
        <CopyButton text={email} />
      </div>
      <Link href={`/${email}`} title="Get mail now">
        <Button
          className="mt-2 w-full text-background"
          type="button"
          aria-label="Get mail now"
        >
          Get mail now!
        </Button>
      </Link>
    </section>
  );
}
