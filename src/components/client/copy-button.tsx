"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CopyIcon, CopyCheckIcon } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`h-10 w-10 ${className}`}
      onClick={copyToClipboard}
    >
      {copied ? (
        <CopyCheckIcon className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
