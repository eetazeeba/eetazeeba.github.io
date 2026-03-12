export default function ServicesPageWireframe() {
  const services = [
    {
      number: "01",
      title: "Music Projects",
      summary:
        "Release support, launch assets, presentation polish, and practical help for artists moving from idea to public-facing rollout.",
      bullets: ["Release planning", "Promo assets", "Project positioning"],
      fit: "Best for singles, EPs, albums, and artist support material.",
    },
    {
      number: "02",
      title: "Visual + Design Support",
      summary:
        "Cover art systems, branding support, social graphics, and cohesive visual assets built to travel across platforms.",
      bullets: ["Cover art", "Brand visuals", "Promo graphics"],
      fit: "Best for artists who need a recognizable visual package.",
    },
    {
      number: "03",
      title: "Writing + Editorial",
      summary:
        "Artist bios, page copy, project descriptions, and editorial cleanup that clarifies the work without sanding off its personality.",
      bullets: ["Artist bios", "Copy polish", "Messaging support"],
      fit: "Best for projects that need clearer language and structure.",
    },
    {
      number: "04",
      title: "Web + Digital Presence",
      summary:
        "Lightweight site support, landing pages, content structure, and digital systems that make creative work easier to find and understand.",
      bullets: ["Landing pages", "Site structure", "Content systems"],
      fit: "Best for artists who need a cleaner online front door.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Share the project",
      body: "Start with the basics: what you are building, where it stands now, and what kind of help you think you need.",
    },
    {
      number: "02",
      title: "We review the fit",
      body: "Musifer reviews scope, goals, and timeline to identify the right service path or recommend a cleaner next step.",
    },
    {
      number: "03",
      title: "Get a clear next move",
      body: "You receive a quote, recommendation, or practical direction instead of being left to guess what happens next.",
    },
  ];

  const prepItems = [
    "Project type and current stage",
    "Rough timeline or target release window",
    "Known deliverables or wishlist",
    "Links, drafts, references, or current assets",
  ];

  const faqTeasers = [
    "Not sure which service you need? Use the quote form anyway and describe the project in plain language.",
    "Smaller or early-stage creative work can still be a fit if the scope is clear and the goals are realistic.",
    "If Musifer is not the right match, get in touch and we'll help you find the right support for your project. Check out our community resources and partner network!",
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-4 md:p-6">
          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Services page wireframe
          </div>
          <h1 className="mt-2 text-2xl font-semibold md:text-4xl">
            Services parent-route structure
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600 md:text-base">
            Built as a focused conversion page that introduces service categories,
            clarifies fit, and funnels visitors toward the quote form without
            opening with an immediate hard sell.
          </p>
        </header>

        <section className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="text-xs font-mono text-zinc-500">01 / HERO</div>
              <h2 className="mt-1 max-w-3xl text-2xl font-semibold md:text-4xl">
                Creative support for independent artists and evolving projects
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
                Musifer supports music, visual, written, and digital work with
                practical services designed to help artists present their work
                clearly, launch with intention, and build something sustainable.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-xl border-2 border-dashed border-zinc-400 px-4 py-3 text-sm font-medium text-zinc-700">
                  Primary CTA / Explore Services
                </div>
                <div className="rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-600">
                  Secondary CTA / How It Works
                </div>
              </div>

              <div className="mt-5 max-w-xl rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
                Supporting note: Built for independent creative work, artist support,
                and practical project development rather than bloated full-agency theater.
              </div>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-zinc-400 bg-zinc-50 p-5">
              <div className="text-xs font-mono text-zinc-500">Hero companion block</div>
              <div className="mt-3 min-h-48 rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-500">
                Optional visual or stacked value block
                <br />
                logo / motif / abstract image / service summary rail
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
                  Multidisciplinary support
                </div>
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
                  Artist-first scope
                </div>
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
                  Clear next steps
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="service-categories"
          className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-zinc-500">02 / SERVICE CATEGORIES</div>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">
                What Musifer is cut out to handle
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600 md:text-base">
                Four-card entry point for self-sorting. Each card should preview a
                real service lane without turning the page into a massive checklist.
              </p>
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              4 core lanes
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex min-h-72 flex-col rounded-2xl border-2 border-dashed border-zinc-400 bg-zinc-50 p-5"
              >
                <div className="text-xs font-mono text-zinc-500">{service.number}</div>
                <h3 className="mt-2 text-lg font-medium md:text-xl">{service.title}</h3>
                <p className="mt-3 text-sm text-zinc-600 md:text-base">{service.summary}</p>

                <div className="mt-4 flex-1 rounded-2xl border border-dashed border-zinc-300 bg-white p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Common asks
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
                  {service.fit}
                </div>

                <div className="mt-4 w-fit rounded-xl border border-dashed border-zinc-300 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Optional link / view details
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            id="how-it-works"
            className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8"
          >
            <div className="text-xs font-mono text-zinc-500">03 / HOW WORK STARTS</div>
            <h2 className="mt-1 text-xl font-semibold md:text-2xl">
              A simple intake path, not a maze
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4"
                >
                  <div className="text-xs font-mono text-zinc-500">{step.number}</div>
                  <div className="mt-2 text-base font-medium text-zinc-800">{step.title}</div>
                  <p className="mt-2 text-sm text-zinc-600">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
            <div className="text-xs font-mono text-zinc-500">04 / PROJECT FIT</div>
            <h2 className="mt-1 text-xl font-semibold md:text-2xl">
              What helps before reaching out
            </h2>
            <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Helpful starting info
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                {prepItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
              Reassurance copy block: If a visitor is unsure which category fits,
              the quote form should still work as a general entry point.
            </div>
          </div>
        </section>

        <section
          id="quote-form"
          className="rounded-3xl border-2 border-dashed border-zinc-500 bg-zinc-50 p-5 md:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-xs font-mono text-zinc-500">05 / PRIMARY CONVERSION BAND</div>
              <h2 className="mt-1 text-2xl font-semibold md:text-3xl">
                Ready to talk through your project?
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
                This is the first hard conversion point. By now the visitor has seen
                the service lanes, the intake process, and enough fit guidance to know
                whether submitting a quote request makes sense.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-zinc-400 bg-white p-5">
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                CTA cluster
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border-2 border-dashed border-zinc-400 px-4 py-3 text-sm font-medium text-zinc-700">
                  Primary CTA / Get a Quote
                </div>
                <div className="rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-600">
                  Secondary CTA / View FAQ
                </div>
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
                  Microcopy: Tell us what you are building, what stage it is in, and
                  where you need support.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
            <div className="text-xs font-mono text-zinc-500">06 / FAQ TEASERS</div>
            <h2 className="mt-1 text-xl font-semibold md:text-2xl">
              Questions people usually have before sending the form
            </h2>
            <div className="mt-4 space-y-3">
              {faqTeasers.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-700"
                >
                  <div className="text-xs font-mono text-zinc-500">0{index + 1}</div>
                  <div className="mt-2">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
            <div className="text-xs font-mono text-zinc-500">07 / FINAL ROUTING + FOOTER CTA</div>
            <h2 className="mt-1 text-xl font-semibold md:text-2xl">
              Keep adjacent paths visible without muddying the goal
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-700">
                Route to Contact
              </div>
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-700">
                Route to Blog
              </div>
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-700">
                Route back to About
              </div>
            </div>
            <div className="mt-4 rounded-2xl border-2 border-dashed border-zinc-400 bg-zinc-50 p-5 text-sm text-zinc-600 min-h-24">
              Final CTA band or closing line with slight brand flavor and a last
              quote-form prompt.
            </div>
          </div>
        </section>

        <footer className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-4 text-sm text-zinc-600 md:p-6">
          Mobile order should remain linear: Hero -&gt; Service Categories -&gt; How Work Starts
          -&gt; Project Fit -&gt; Quote CTA -&gt; FAQ -&gt; Final Routing.
          <br />
          Integration note: preserve existing card/layout conventions where possible,
          promote this into shared modules instead of page-specific hacks, and keep
          the first quote CTA above the fold only on very tall screens if it happens
          naturally rather than by force.
        </footer>
      </div>
    </div>
  );
}

