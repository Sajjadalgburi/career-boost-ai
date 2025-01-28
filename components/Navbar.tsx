import React from "react";
import { ModeToggle } from "./ModeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 w-full max-w-5xl container">
      <p className="text-2xl font-bold p-2">CareerBoost AI</p>
      <div className="flex items-center gap-2">
        <ModeToggle />

        <SignedIn>
          <div className="auth-button">
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="auth-button">
            <SignInButton />
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
