export default function BlogPageWireframe() {
  const featuredCards = [
    {
      number: "01",
      eyebrow: "Start here / Editorial context",
      title: "Field notes, guides, and practical reading for independent artists",
      summary:
        "The first card can carry the page's light editorial framing, explain what kind of writing belongs here, and point readers toward a strong featured guide instead of wasting the whole top of the page on a standard hero slab.",
      meta: "Hybrid intro + featured story card",
      cta: "Primary CTA / Read Featured Guide",
      accent: "Use this card to set tone and orient new visitors.",
    },
    {
      number: "02",
      eyebrow: "Evergreen guide",
      title: "How to prepare a release page that does not bury the actual work",
      summary:
        "A strategic evergreen article that supports long-term discovery, search intent, and practical next steps for artists who need a cleaner digital front door.",
      meta: "Topic / Web + Digital Presence",
      cta: "CTA / Read Article",
      accent: "Keep cards strongly visual and clearly scannable.",
    },
    {
      number: "03",
      eyebrow: "Practical + legal",
      title: "What artists should actually gather before asking for legal or admin help",
      summary:
        "Problem-solving content that is useful on its own while naturally bridging to service and contact pathways if the reader's situation becomes more specific.",
      meta: "Topic / Legal + Practicalities",
      cta: "CTA / Read Article",
      accent: "Strong fit for service-adjacent reading.",
    },
    {
      number: "04",
      eyebrow: "Strategy / DIY growth",
      title: "Small, repeatable ways to make an independent project easier to discover",
      summary:
        "An example of planning and strategy content that supports the blog's role as the site's long-term discovery engine without turning the page into a generic marketing trough.",
      meta: "Topic / Artist Strategy",
      cta: "CTA / Read Article",
      accent: "Useful for discovery-oriented visitors.",
    },
  ];

  const topicChips = [
    "Release + Production",
    "Web + Digital Presence",
    "Legal + Practicalities",
    "Artist Strategy + DIY Growth",
  ];

  const guideRail = [
    {
      number: "01",
      title: "Release planning guides",
      summary: "Evergreen reads that help artists prepare launches, assets, and timelines.",
    },
    {
      number: "02",
      title: "Digital presence guides",
      summary: "Posts focused on websites, landing pages, structure, and clearer presentation.",
    },
    {
      number: "03",
      title: "Practical/legal explainers",
      summary: "Useful breakdowns for the parts of creative work that usually arrive wrapped in avoidable confusion.",
    },
  ];

  const latestPosts = [
    {
      number: "01",
      title: "How much information should go on a project landing page?",
      meta: "Web + Digital Presence / 6 min read",
      summary: "A recent practical article card with title, excerpt, topic label, and date/read-time metadata.",
    },
    {
      number: "02",
      title: "A simple release-prep checklist for artists with limited time",
      meta: "Release + Production / 5 min read",
      summary: "Recent post card designed for fast scanning and continued browsing, not metadata clutter.",
    },
    {
      number: "03",
      title: "When to reach out for help instead of researching yourself into a hole",
      meta: "Artist Strategy / 4 min read",
      summary: "Supports the eventual handoff from blog reading into services or contact when the reader is ready.",
    },
    {
      number: "04",
      title: "What to gather before asking for a quote or project review",
      meta: "Legal + Practicalities / 7 min read",
      summary: "Good bridge content for the relationship between blog, services, and contact routes.",
    },
    {
      number: "05",
      title: "How to keep project copy clear without sounding sterile",
      meta: "Writing + Editorial / 5 min read",
      summary: "Another recent post card placeholder to stress a curated but active blog surface.",
    },
    {
      number: "06",
      title: "Making a small creative site feel intentional",
      meta: "Web + Digital Presence / 8 min read",
      summary: "Use the final card or two to show depth without letting the landing page become an archive dump.",
    },
  ];

  const bridgePoints = [
    "Practical guidance for independent artists",
    "Evergreen guides with real project value",
    "Natural pathways into services and contact",
  ];

  const supportLinks = [
    "Route to Services",
    "Route to Contact",
    "Route to Topic Pages / Future Blog Paths",
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-4 md:p-6">
          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Blog page wireframe
          </div>
          <h1 className="mt-2 text-2xl font-semibold md:text-4xl">
            Blog parent-route structure
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600 md:text-base">
            Built as a curated editorial hub rather than a generic archive. This page
            should support long-term discovery, topic browsing, and clean handoffs into
            services and contact without pretending the top of the page needs another
            standard full-width hero block.
          </p>
        </header>

        <section className="rounded-3xl border-2 border-dashed border-zinc-500 bg-zinc-50 p-5 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-zinc-500">01 / FEATURED CARD STACK</div>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">
                Replace the standard hero with a curated featured card stack or snap rail
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-zinc-600 md:text-base">
                This top section should behave like a manual snap carousel or card stack.
                The first card can carry editorial context. The rest should showcase
                featured articles, evergreen guides, or priority topic entry points.
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-3 py-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Manual first / auto-advance only after substantial dwell time
            </div>
          </div>

          <div className="mt-5 overflow-x-auto pb-2">
            <div className="flex snap-x snap-mandatory gap-4">
              {featuredCards.map((card, index) => (
                <article
                  key={card.title}
                  className={`snap-start shrink-0 rounded-3xl border-2 border-dashed p-5 md:p-6 ${
                    index === 0
                      ? "w-88 border-zinc-400 bg-white md:w-md"
                      : "w-[20rem] border-zinc-300 bg-white md:w-[24rem]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs font-mono text-zinc-500">{card.number}</div>
                    <div className="rounded-full border border-dashed border-zinc-300 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                      {card.eyebrow}
                    </div>
                  </div>

                  <div className="mt-4 min-h-36 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-500">
                    Visual placeholder / featured image / illustration treatment
                  </div>

                  <h3 className="mt-4 text-lg font-medium md:text-xl">{card.title}</h3>
                  <p className="mt-3 text-sm text-zinc-600 md:text-base">{card.summary}</p>

                  <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
                    {card.meta}
                  </div>
                  <div className="mt-3 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
                    {card.accent}
                  </div>

                  <div className="mt-4 w-fit rounded-xl border-2 border-dashed border-zinc-400 px-4 py-3 text-sm font-medium text-zinc-700">
                    {card.cta}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
              Accessibility + behavior note: allow swipe/drag on touch, support keyboard
              navigation, and keep controls explicit if arrows or pagination dots are used.
            </div>
            <div className="rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-600">
              Prev / Manual control
            </div>
            <div className="rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-600">
              Next / Manual control
            </div>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="text-xs font-mono text-zinc-500">02 / EDITORIAL INTRO</div>
              <h2 className="mt-1 max-w-2xl text-2xl font-semibold md:text-4xl">
                Ideas, guides, and field notes for independent artists building real work
              </h2>
              <p className="mt-3 max-w-xl text-sm text-zinc-600 md:text-base">
                A short intro belongs here, but it should stay light. The real first block
                is the featured snap rail, where readers can browse strong entry points,
                evergreen guides, and service-adjacent articles without being buried under
                an oversized hero sermon.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-xl border-2 border-dashed border-zinc-400 px-4 py-3 text-sm font-medium text-zinc-700">
                  Primary CTA / Browse Topics
                </div>
                <div className="rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-600">
                  Secondary CTA / Start with Featured
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
                Editorial note: keep the top section discovery-oriented and restrained.
                The page should feel like a content destination, not a sales page wearing
                fake glasses.
              </div>
            </div>

            <div className="rounded-3xl border-2 border-dashed border-zinc-400 bg-zinc-50 p-5">
              <div className="text-xs font-mono text-zinc-500">Top-block guidance</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
                  No full-width hero banner
                </div>
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
                  Manual, accessible interaction
                </div>
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
                  Reuse rail/card systems first
                </div>
              </div>
              <div className="mt-4 min-h-40 rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-500">
                Optional brand motif / editorial texture / abstract visual support
                <br />
                Keep it atmospheric, not noisy.
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-zinc-500">03 / TOPIC BROWSE</div>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">
                Keep topic browsing early and restrained
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-zinc-600 md:text-base">
                Topic chips should help self-sorting and internal linking without spawning
                a taxonomy landfill. Start with a small set of useful lanes that can map
                cleanly to future content clusters.
              </p>
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              4 topic lanes
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {topicChips.map((topic) => (
              <div
                key={topic}
                className="rounded-full border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
              >
                Topic chip / {topic}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
            Integration note: these can route to topic landing pages, filtered views, or
            anchor-supported sections later, but do not overbuild a thin archive machine
            before the content library exists.
          </div>
        </section>

        <section className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-zinc-500">04 / FEATURED GUIDES RAIL</div>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">
                Give evergreen or strategic content a second structured lane
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-zinc-600 md:text-base">
                Use this as a medium-priority rail for guides, series, or editorial buckets
                worth keeping visible beyond the featured top cards.
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-3 py-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Reuse shared rail/card patterns
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {guideRail.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border-2 border-dashed border-zinc-400 bg-zinc-50 p-5"
              >
                <div className="text-xs font-mono text-zinc-500">{item.number}</div>
                <div className="mt-3 min-h-28 rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-500">
                  Guide card visual / icon / motif
                </div>
                <h3 className="mt-4 text-lg font-medium md:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm text-zinc-600 md:text-base">{item.summary}</p>
                <div className="mt-4 w-fit rounded-xl border border-dashed border-zinc-300 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Optional link / view guide set
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-zinc-500">05 / LATEST POSTS</div>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">
                Keep recent posts visible without letting the landing page become an archive dump
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-zinc-600 md:text-base">
                Latest content should read as active and useful, but curated enough that the
                page still feels intentional instead of reverse-chronological wallpaper.
              </p>
            </div>
            <div className="rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-600">
              Secondary CTA / View All Posts
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post) => (
              <article
                key={post.title}
                className="flex min-h-64 flex-col rounded-2xl border-2 border-dashed border-zinc-400 bg-zinc-50 p-5"
              >
                <div className="text-xs font-mono text-zinc-500">{post.number}</div>
                <div className="mt-3 min-h-28 rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-500">
                  Post card image / thumbnail / abstract artwork
                </div>
                <h3 className="mt-4 text-lg font-medium md:text-xl">{post.title}</h3>
                <div className="mt-2 text-sm text-zinc-500">{post.meta}</div>
                <p className="mt-3 flex-1 text-sm text-zinc-600 md:text-base">{post.summary}</p>
                <div className="mt-4 w-fit rounded-xl border border-dashed border-zinc-300 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  CTA / Read Post
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border-2 border-dashed border-zinc-500 bg-zinc-50 p-5 md:p-8">
            <div className="text-xs font-mono text-zinc-500">06 / VALUE BRIDGE</div>
            <h2 className="mt-1 text-xl font-semibold md:text-2xl">
              Remind readers what this section is for
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
              This block can reinforce that the blog exists to help artists solve practical
              problems, understand project decisions, and find stronger next steps without
              making every article feel like a disguised conversion trap.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {bridgePoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-700"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
            <div className="text-xs font-mono text-zinc-500">07 / SERVICES BRIDGE CTA</div>
            <h2 className="mt-1 text-xl font-semibold md:text-2xl">
              Need help beyond the article?
            </h2>
            <p className="mt-3 text-sm text-zinc-600 md:text-base">
              This is the clean handoff point from reading into project work. Keep the copy
              honest and useful: some readers want to keep learning, while others have
              crossed into needing real support.
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border-2 border-dashed border-zinc-400 px-4 py-3 text-sm font-medium text-zinc-700">
                Primary CTA / Explore Services
              </div>
              <div className="rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-600">
                Secondary CTA / Get a Quote
              </div>
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
                Internal-linking note: route selectively into service lanes, quote/contact
                destinations, and relevant support content. Do not make the blog hub carry
                the whole conversion burden by itself.
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-5 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <div className="text-xs font-mono text-zinc-500">08 / CONTACT + COMMUNITY BRIDGE</div>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">
                Keep an alternate low-pressure path visible
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
                Some readers will want contact or community-oriented pathways rather than a
                quote. This block can stay light now and grow later without forcing fake
                newsletter infrastructure into the page before it exists.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {supportLinks.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="rounded-3xl border-2 border-dashed border-zinc-500 bg-white p-4 text-sm text-zinc-600 md:p-6">
          Mobile order should remain linear: Editorial Intro → Featured Snap Rail → Topic
          Browse → Featured Guides → Latest Posts → Value Bridge → Services Bridge →
          Contact/Community Bridge.
          <br />
          Integration note: preserve existing card and rail conventions where possible,
          keep the top interaction manual and accessible, use the first featured card for
          light editorial context, and avoid building taxonomy sprawl or archive-heavy
          clutter just because blog pages make humans forget restraint.
        </footer>
      </div>
    </div>
  );
}
