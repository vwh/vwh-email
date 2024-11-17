import { getInboxById } from "@/database/db";
import { formatDistanceToNow } from "date-fns";

import ErrorAlert from "@/components/error-alert";
import BackLink from "@/components/back-link";
import AddressBox from "@/components/address-box";

import { ArrowRightIcon, CircleXIcon } from "lucide-react";

interface InboxProps {
  params: {
    inboxId: string;
  };
}

export default async function InboxPage({ params }: InboxProps) {
  const { inboxId } = await params;

  const result = getInboxById(inboxId);
  if (!result.success)
    return (
      <ErrorAlert>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-primary text-1xl font-bold sm:text-2xl">
            Unable to fetch inbox
          </h1>
          <CircleXIcon className="text-primary h-4 w-4 sm:h-7 sm:w-7" />
        </div>
        <p className="text-foreground/80 mt-1 text-sm">
          Try refreshing the page or check back later.
        </p>
      </ErrorAlert>
    );

  const renderContent = () => {
    if (result.data?.htmlContent)
      return (
        <div dangerouslySetInnerHTML={{ __html: result.data.htmlContent }} />
      );

    if (result.data?.textContent)
      return (
        <pre className="whitespace-pre-wrap">{result.data.textContent}</pre>
      );

    return <p>No body found</p>;
  };

  if (!result.data)
    return (
      <ErrorAlert>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-primary text-1xl font-bold sm:text-2xl">
            No Inbox Found
          </h1>
          <CircleXIcon className="text-primary h-4 w-4 sm:h-7 sm:w-7" />
        </div>
      </ErrorAlert>
    );

  return (
    <>
      <BackLink to={`/${result.data.toAddress}`} text="Back to Emails" />
      <section className="bg-primary/85 rounded border p-6 shadow-sm">
        <div className="text-background flex flex-col justify-between gap-4 sm:flex-row sm:gap-2 md:items-center">
          <AddressBox
            label="From"
            address={result.data.fromAddress ?? "No Sender"}
          />
          <div className="hidden sm:block">
            <ArrowRightIcon className="text-background h-5 w-5" />
          </div>
          <AddressBox
            label="To"
            address={result.data.toAddress ?? "No Recipient"}
          />
        </div>
      </section>

      <section className="bg-primary/10 space-y-6">
        <div className="rounded border p-4 shadow-sm">
          <div className="mb-4 flex flex-col text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Received{" "}
              {formatDistanceToNow(new Date(result.data.createdAt), {
                addSuffix: true,
              })}
            </span>
            <span>
              Expires{" "}
              {formatDistanceToNow(new Date(result.data.expiresAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <h2 className="text-primary mb-4 text-xl font-semibold">
            {result.data?.subject ?? "No Subject"}
          </h2>
          <div className="prose max-w-none">{renderContent()}</div>
        </div>
      </section>
    </>
  );
}
