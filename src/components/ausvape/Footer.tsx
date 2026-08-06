import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { WispDivider } from "./SmokeWisp";
import { WHATSAPP_NUMBER, WhatsAppFloatingButton, whatsappLink } from "./WhatsApp";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0C] pt-20 pb-10 px-4 md:px-8 relative">
      <WispDivider className="absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Logo className="text-xl" />
          <p className="mt-4 text-sm text-[color:var(--color-smoke)] max-w-xs">
            Australia's premium vapour retailer. Authentic devices, curated for the discerning adult consumer.
          </p>
          <div className="mt-5 flex gap-3 text-[color:var(--color-smoke)]">
            <a
              aria-label="AUSVAPE CO on Instagram"
              href="https://www.instagram.com/ausvape.co1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
        <FooterCol title="Shop">
          <FooterLink to="/shop">All Products</FooterLink>
          <FooterLink to="/category/disposables">Disposables</FooterLink>
          <FooterLink to="/category/accessories">Accessories</FooterLink>
        </FooterCol>
        <FooterCol title="Company">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/blog">Journal</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/track">Track my order</FooterLink>
        </FooterCol>
        <FooterCol title="Legal">
          <FooterLink to="/legal/age-policy">Age-Restricted Sales Policy</FooterLink>
          <FooterLink to="/legal/shipping">Shipping & Returns</FooterLink>
          <FooterLink to="/legal/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/legal/terms">Terms</FooterLink>
        </FooterCol>
      </div>
      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-[#A9791F]/15 flex flex-col md:flex-row justify-between gap-3 text-xs text-[color:var(--color-smoke)]">
        <div>© {new Date().getFullYear()} AUSVAPE CO. Nicotine is addictive. Sold to 18+ only in Australia.</div>
        <div>
          Melbourne, Australia ·{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-gold">
            WhatsApp {WHATSAPP_NUMBER}
          </a>
        </div>
      </div>
      <WhatsAppFloatingButton />
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">{title}</div>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-[color:var(--color-platinum)]/70 hover:text-gold transition-colors">
        {children}
      </Link>
    </li>
  );
}