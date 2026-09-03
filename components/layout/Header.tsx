"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navigationLinks = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/resources", label: "Career Resources" },
];

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(79,70,229,0.06)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        {/* Left Side: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4F46E5] text-white shadow-sm">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            HireFlow
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Sign Up
          </Link>

          <Link
            href="/post-job"
            className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#4338CA]"
          >
            Post a Job
          </Link>
        </div>

        {/* Right Side: Mobile Drawer Trigger */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* Remove asChild and put button styles directly on SheetTrigger */}
            <SheetTrigger
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[80vw] max-w-75 rounded-none border-r border-gray-100 p-6 bg-white flex flex-col justify-between h-full [&>button]:hidden shadow-xl"
            >
              {/* ... sheet content ... */}
            </SheetContent>
          </Sheet>{" "}
        </div>
      </div>
    </header>
  );
};
