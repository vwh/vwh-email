import { getEmailsForAddress } from "@/database/db";

import ErrorAlert from "@/components/error-alert";
import EmailsRefresh from "@/components/client/emails-refresh";

interface EmailProps {
  params: Promise<{
    email: string;
  }>;
}

export default async function Email({ params }: EmailProps) {
  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);

  if (!decodedEmail.endsWith("@vwh.sh")) {
    return (
      <ErrorAlert
        title="Invalid Email"
        description="Email must end with @vwh.sh ."
      />
    );
  }

  const result = getEmailsForAddress(decodedEmail);
  if (!result.success)
    return (
      <ErrorAlert
        title="Unable to fetch emails"
        description="Try refreshing the page or check back later."
      />
    );

  return <EmailsRefresh dbEmails={result.data} email={decodedEmail} />;
}
