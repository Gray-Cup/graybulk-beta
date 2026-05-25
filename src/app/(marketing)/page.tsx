"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  CreateAgent,
  IDEAgent,
  Forms,
  Questions,
  ToDo,
  ProductPr,
  ProductIssue,
  CustomerCalls,
  ProductPrBottomLeft,
  PRIssues,
} from "@/components/svgs";
import { AnimatedHeroGrid } from "@/components/hero-grid/HeroGrid";
import { TwoColLayout, FourCardGrid, Section } from "@/components/layouts";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [randomizedComponents, setRandomizedComponents] = useState<
    React.ComponentType<{ className?: string }>[]
  >([]);

  useEffect(() => {
    const components = [
      CreateAgent,
      IDEAgent,
      Forms,
      Questions,
      ToDo,
      ProductPr,
      ProductIssue,
      CustomerCalls,
    ];

    // Shuffle components
    const shuffled = [...components].sort(() => Math.random() - 0.5);
    setRandomizedComponents(shuffled);
    setMounted(true);
  }, []);

  return (
    <div className="mx-auto px-4 lg:px-6 h-auto my-10">
      <div className="md:min-h-screen pt-10 pb-20 md:pb-0 flex flex-col justify-center">
        <TwoColLayout
          left={
            <div>
              <h1 className="relative text-black text-3xl sm:text-5xl lg:text-6xl font-medium sm:leading-[60px] lg:leading-[77px]">
                Built for Indian
                <br />
                Wholesale Commerce.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-neutral-500 max-w-lg">
                Suppliers, manufacturers, and distributors sell wholesale products online — with structured catalogs, automated settlements, and scalable storefronts.
              </p>
              <div className="flex relative mt-10 flex-col">
                <a href="https://app.graybulk.com" target="_blank">
                  <Button variant="primary" size="sm">
                    Start Selling
                  </Button>
                </a>
              </div>
            </div>
          }
          right={
            <div className="hidden lg:block">
              <AnimatedHeroGrid />
            </div>
          }
        />

        <Section>
          <FourCardGrid
            cards={[
              {
                title: "Automated Settlements",
                description: "Sell products. Receive settlements automatically. No manual reconciliation.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" opacity="0.3"/>
                    <path d="M11 7h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
                    <path d="M12 2v2m0 16v2M2 12h2m16 0h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                button: { label: "Start Selling", href: "https://app.graybulk.com" },
              },
              {
                title: "Supplier Storefronts",
                description: "Build your supplier presence online. Your products, catalog, and company — in one place.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                button: { label: "Create Profile", href: "https://app.graybulk.com" },
              },
              {
                title: "Structured Catalogs",
                description: "Organize your entire product range with structured listings built for B2B buyers.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6h16M4 10h16M4 14h10M4 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="14" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                ),
                button: { label: "List Products", href: "https://app.graybulk.com" },
              },
              {
                title: "Low Transaction Fees",
                description: "0.4% on UPI. Flat ₹230 on net banking. Predictable costs at any volume.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v2m0 16v2M6 12H4m16 0h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9 9h4.5a1.5 1.5 0 010 3H10a1.5 1.5 0 000 3H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 7.5V9m0 6v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                button: { label: "See Pricing", href: "https://app.graybulk.com" },
              },
            ]}
          />
        </Section>

        <Section className="bg-neutral-50 px-6">
          <TwoColLayout
            left={
              <div>
                <div className="block md:hidden max-md:pb-5">
                  <PRIssues />
                </div>
                <h2 className="text-2xl sm:text-5xl font-medium text-neutral-900 mb-6 font-instrument-sans">
                  Commerce infrastructure for Indian wholesale.
                </h2>
                <p className="text-md sm:text-xl mb-10 text-neutral-700 my-4 max-w-2xl">
                  Most Indian B2B trade still happens over WhatsApp, Excel sheets,
                  and phone calls. Gray Bulk brings it online — with structured
                  catalogs, automated settlements, and supplier storefronts built
                  to scale.
                  <br />
                  <br />
                  Less paperwork. Faster transactions. No middlemen.
                </p>
                <a href="https://app.graybulk.com" target="_blank">
                  <Button variant="primary">Create Supplier Profile</Button>
                </a>
              </div>
            }
            right={
              <div className="hidden md:block">
                <PRIssues />
              </div>
            }
          />
        </Section>
        {/* <p className="text-center text-sm text-muted-foreground">would love to buy coldrun.ai but it's costly. ps: this platform is work in progress</p> */}
      </div>

      <div className="py-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          Currently We are in Beta.
        </h2>
        {/* <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border border-neutral-200 p-4 rounded-lg bg-white">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  Customer Intelligence
                </h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Auto-classify messages into bugs, features & feedback</li>
                  <li>• Use our Email client and scan for customer pain point analysis and save into knowledge base.</li>
                  <li>• Zoom & Google Meet call recording with insights</li>
                  <li>• Scrape Discord, primarydit, Slack & forums for competitor insights</li>
                </ul>
              </div>

              <div className="border border-neutral-200 p-4 rounded-lg bg-white">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  AI Support Agents
                </h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Client-facing agent with memory & knowledge graph</li>
                  <li>• Web search API for real-time answers</li>
                  <li>• Dashboard agent with organized data intelligence</li>
                  <li>• Vector DB & knowledge graph poweprimary responses</li>
                </ul>
              </div>

              <div className="border border-neutral-200 p-4 rounded-lg bg-white">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  Community & Feedback
                </h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Feature voting like feedback.ycombinator.com</li>
                  <li>• Integrated support & roadmap management</li>
                  <li>• Waitlist pages with survey forms & deep research</li>
                  <li>• Auto-convert bugs to GitHub issues</li>
                </ul>
              </div>

              <div className="border border-neutral-200 p-4 rounded-lg bg-white">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  Native Integrations
                </h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• Discord, Slack, Zoom, Notion, Airtable</li>
                  <li>• Intercom, Stripe, Segment, GitHub</li>
                  <li>• Zapier, Twilio for workflow automation</li>
                  <li>• Free tier & startup cprimaryits available</li>
                </ul>
              </div>
            </div> */}
      </div>
      {/* <div className="mx-4 mt-10 my-2">
        <div className="relative w-full max-w-5xl aspect-[10/3] rounded-2xl mx-auto overflow-hidden">
          <Image
            src="/gradient-2.png"
            alt="Kite"
            width={800}
            height={450}
            draggable={false}
            className="rounded-xl select-none brightness-75 object-cover w-full h-full"
          />
          <h1 className="absolute bottom-0 font-mono lg:right-1/4 transform translate-x-1/4 md:translate-x-1/2 -translate-y-1/2 text-white text-2xl md:text-3xl font-bold text-center z-10 whitespace-nowrap">
            Treat. Customers. Better.
          </h1>
        </div> */}
      {/* </div> */}
    </div>
  );
}
