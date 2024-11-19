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

      <section className="bg-primary/85 rounded border p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <MailSearchIcon className="text-background h-8 w-8" />
            <h2 className="text-background text-1xl max-w-[250px] truncate font-semibold sm:max-w-full">
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
      )}
    </>
  );
}
