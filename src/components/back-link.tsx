import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

interface BackLinkProps {
  to: string;
  text: string;
}

export default function BackLink({ to, text }: BackLinkProps) {
  return (
    <Link href={to} className="text-primary group flex items-center">
      <ArrowLeftIcon className="mr-2 h-4 w-4 transform transition-transform duration-300 group-hover:-translate-x-1" />
      {text}
    </Link>
  );
}
