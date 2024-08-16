import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function MenuBar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="/">
            The Paris 2024 Olympic Medals Value ranking!
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="https://github.com/sanjayamirthraj/olympics-better-rankings"
            >
              Visit the Github repo!
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="https://www.deseret.com/u-s-world/2024/08/07/how-much-gold-olympic-medal-value/"
            >
              Where did I get these numbers from?
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
