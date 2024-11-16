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
  fromAddress,
}: EmailListItemProps) {
  const formattedCreatedAt = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  return (
    <div className="bg-primary/10 group relative w-full overflow-hidden rounded border p-4 transition-all duration-300 ease-in-out hover:shadow-md">
      <Link href={`/inbox/${id}`} className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2"
            title={fromAddress ?? "No Sender"}
          >
            <MailIcon className="h-5 w-5 text-gray-400" />
            <p className="text-foreground/80 max-w-[220px] truncate text-sm font-medium transition-colors duration-300">
              {fromAddress ?? "No Sender"}
            </p>
          </div>
          <span className="group-hover:text-foreground hidden text-xs text-gray-500 transition-colors duration-300 sm:block">
            {formattedCreatedAt}
          </span>
        </div>
        <p
          className="text-primary text-md truncate font-semibold transition-colors duration-300"
          title={subject ?? "No Subject"}
        >
          {subject ?? "No Subject"}
        </p>
        <p className="truncate text-xs text-gray-400 transition-colors duration-300 sm:hidden">
          {formattedCreatedAt}
        </p>
      </Link>
      <div className="to-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
