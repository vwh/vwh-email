import Link from "next/link";

import { getInboxById } from "@/database/db";
import { formatDistanceToNow } from "date-fns";

import ErrorAlert from "@/components/error-alert";
import BackLink from "@/components/back-link";
import AddressBox from "@/components/address-box";
import HtmlEmail from "@/components/client/html-email";

import { ArrowRightIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InboxProps {
  params: Promise<{
    inboxId: string;
  }>;
}

export default async function InboxPage({ params }: InboxProps) {
  const { inboxId } = await params;

  const result = getInboxById(inboxId);
  if (!result.success)
    return (
      <ErrorAlert
        title="Unable to fetch inbox"
        description="Try refreshing the page or check back later."
      />
    );

  const renderContent = () => {
    if (result.data?.htmlContent)
      return <HtmlEmail html={result.data.htmlContent} />;

    if (result.data?.textContent)
      return (
        <pre className="whitespace-pre-wrap">{result.data.textContent}</pre>
      );

    return <p>No body found</p>;
  };

  if (!result.data)
    return (
      <ErrorAlert
        title="No inbox found"
        description="Does not exist or has been deleted."
      />
    );

  return (
    <>
      <BackLink to={`/${result.data.toAddress}`} text="Back to emails" />
      <section className="rounded border bg-primary/85 p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 text-background sm:flex-row sm:gap-2 md:items-center">
          <AddressBox
            label="From"
            address={result.data.fromAddress ?? "No Sender"}
          />
          <div className="hidden sm:block">
            <ArrowRightIcon className="h-5 w-5 text-background" />
          </div>
          <AddressBox
            label="To"
            address={result.data.toAddress ?? "No Recipient"}
          />
        </div>
      </section>
      <Link href={`/delete/${inboxId}`} className="w-full" title="Delete email">
        <Button
          className="w-full text-background"
          type="button"
          aria-label="Delete email"
        >
          Delete email <Trash2Icon />
        </Button>
      </Link>
      <section className="space-y-6 bg-primary/10">
        <div className="rounded border p-4 shadow-sm">
          <div className="mb-4 flex flex-col text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Received{" "}
              {formatDistanceToNow(new Date(result.data.createdAt), {
                addSuffix: true
              })}
            </span>
            <span>
              Expires{" "}
              {formatDistanceToNow(new Date(result.data.expiresAt), {
                addSuffix: true
              })}
            </span>
          </div>
          <h2 className="mb-4 text-xl font-semibold text-primary">
            {result.data?.subject ?? "No Subject"}
          </h2>
          <div className="prose max-w-none">{renderContent()}</div>
        </div>
      </section>
    </>
  );
}
