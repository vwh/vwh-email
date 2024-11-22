export const dynamic = "force-dynamic";

import { randomMail } from "@/lib/random";

import HomeInput from "@/components/client/home-input";

export default function Home() {
  const email = `${randomMail()}@vwh.sh`;

  return (
    <div className="mx-auto mb-4 flex w-full max-w-3xl flex-col items-center space-y-6">
      <section className="text-center">
        <h1 className="mb-1 text-4xl font-bold text-primary">VWH Email</h1>
        <p className="text-xl text-foreground/80">
          Open source disposable email
        </p>
      </section>
      <div className="group relative flex w-full flex-col gap-4 overflow-hidden rounded border bg-primary/10 p-4 transition-all duration-300 ease-in-out hover:shadow-md">
        <HomeInput emailValue={email} />
        <section className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:gap-12">
          <div className="flex items-start space-x-4">
            <div>
              <h2 className="text-lg font-semibold text-primary">
                Use any inbox to avoid spam
              </h2>
              <p className="text-foreground/80">
                Use it when you don{"'"}t want to get spammed by revealing your
                real email address.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div>
              <h2 className="text-lg font-semibold text-primary">
                Email auto deletes
              </h2>
              <p className="text-foreground/80">
                Emails are in the public domain, and auto delete after three
                days.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
