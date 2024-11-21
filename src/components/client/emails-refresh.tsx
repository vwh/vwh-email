"use client";

import { useCallback, useEffect, useState } from "react";

import type { DatabaseEmails } from "@/types";

import BackLink from "@/components/back-link";
import EmailListItem from "@/components/email-list-item";
import CopyButton from "@/components/client/copy-button";
import ErrorAlert from "@/components/error-alert";

import { MailSearchIcon, Loader2Icon } from "lucide-react";

interface EmailsRefreshProps {
  email: string;
  dbEmails: DatabaseEmails;
}

export default function EmailsRefresh({ dbEmails, email }: EmailsRefreshProps) {
  const [emails, setEmails] = useState<DatabaseEmails>(dbEmails);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = useCallback(() => {
    console.log("fetching");
    setIsFetching(true);

    fetch(`/api/email/${email}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Unexpected response: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEmails(data);
        setIsFetching(false);
      })
      .catch((err) => {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");

        setIsFetching(false);
      });

    setIsFetching(false);
  }, [email]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEmails();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchEmails]);

  return (
    <>
      <section className="flex justify-between">
        <BackLink to="/" text="Back to Home" />
        <p className="flex items-end text-xs">{isFetching && "Refreshing"}</p>
        <p className="flex items-center text-sm text-red-500">{error}</p>
      </section>

      <section className="rounded border bg-primary/85 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <MailSearchIcon className="h-8 w-8 text-background" />
            <h2 className="text-1xl max-w-[250px] truncate font-semibold text-background sm:max-w-full">
              {email}
            </h2>
          </div>
          <CopyButton
            className="text-background"
            variant="ghost"
            text={email}
          />
        </div>
      </section>

      {emails.length > 0 ? (
        <section className="space-y-2">
          {emails.map(({ id, subject, createdAt, fromAddress }) => (
            <EmailListItem
              key={id}
              id={id}
              subject={subject}
              createdAt={createdAt}
              fromAddress={fromAddress}
            />
          ))}
        </section>
      ) : (
        <ErrorAlert
          title="No Emails Found Yet"
          description="Refreshing Automatically"
          icon={
            <Loader2Icon className="h-4 w-4 animate-spin text-primary sm:h-7 sm:w-7" />
          }
        />
      )}
    </>
  );
}
