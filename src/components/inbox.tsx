import { formatDistanceToNow } from "date-fns";

import ErrorAlert from "@/components/error-alert";
import BackLink from "@/components/back-link";
import AddressBox from "@/components/address-box";

import { ArrowRightIcon, CircleXIcon } from "lucide-react";
import { getInboxById } from "@/database/db";

interface InboxProps {
  inboxId: string;
  isModal?: boolean;
}

export default function Inbox({ inboxId, isModal = true }: InboxProps) {
  const inbox = getInboxById(inboxId);

  const renderContent = () => {
    if (inbox?.htmlContent)
      return <div dangerouslySetInnerHTML={{ __html: inbox.htmlContent }} />;

    if (inbox?.textContent)
      return <pre className="whitespace-pre-wrap">{inbox.textContent}</pre>;

    return <p>No body found</p>;
  };

  //   if (error)
  //     return (
  //       <ErrorAlert>
  //         <div className="flex items-center justify-center gap-2">
  //           <h1 className="text-primary text-1xl font-bold sm:text-2xl">
  //             {error.message}
  //           </h1>
  //           <CircleXIcon className="text-primary h-4 w-4 sm:h-7 sm:w-7" />
  //         </div>
  //       </ErrorAlert>
  //     );

  if (!inbox)
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
      {!isModal && (
        <BackLink to={`/${inbox.toAddress}`} text="Back to Emails" />
      )}

      <section className="bg-primary/85 rounded border p-6 shadow-sm">
        <div className="text-background flex flex-col justify-between gap-4 sm:flex-row sm:gap-2 md:items-center">
          <AddressBox label="From" address={inbox.fromAddress ?? "No Sender"} />
          <div className="hidden sm:block">
            <ArrowRightIcon className="text-background h-5 w-5" />
          </div>
          <AddressBox label="To" address={inbox.toAddress ?? "No Recipient"} />
        </div>
      </section>

      <section className="bg-primary/10 space-y-6">
        <div className="rounded border p-4 shadow-sm">
          <div className="mb-4 flex flex-col text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Received{" "}
              {formatDistanceToNow(new Date(inbox.createdAt), {
                addSuffix: true,
              })}
            </span>
            <span>
              Expires{" "}
              {formatDistanceToNow(new Date(inbox.expiresAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <h2 className="text-primary mb-4 text-xl font-semibold">
            {inbox?.subject ?? "No Subject"}
          </h2>
          <div className="prose max-w-none">{renderContent()}</div>
        </div>
      </section>
    </>
  );
}
