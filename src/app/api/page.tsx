import CopyButton from "@/components/client/copy-button";
import { MailIcon, Trash2Icon } from "lucide-react";

export default function Component() {
  return (
    <div className="mx-auto mb-4 flex w-full max-w-3xl flex-col items-center space-y-6">
      <section className="text-center">
        <h1 className="mb-1 text-4xl font-bold text-primary">VWH Email API</h1>
        <p className="text-xl text-foreground/80">REST API Documentation</p>
      </section>
      <section className="w-full space-y-8">
        {/* Email Endpoint */}
        <div className="group relative w-full overflow-hidden rounded border bg-primary/10 p-4 transition-all duration-300 ease-in-out hover:shadow-md">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MailIcon className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-primary">
                  Get email messages
                </h2>
              </div>
              <span className="text-sm font-medium text-foreground/80">
                GET
              </span>
            </div>
            <p className="text-foreground/80">
              Retrieve all messages for a specific email address
            </p>
            <div className="mt-2 space-y-2">
              <h2 className="text-md font-semibold text-primary">Endpoint</h2>
              <section className="flex items-center gap-2">
                <div className="min-w-0 flex-grow rounded bg-primary/5 p-2">
                  <code className="block truncate text-sm">
                    https://email.vwh.sh/api/email/recipient@vwh.sh
                  </code>
                </div>
                <CopyButton
                  variant="ghost"
                  text={"https://email.vwh.sh/api/email/recipient@vwh.sh"}
                  className="flex-shrink-0"
                />
              </section>
              <h2 className="text-md font-semibold text-primary">Parameters</h2>
              <ul className="list-inside list-disc text-sm text-foreground/80">
                <li>email (string): The email address to fetch messages for</li>
              </ul>
              <h2 className="text-md font-semibold text-primary">
                Example response
              </h2>
              <div className="overflow-x-auto rounded bg-primary/5 p-2">
                <pre className="text-sm text-foreground/80">
                  {`[
  {
    "id": "cm3sqher40005276o336z4fvw",
    "subject": "Test Email",
    "createdAt": 1732279492000,
    "expiresAt": 1732538692335,
    "fromAddress": "sender@example.com",
    "toAddress": "recipient@vwh.sh"
  }
]`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        {/* Inbox Endpoint */}
        <div className="group relative w-full overflow-hidden rounded border bg-primary/10 p-4 transition-all duration-300 ease-in-out hover:shadow-md">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MailIcon className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-primary">
                  Get inbox message
                </h2>
              </div>
              <span className="text-sm font-medium text-foreground/80">
                GET
              </span>
            </div>
            <p className="text-foreground/80">
              Retrieve a specific message by its ID
            </p>
            <div className="mt-2 space-y-2">
              <h2 className="text-md font-semibold text-primary">Endpoint</h2>
              <section className="flex items-center gap-2">
                <div className="min-w-0 flex-grow rounded bg-primary/5 p-2">
                  <code className="block truncate text-sm">
                    https://email.vwh.sh/api/inbox/cm3sqher40005276o336z4fvw
                  </code>
                </div>
                <CopyButton
                  variant="ghost"
                  text={
                    "https://email.vwh.sh/api/inbox/cm3sqher40005276o336z4fvw"
                  }
                  className="flex-shrink-0"
                />
              </section>
              <h2 className="text-md font-semibold text-primary">Parameters</h2>
              <ul className="list-inside list-disc text-sm text-foreground/80">
                <li>inboxId (string): The unique identifier of the message</li>
              </ul>
              <h2 className="text-md font-semibold text-primary">
                Example response
              </h2>
              <div className="overflow-x-auto rounded bg-primary/5 p-2">
                <pre className="text-sm text-foreground/80">
                  {`{
  "id": "cm3sqher40005276o336z4fvw",
  "textContent": "This is a test email body.",
  "htmlContent": null,
  "subject": "Test Email",
  "expiresAt": 1732538692335,
  "createdAt": 1732279492000,
  "fromAddress": "sender@example.com",
  "toAddress": "recipient@vwh.sh"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Endpoint */}
        <div className="group relative w-full overflow-hidden rounded border bg-primary/10 p-4 transition-all duration-300 ease-in-out hover:shadow-md">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trash2Icon className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-primary">
                  Delete inbox message
                </h2>
              </div>
              <span className="text-sm font-medium text-foreground/80">
                GET
              </span>
            </div>
            <p className="text-foreground/80">
              Delete a specific message by its ID
            </p>
            <div className="mt-2 space-y-2">
              <h2 className="text-md font-semibold text-primary">Endpoint</h2>
              <section className="flex items-center gap-2">
                <div className="min-w-0 flex-grow rounded bg-primary/5 p-2">
                  <code className="block truncate text-sm">
                    https://email.vwh.sh/api/delete/cm3sqher40005276o336z4fvw
                  </code>
                </div>
                <CopyButton
                  variant="ghost"
                  text={
                    "https://email.vwh.sh/api/delete/cm3sqher40005276o336z4fvw"
                  }
                  className="flex-shrink-0"
                />
              </section>
              <h2 className="text-md font-semibold text-primary">Parameters</h2>
              <ul className="list-inside list-disc text-sm text-foreground/80">
                <li>inboxId (string): The unique identifier of the message</li>
              </ul>
              <h2 className="text-md font-semibold text-primary">
                Example response
              </h2>
              <div className="overflow-x-auto rounded bg-primary/5 p-2">
                <pre className="text-sm text-foreground/80">true</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
