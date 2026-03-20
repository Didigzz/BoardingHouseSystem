"use client";

import Link from "next/link";
import { Button } from "@havenspace/shared/ui";
import { Home, Menu, X, MapPin } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Home className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="text-xl font-bold">BoardingHouse</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/listings"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Browse Listings
          </Link>
          <Link
            href="/map"
            className="hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <MapPin className="h-4 w-4" />
            Map View
          </Link>
          <Link
            href="/become-landlord"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Become a Landlord
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="container flex flex-col space-y-4 py-4">
            <Link
              href="/listings"
              className="hover:text-primary text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Listings
            </Link>
            <Link
              href="/map"
              className="hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="h-4 w-4" />
              Map View
            </Link>
            <Link
              href="/become-landlord"
              className="hover:text-primary text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Become a Landlord
            </Link>
            <div className="flex items-center space-x-4 border-t pt-4">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button className="w-full" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
