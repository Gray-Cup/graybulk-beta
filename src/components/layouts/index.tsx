import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons/arrow";

// Asymmetric two-column layout (matches hero: 70/30 split)
export function TwoColLayout({
  left,
  right,
  className,
  reverse = false,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 items-center",
        reverse && "md:grid-cols-[30%_70%]",
        className
      )}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

export function TwoColEqualLayout({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 items-center", className)}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// Centered 4-card grid (2 cols × 2 rows, not full width)
export function FourCardGrid({
  cards,
  className,
}: {
  cards: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    button?: { label: string; href?: string };
  }[];
  className?: string;
}) {
  return (
    <div className={cn("flex justify-center", className)}>
      <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
        {cards.slice(0, 4).map((card, i) => (
          <div
            key={i}
            className="bg-card rounded-4xl p-8 flex flex-col gap-5"
          >
            <div className="text-primary">
              {card.icon ?? <ArrowRight className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-medium text-primary">
              {card.title}
            </h3>
            <p className="text-base text-subdesc leading-relaxed flex-1">
              {card.description}
            </p>
            {card.button && (
              <div className="mt-1">
                {card.button.href ? (
                  <a href={card.button.href}>
                    <Button variant="black" size="sm">{card.button.label}</Button>
                  </a>
                ) : (
                  <Button variant="black" size="sm">{card.button.label}</Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Section wrapper with consistent vertical spacing
export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("py-16 md:py-24", className)}>
      {children}
    </div>
  );
}
