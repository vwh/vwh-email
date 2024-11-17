import { getEmailsForAddress } from "@/database/db";

import ErrorAlert from "@/components/error-alert";
import EmailsRefresh from "@/components/client/emails-refresh";

import { Loader2Icon, CircleXIcon } from "lucide-react";

interface EmailProps {
  params: Promise<{
    email: string;
  }>;
}

export default async function Email({ params }: EmailProps) {
  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);

  const result = getEmailsForAddress(decodedEmail);
  if (!result.success)
    return (
      <ErrorAlert>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-primary text-1xl font-bold sm:text-2xl">
            Unable to fetch emails
          </h1>
          <CircleXIcon className="text-primary h-4 w-4 sm:h-7 sm:w-7" />
        </div>
        <p className="text-foreground/80 mt-1 text-sm">
          Try refreshing the page or check back later.
        </p>
      </ErrorAlert>
    );

  if (result.data.length === 0)
    return (
      <ErrorAlert>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-primary text-1xl font-bold sm:text-2xl">
            No Emails Found Yet
          </h1>
          <Loader2Icon className="text-primary h-4 w-4 animate-spin sm:h-7 sm:w-7" />
        </div>
        <p className="text-foreground/80 mt-1 text-sm">
          Refreshing Automatically
        </p>
      </ErrorAlert>
    );

  return <EmailsRefresh dbEmails={result.data} email={decodedEmail} />;
}
