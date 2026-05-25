"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Tier = {
  name: string;
  price: string;
  cta: string;
  ctaVariant?: "default" | "primary" | "secondary";
  features: string[];
  flagText?: string;
};

/* ---------- Single borderless plan column ---------- */
function PricingCard({
  tier,
  columnRef,
}: {
  tier: Tier;
  columnRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={columnRef} className="relative">
      <Card className="p-0 shadow-none border-0 rounded-none bg-white">
        <div className="flex flex-col gap-6">
          <CardHeader className="p-6">
            <CardTitle className="text-lg font-semibold">{tier.name}</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex w-full flex-col items-start gap-4 px-6 lg:h-[150px]">
              <div className="mb-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-4xl leading-none tracking-[-0.15rem] tabular-nums">
                    {tier.price}
                  </span>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  per month, billed annually
                </CardDescription>
              </div>
              <Button
                className="w-full h-12 rounded-lg"
                variant={tier.ctaVariant ?? "default"}
              >
                {tier.cta}
              </Button>
            </div>

            <Separator className="my-10" />

            <ul className="mt-4 flex flex-col gap-4 px-6 pb-8 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg
                    className="size-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Supplier tier data ---------- */
const tiers: Tier[] = [
  {
    name: "Free",
    price: "₹0",
    cta: "Get Started",
    ctaVariant: "default",
    features: [
      "Up to 5 product listings",
      "Basic supplier profile",
      "Marketplace visibility",
      "Receive buyer inquiries",
      "Automated payment settlements",
    ],
  },
  {
    name: "Growth",
    price: "₹1,250",
    cta: "Start Selling",
    ctaVariant: "primary",
    features: [
      "Up to 30 product listings",
      "Expanded catalog visibility",
      "Enhanced supplier presence",
      "Scalable storefront",
      "Automated payment settlements",
      "Email support",
    ],
  },
  {
    name: "Enterprise",
    price: "₹3,750",
    cta: "Build at Scale",
    ctaVariant: "primary",
    features: [
      "Up to 100 product listings",
      "Large catalog management",
      "Enterprise supplier presence",
      "High-volume selling capability",
      "Automated payment settlements",
      "Priority support",
    ],
  },
  {
    name: "Transaction Fees",
    price: "0.4%",
    cta: "View Docs",
    ctaVariant: "default",
    features: [
      "0.4% platform fee on UPI transactions",
      "₹230 flat fee on net banking transactions",
      "No hidden charges",
      "Settlements processed automatically",
    ],
  },
];

/* ---------- Page ---------- */
export default function PricingPage() {
  const frameRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-black mb-4">
            Supplier Pricing
          </h1>
          <p className="text-lg text-muted-foreground">
            Predictable plans for suppliers. Buyers always browse and purchase for free.
          </p>
        </div>

        <div className="max-w-6xl flex flex-col md:flex-row justify-center items-center max-md:gap-5 md:justify-between mx-auto">
          <div className="max-w-sm w-full ">
            <Card className="p-0 border border-gray-200 rounded-2xl bg-white">
              <div className="flex flex-col gap-6">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold">
                    For Buyers
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex w-full flex-col items-start gap-4 px-6 lg:h-[150px]">
                    <div className="mb-6 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl leading-none tracking-[-0.15rem] tabular-nums">
                          Free
                        </span>
                      </div>
                      <CardDescription className="text-xs text-muted-foreground">
                        always free to browse and buy
                      </CardDescription>
                    </div>
                    <a href="https://app.graybulk.com" target="_blank" className="w-full">
                      <Button
                        className="w-full h-12 rounded-lg"
                        variant="secondary"
                      >
                        Start Sourcing
                      </Button>
                    </a>
                  </div>

                  <Separator className="my-10" />

                  <ul className="mt-4 flex flex-col gap-4 px-6 pb-8 text-sm">
                    {[
                      "Discover verified Indian suppliers",
                      "Browse wholesale product catalogs",
                      "Purchase directly at wholesale rates",
                      "Secure payments with automated settlements",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          </div>
          <div className="flex-col sm:flex-row flex-wrap hidden lg:flex items-center py-4 gap-4 justify-center">
            <Button variant="default" size="minor">Supplier Storefronts</Button>
            <Button variant="primary" size="minor">Automated Settlements</Button>
            <Button variant="primary" size="minor">Scalable Catalogs</Button>
            <Button variant="default" size="minor">Buyer Discovery</Button>
            <Button variant="primary" size="minor">UPI & Net Banking</Button>
            <Button variant="default" size="minor">Verified Suppliers</Button>
            <Button variant="primary" size="minor">Wholesale Transactions</Button>
            <Button variant="primary" size="minor">B2B Payments</Button>
          </div>

          <div className="max-w-sm w-full">
            <Card className="p-0 border border-gray-200 rounded-2xl bg-white">
              <div className="flex flex-col gap-6">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold">
                    Large Enterprise
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex w-full flex-col items-start gap-4 px-6 lg:h-[150px]">
                    <div className="mb-6 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl leading-none tracking-[-0.15rem] tabular-nums">
                          Custom
                        </span>
                      </div>
                      <CardDescription className="text-xs text-muted-foreground">
                        for national suppliers & exporters
                      </CardDescription>
                    </div>
                    <Link href="/enterprise-contact" className="w-full">
                      <Button className="w-full h-12 rounded-lg" variant="primary">
                        Get in Touch
                      </Button>
                    </Link>
                  </div>

                  <Separator className="my-10" />

                  <ul className="mt-4 flex flex-col gap-4 px-6 pb-8 text-sm">
                    {[
                      "Unlimited product listings",
                      "Dedicated account management",
                      "Custom settlement terms",
                      "API access for catalog sync",
                      "Export-focused infrastructure",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10">
          {/* Wrapper must be relative so overlay positions correctly */}
          <div className="relative">
            {/* Framed container can be overflow-hidden now; corners stay clean */}
            <div
              ref={frameRef}
              className="rounded-2xl max-md:max-w-sm max-md:mx-auto border border-gray-200 bg-white overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
                {tiers.map((t) => {
                  return (
                    <div key={t.name} className="relative">
                      <PricingCard tier={t} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* end wrapper */}
        </div>
      </div>
    </div>
  );
}
