import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About | Gray Bulk",
  description:
    "Gray Bulk is a B2B commerce infrastructure platform for Indian suppliers, wholesalers, manufacturers, and distributors.",
  openGraph: {
    title: "About | Gray Bulk",
    description:
      "Gray Bulk is a B2B commerce infrastructure platform for Indian suppliers, wholesalers, manufacturers, and distributors.",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto px-4 lg:px-6 py-20 max-w-3xl">
      <p className="text-sm font-semibold text-neutral-500 mb-4">About</p>

      <h1 className="text-4xl sm:text-5xl font-medium text-black leading-tight mb-8">
        Wholesale trade, modernized.
      </h1>

      <div className="space-y-6 text-lg text-neutral-700">
        <p>
          Gray Bulk is a B2B commerce infrastructure platform built for Indian
          suppliers, wholesalers, manufacturers, importers, exporters, and
          distributors. We give industrial businesses the tools to sell
          wholesale products online — with structured catalogs, automated
          settlements, and supplier storefronts that scale.
        </p>
        <p>
          Most Indian B2B trade still runs on WhatsApp messages, Excel sheets,
          and unstructured dealer networks. Gray Bulk replaces that with a
          modern marketplace: verified supplier profiles, searchable product
          catalogs, and settlement infrastructure that pays suppliers
          automatically after every transaction.
        </p>
        <p>
          We're building for the businesses that keep India's supply chains
          moving — raw commodities, FMCG bulk supply, packaging materials,
          food ingredients, textiles, chemicals, construction supply, and more.
          Less paperwork. Faster transactions. No middlemen.
        </p>
      </div>

      <hr className="my-14 border-neutral-200" />
    </div>
  );
}
