export const dynamic = "force-dynamic";

import { randomMail } from "@/lib/random";

import HomeInput from "@/components/client/home-input";

export default function Home() {
  const email = `${randomMail()}@vwh.sh`;

  return (
    <div className="mx-auto mb-4 flex w-full max-w-3xl flex-col items-center space-y-6">
      <section className="text-center">
        <h1 className="text-primary mb-1 text-4xl font-bold">VWH Email</h1>
        <p className="text-foreground/80 text-xl">
          Open-Source Disposable Email
        </p>
      </section>
      <HomeInput emailValue={email} />
      <section className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-12">
        <div className="flex items-start space-x-4">
          <div>
            <h3 className="text-primary text-lg font-semibold">
              Use any inbox to avoid spam
            </h3>
            <p className="text-foreground/80">
              Use Inbox Kitten when you don{"'"}t want to get spammed by
              revealing your real email address.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div>
            <h3 className="text-primary text-lg font-semibold">
              Email Auto-Deletes
            </h3>
            <p className="text-foreground/80">
              Emails are in the public domain, and auto delete after three days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
