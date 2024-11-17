import { getEmailsForAddress } from "@/database/db";

import BackLink from "@/components/back-link";
import ErrorAlert from "@/components/error-alert";
import EmailListItem from "@/components/email-list-item";

import { Loader2Icon, MailSearchIcon, CircleXIcon } from "lucide-react";
import CopyButton from "@/components/client/copy-button";

interface EmailProps {
  params: {
    email: string;
  };
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

  return (
    <>
      <section className="flex justify-between">
        <BackLink to="/" text="Back to Home" />
        {/* <p className="flex items-end text-xs">{isFetching && "Refreshing"}</p> */}
      </section>

      <section className="bg-primary/85 rounded border p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <MailSearchIcon className="text-background h-8 w-8" />
            <h2 className="text-background text-1xl max-w-[250px] truncate font-semibold sm:max-w-full">
              {decodedEmail}
            </h2>
          </div>
          <CopyButton
            className="text-background"
            variant="ghost"
            text={decodedEmail}
          />
        </div>
      </section>

      <section className="space-y-2">
        {result.data.map(({ id, subject, createdAt, fromAddress }) => (
          <EmailListItem
            key={id}
            id={id}
            subject={subject}
            createdAt={createdAt}
            fromAddress={fromAddress}
          />
        ))}
      </section>
    </>
  );
}
