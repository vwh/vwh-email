import CopyButton from "@/components/client/copy-button";
import { MailIcon, Trash2Icon } from "lucide-react";

export default function Component() {
  return (
    <div className="mx-auto mb-4 flex w-full max-w-3xl flex-col items-center space-y-6">
      <section className="text-center">
        <h1 className="text-primary mb-1 text-4xl font-bold">VWH Email API</h1>
        <p className="text-foreground/80 text-xl">REST API Documentation</p>
      </section>
      <section className="w-full space-y-8">
        {/* Email Endpoint */}
        <div className="bg-primary/10 group relative w-full overflow-hidden rounded border p-4 transition-all duration-300 ease-in-out hover:shadow-md">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MailIcon className="h-5 w-5 text-gray-400" />
                <h2 className="text-primary text-lg font-semibold">
                  Get Email Messages
                </h2>
              </div>
              <span className="text-foreground/80 text-sm font-medium">
                GET
              </span>
            </div>
            <p className="text-foreground/80">
              Retrieve all messages for a specific email address
            </p>
            <div className="mt-2 space-y-2">
              <h3 className="text-primary text-md font-semibold">Endpoint</h3>
              <section className="flex items-center gap-2">
                <div className="bg-primary/5 rounded p-2 flex-grow min-w-0">
                  <code className="text-sm block truncate">
                    https://email.vwh.sh/api/email/{"{email}"}
                  </code>
                </div>
                <CopyButton
                  variant="ghost"
                  text={"https://email.vwh.sh/api/email/{email}"}
                  className="flex-shrink-0"
                />
              </section>
              <h3 className="text-primary text-md font-semibold">Parameters</h3>
              <ul className="list-disc list-inside text-sm text-foreground/80">
                <li>email (string): The email address to fetch messages for</li>
              </ul>
              <h3 className="text-primary text-md font-semibold">Response</h3>
              <div className="bg-primary/5 rounded p-2 overflow-x-auto">
                <pre className="text-sm text-foreground/80">
                  {`[
  {
    "id": "{inboxId}",
    "subject": "Test",
    "createdAt": 1732026087000,
    "expiresAt": 1732285287596,
    "fromAddress": "example@gmail.com",
    "toAddress": "{email}",
    "ccAddress": null,
    "bccAddress": null
  }
]`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        {/* Inbox Endpoint */}
        <div className="bg-primary/10 group relative w-full overflow-hidden rounded border p-4 transition-all duration-300 ease-in-out hover:shadow-md">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MailIcon className="h-5 w-5 text-gray-400" />
                <h2 className="text-primary text-lg font-semibold">
                  Get Inbox Message
                </h2>
              </div>
              <span className="text-foreground/80 text-sm font-medium">
                GET
              </span>
            </div>
            <p className="text-foreground/80">
              Retrieve a specific message by its ID
            </p>
            <div className="mt-2 space-y-2">
              <h3 className="text-primary text-md font-semibold">Endpoint</h3>
              <section className="flex items-center gap-2">
                <div className="bg-primary/5 rounded p-2 flex-grow min-w-0">
                  <code className="text-sm block truncate">
                    https://email.vwh.sh/api/inbox/{"{inboxId}"}
                  </code>
                </div>
                <CopyButton
                  variant="ghost"
                  text={"https://email.vwh.sh/api/inbox/{inboxId}"}
                  className="flex-shrink-0"
                />
              </section>
              <h3 className="text-primary text-md font-semibold">Parameters</h3>
              <ul className="list-disc list-inside text-sm text-foreground/80">
                <li>inboxId (string): The unique identifier of the message</li>
              </ul>
              <h3 className="text-primary text-md font-semibold">Response</h3>
              <div className="bg-primary/5 rounded p-2 overflow-x-auto">
                <pre className="text-sm text-foreground/80">
                  {`{
  "id": "{inboxId}",
  "textContent": "Hello\\n",
  "htmlContent": "<div dir=\\"rtl\\"><div dir=\\"ltr\\">Hello</div></div>\\n",
  "subject": "Test",
  "expiresAt": 1732285287596,
  "createdAt": 1732026087000,
  "fromAddress": "example@gmail.com",
  "toAddress": "example@vwh.sh"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Endpoint */}
        <div className="bg-primary/10 group relative w-full overflow-hidden rounded border p-4 transition-all duration-300 ease-in-out hover:shadow-md">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trash2Icon className="h-5 w-5 text-gray-400" />
                <h2 className="text-primary text-lg font-semibold">
                  Delete Inbox Message
                </h2>
              </div>
              <span className="text-foreground/80 text-sm font-medium">
                GET
              </span>
            </div>
            <p className="text-foreground/80">
              Delete a specific message by its ID
            </p>
            <div className="mt-2 space-y-2">
              <h3 className="text-primary text-md font-semibold">Endpoint</h3>
              <section className="flex items-center gap-2">
                <div className="bg-primary/5 rounded p-2 flex-grow min-w-0">
                  <code className="text-sm block truncate">
                    https://email.vwh.sh/api/delete/{"{inboxId}"}
                  </code>
                </div>
                <CopyButton
                  variant="ghost"
                  text={"https://email.vwh.sh/api/delete/{inboxId}"}
                  className="flex-shrink-0"
                />
              </section>
              <h3 className="text-primary text-md font-semibold">Parameters</h3>
              <ul className="list-disc list-inside text-sm text-foreground/80">
                <li>inboxId (string): The unique identifier of the message</li>
              </ul>
              <h3 className="text-primary text-md font-semibold">Response</h3>
              <div className="bg-primary/5 rounded p-2 overflow-x-auto">
                <pre className="text-sm text-foreground/80">true</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
