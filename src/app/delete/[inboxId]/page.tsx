import { getInboxById, deleteInbox } from "@/database/db";

import ErrorAlert from "@/components/error-alert";
import InboxDeleteRedirect from "@/components/client/Inbox-delete-redirect";

interface InboxProps {
  params: Promise<{
    inboxId: string;
  }>;
}

export default async function InboxPage({ params }: InboxProps) {
  const { inboxId } = await params;

  const getResult = getInboxById(inboxId);
  if (!getResult.success)
    return (
      <ErrorAlert
        title="Unable to fetch inbox"
        description="Try refreshing the page or check back later."
      />
    );

  if (!getResult.data)
    return (
      <ErrorAlert
        title="No inbox found"
        description="Does not exist or has been deleted."
      />
    );

  const deleteResult = deleteInbox(inboxId);
  if (!deleteResult.success)
    return (
      <ErrorAlert
        title="Unable to delete inbox"
        description="Try refreshing the page or check back later."
      />
    );

  return <InboxDeleteRedirect toAddress={getResult.data.toAddress} />;
}
