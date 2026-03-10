import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for NickCheckr — limitations, accuracy of results, and liability information.",
};

export default function DisclaimerPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Disclaimer
      </h1>
      <p className="mt-4 text-sm text-zinc-500">
        Last updated: March 10, 2026
      </p>

      <div className="mt-10 space-y-8 text-zinc-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white">
            Accuracy of results
          </h2>
          <p className="mt-3">
            Username availability checks on NickCheckr are best-effort. We check
            public profile URL patterns to determine whether a username appears
            to be taken or available, but this approach has limits. Platforms may
            block automated requests, return misleading responses, or change
            their URL structures without notice. A result showing "available"
            does not guarantee you can register that username, and a result
            showing "taken" might occasionally be wrong. Always verify
            availability directly on the platform before attempting to register.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">No affiliation</h2>
          <p className="mt-3">
            NickCheckr is not affiliated with, endorsed by, or connected to any
            of the platforms it checks. We are an independent tool. All platform
            names, logos, and trademarks belong to their respective owners. Our
            use of these names is purely to identify the services we check
            against.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">
            No credential storage
          </h2>
          <p className="mt-3">
            We never ask for passwords, login credentials, or authentication
            tokens. NickCheckr works entirely by checking publicly accessible
            profile URLs. No account access is required, and no sensitive
            information is collected or stored during the checking process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">
            Service availability
          </h2>
          <p className="mt-3">
            The platforms we check may be temporarily unavailable, rate-limit our
            requests, or block access from our servers. When this happens, you
            will see a timeout or error result for that platform. This does not
            mean the username is available or taken. It means we could not get a
            reliable answer. Try again later, or check the platform directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">
            Limitation of liability
          </h2>
          <p className="mt-3">
            NickCheckr is provided "as is" without warranties of any kind,
            whether express or implied. We are not liable for any damages arising
            from use of this service, including but not limited to lost
            usernames, incorrect availability results, missed registration
            opportunities, or decisions made based on information provided by our
            checks. You use this tool at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">External links</h2>
          <p className="mt-3">
            Our site contains links to external platforms and websites. We have
            no control over the content, privacy policies, or practices of these
            third-party sites. Following any external link is at your own
            discretion, and we are not responsible for anything you encounter
            there.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Changes</h2>
          <p className="mt-3">
            We reserve the right to modify this disclaimer at any time without
            prior notice. Changes take effect as soon as they are posted on this
            page. Continued use of NickCheckr after changes are published
            constitutes acceptance of those changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p className="mt-3">
            Questions about this disclaimer can be sent to{" "}
            <a
              href="mailto:nickcheckr@stosiu.dev"
              className="text-brand-400 hover:underline"
            >
              nickcheckr@stosiu.dev
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
