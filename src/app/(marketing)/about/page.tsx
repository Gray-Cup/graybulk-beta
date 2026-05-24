import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About | Coldran",
  description:
    "Coldran helps product teams collect, analyze, and act on customer feedback using AI agents. Built by Arjun Aditya.",
  openGraph: {
    title: "About | Coldran",
    description:
      "Coldran helps product teams collect, analyze, and act on customer feedback using AI agents.",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto px-4 lg:px-6 py-20 max-w-3xl">
      <p className="text-sm font-semibold text-neutral-500 mb-4">About</p>

      <h1 className="text-4xl sm:text-5xl font-medium text-black leading-tight mb-8">
        Customers shouldn't shout into the void.
      </h1>

      <div className="space-y-6 text-lg text-neutral-700">
        <p>
          Coldran is a customer intelligence platform built to help product
          teams stop guessing what their users want. We collect feedback from
          wherever customers already are — Discord, Slack, email, your website
          — and surface what actually matters.
        </p>
        <p>
          Most feedback tools are passive. They wait for customers to fill out
          a form. Coldran uses AI agents to actively gather, classify, and
          synthesize feedback into a knowledge base your whole team can act on.
          Bugs become GitHub issues. Feature requests get triaged. Patterns
          emerge before they become churn.
        </p>
        <p>
          We're early and moving fast. The product is in beta, which means
          things break, features ship rough, and we talk directly to every
          customer. That's intentional.
        </p>
      </div>

      <hr className="my-14 border-neutral-200" />

      <div className="flex flex-col sm:flex-row items-start gap-8">
        <Image
          src="/arjun.jpg"
          alt="Arjun Aditya"
          width={96}
          height={96}
          className="rounded-full shrink-0"
        />
        <div>
          <p className="text-sm font-semibold text-neutral-500 mb-1">
            Built by
          </p>
          <h2 className="text-2xl font-medium text-black mb-2">
            Arjun Aditya
          </h2>
          <p className="text-neutral-600 mb-4">
            Founder, developer, and the entire team. Previously frustrated by
            how hard it was to know what customers actually needed. Now building
            the tool he wished existed.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://twitter.com/arjunships"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm">
                Twitter
              </Button>
            </a>
            <a
              href="https://github.com/nermalcat69"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm">
                GitHub
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/nermalcat69/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm">
                LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </div>

      <hr className="my-14 border-neutral-200" />

      <div className="flex flex-col sm:flex-row gap-4">
        <a href="https://app.graybulk.com" target="_blank">
          <Button variant="primary" size="lg">
            Get started
          </Button>
        </a>
        <a
          href="https://cal.com/arjunaditya/30min?user=arjunaditya"
          target="_blank"
        >
          <Button variant="default" size="lg">
            Talk to Arjun
          </Button>
        </a>
        <Link href="/pricing">
          <Button variant="default" size="lg">
            See pricing
          </Button>
        </Link>
      </div>
    </div>
  );
}
