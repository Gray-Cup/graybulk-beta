import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About | Gray Bulk",
  description:
    "Gray Bulk helps product teams collect, analyze, and act on customer feedback using AI agents. Built by Arjun Aditya.",
  openGraph: {
    title: "About | Gray Bulk",
    description:
      "Gray Bulk helps product teams collect, analyze, and act on customer feedback using AI agents.",
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
          Gray Bulk is a customer intelligence platform built to help product
          teams stop guessing what their users want. We collect feedback from
          wherever customers already are — Discord, Slack, email, your website
          — and surface what actually matters.
        </p>
        <p>
          Most feedback tools are passive. They wait for customers to fill out
          a form. Gray Bulk uses AI agents to actively gather, classify, and
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
    </div>
  );
}
