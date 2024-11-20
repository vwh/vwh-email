"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface InboxDeleteRedirectProps {
  toAddress: string;
}

export default function InboxDeleteRedirect({
  toAddress,
}: InboxDeleteRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/${toAddress}`, { scroll: false });
  }, [toAddress]);

  return null;
}
