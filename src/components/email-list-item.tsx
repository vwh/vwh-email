import Link from "next/link";

import { formatDistanceToNow } from "date-fns";

import { MailIcon } from "lucide-react";

interface EmailListItemProps {
  id: string;
  subject: string | null;
  createdAt: string;
  fromAddress: string | null;
}

export default function EmailListItem({
  id,
  subject,
  createdAt,
  fromAddress
}: EmailListItemProps) {
  const formattedCreatedAt = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true
  });

  return (
    <div className="group relative w-full overflow-hidden rounded border bg-primary/10 p-4 transition-all duration-300 ease-in-out hover:shadow-md">
      <Link href={`/inbox/${id}`} className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2"
            title={fromAddress ?? "No Sender"}
          >
            <MailIcon className="h-5 w-5 text-gray-400" />
            <p className="max-w-[220px] truncate text-sm font-medium text-foreground/80 transition-colors duration-300">
              {fromAddress ?? "No Sender"}
            </p>
          </div>
          <span className="hidden text-xs text-gray-500 transition-colors duration-300 group-hover:text-foreground sm:block">
            {formattedCreatedAt}
          </span>
        </div>
        <p
          className="text-md truncate font-semibold text-primary transition-colors duration-300"
          title={subject ?? "No Subject"}
        >
          {subject ?? "No Subject"}
        </p>
        <p className="truncate text-xs text-gray-400 transition-colors duration-300 sm:hidden">
          {formattedCreatedAt}
        </p>
      </Link>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
