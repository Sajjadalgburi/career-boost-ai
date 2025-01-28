import Link from "next/link";
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex justify-between p-6 items-center w-full border-t border-gray-200 max-w-5xl container">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          © 2025 Career Boost AI
        </span>
      </div>

      {/* Socials */}
      <div className="flex items-center gap-4">
        <Link
          href="https://linkedin.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-blue-600 transition-colors"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="https://github.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-600 transition-colors"
        >
          <FaGithub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
