import React from "react";
import { ModeToggle } from "./ModeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 sm:px-8 items-center p-3 mt-3 w-full max-w-5xl container bg-background dark:bg-background border border-border backdrop-blur-lg rounded-2xl sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold p-2">
        CareerBoost AI
      </Link>
      <div className="flex items-center gap-5">
        <ModeToggle />

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <span className="auth-button">
            <SignInButton />
          </span>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
