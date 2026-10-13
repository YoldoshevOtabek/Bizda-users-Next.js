
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "SSR", href: "/cards/ssr" },
  { name: "SSG", href: "/cards/ssg" },
  { name: "CSR", href: "/cards/csr" },
  { name: "ISR", href: "/cards/isr" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="text-xl font-bold">
        MyWebsite
      </Link>

      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-700 transition-colors hover:text-green-600"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

