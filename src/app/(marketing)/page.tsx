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
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 items-center">
          {/* Left Column */}
          <div>
            <div>
              <h1 className="relative text-black text-3xl sm:text-5xl lg:text-6xl font-medium sm:leading-[60px] lg:leading-[77px]">
                Built for Indian
                <br />
                Wholesale Commerce.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-neutral-500 max-w-lg">
                Suppliers, manufacturers, and distributors sell wholesale products online — with structured catalogs, automated settlements, and scalable storefronts.
              </p>
            </div>

            <div className="flex relative mt-10 flex-col max:smml-4 ">
              <div>
                <a href="https://app.graybulk.com" target="_blank">
                  <Button variant="primary" size="sm">
                    Start Selling
                  </Button>
                </a>
                {/* <div className="absolute translate-x-20">
                  <CreateAgent />
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:block">
            <AnimatedHeroGrid />
          </div>
        </div>

        <div className="my-20 py-20 bg-neutral-100">
          <h2 className="text-5xl font-medium text-neutral-900 mb-6 flex justify-center flex-row items-center gap-4 font-instrument-sans"></h2>
        </div>

        <div className="my-20 flex flex-col md:items-center px-6 py-10 md:py-20 bg-neutral-50 md:grid md:grid-cols-[70%_30%]">
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
          </div>
          <div className="hidden md:block">
            <PRIssues />
          </div>
          <a href="https://app.graybulk.com" target="_blank">
            <Button variant="primary">Create Supplier Profile</Button>
          </a>
        </div>
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
