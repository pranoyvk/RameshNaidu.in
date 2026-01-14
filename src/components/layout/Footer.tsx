import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Library, Mail, Heart } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <Library className="w-6 h-6 text-primary" />
              <span className="text-2xl font-serif font-bold text-gradient">
                Pathipati
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              A curated collection of PDF documents written with love and wisdom.
              Each document is freely available for download and sharing.
            </p>
            <motion.a
              href="mailto:ppramesh009@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 mt-6 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              ppramesh009@gmail.com
            </motion.a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Pathipati Writings. Made with
            <Heart className="w-4 h-4 text-primary" />
            for sharing knowledge.
          </p>
        </div>
      </div>
    </footer>
  );
}
