"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

type WhoAmI =
  | { authenticated: false }
  | {
      authenticated: true;
      user: { id: string; name?: string | null; image?: string | null };
    };

export function Navbar() {
  const pathname = usePathname();

  // Default to "not ready" only on /sign-in (where we might swap to Dashboard).
  const [ready, setReady] = useState(pathname === "/sign-in" ? false : true);
  const [auth, setAuth] = useState<WhoAmI>({ authenticated: false });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "b" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        // Check if user is not typing in an input field
        const activeElement = document.activeElement as HTMLElement;
        if (
          activeElement &&
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.contentEditable === "true")
        ) {
          return;
        }

        event.preventDefault();
        document.getElementById("sign-in-link")?.click();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    // Only bother fetching auth on /sign-in (so other pages never show a loading state).
    if (pathname !== "/sign-in") return;

    const ctrl = new AbortController();

    fetch("https://app.graybulk.com/api/whoami", {
      method: "GET",
      credentials: "include",
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : { authenticated: false }))
      .then((data: WhoAmI) => {
        setAuth(data);
        setReady(true);
      })
      .catch(() => {
        setAuth({ authenticated: false });
        setReady(true);
      });

    return () => ctrl.abort();
  }, [pathname]);

  const showDashboardCTA = pathname === "/sign-in" && auth.authenticated;

  return (
    <header className="w-full py-2 bg-white border-b border-neutral-200">
      <div className="flex h-14 items-center justify-between max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-normal flex items-center gap-4">

          
          <Logo className="h-10 w-auto" />
          <h1 className="font-semibold text-2xl text-[#0A0B0D]">Gray Bulk</h1>
          </Link>
          <nav className="hidden font-medium text-lg md:flex pl-3 gap-1">
            <Link
              href="/pricing"
              className="circular rounded-md px-3 py-2 text-neutral-800"
            >
              Pricing
            </Link>
            <a
              href="https://docs.graybulk.com"
              target="_blank"
              className="circular rounded-md px-3 py-2 text-neutral-800"
            >
              Docs
            </a>
            <Link
              href="/about"
              className="circular rounded-md px-3 py-2 text-neutral-800"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Only ever show a loading state on /sign-in while we decide if we should show Dashboard */}
          {!ready && pathname === "/sign-in" ? (
            <Button
              variant="secondary"
              size="minor"
              className="opacity-70 pointer-events-none"
            >
              Loading…
            </Button>
          ) : showDashboardCTA ? (
            <a href="https://app.graybulk.com">
              <Button variant="primary" size="minor">
                Dashboard
              </Button>
            </a>
          ) : (
            <>
              {/* Internal route: use Link + asChild so it doesn't flash a reload */}
              <Link href="/play-with-us" className="inline-block">
                <Button variant="secondary" size="sm">
                  Play with Us
                </Button>
              </Link>

              {/* Sign-in always visible outside the app */}
              <a
                href="https://app.graybulk.com/"
                target="_blank"
                rel="dofollow noopener"
                id="sign-in-link"
              >
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
