import Inbox from "@/components/inbox";

interface InboxProps {
  params: {
    inboxId: string;
  };
}

export default async function InboxPage({ params }: InboxProps) {
  const { inboxId } = await params;

  return <Inbox inboxId={inboxId} isModal={false} />;
}
