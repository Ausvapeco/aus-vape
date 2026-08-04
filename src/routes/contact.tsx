import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AUSVAPE CO — Support, WhatsApp & Melbourne Counter" },
      { name: "description", content: "Reach the AUSVAPE CO team by email or WhatsApp for order, shipping and returns help, or visit our Melbourne CBD counter Mon–Fri 10am–5pm." },
      { property: "og:title", content: "Contact AUSVAPE CO — Support, WhatsApp & Melbourne Counter" },
      { property: "og:description", content: "Order, shipping and returns support with replies within one business day, plus our Melbourne CBD pickup counter." },
      { property: "og:url", content: "https://aus-vape.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://aus-vape.lovable.app/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "AUSVAPE CO",
          url: "https://aus-vape.lovable.app/contact",
          email: "support@ausvape.co",
          telephone: "+61400000000",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Level 3, 100 Flinders Ln",
            addressLocality: "Melbourne",
            addressRegion: "VIC",
            postalCode: "3000",
            addressCountry: "AU",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "10:00",
              closes: "17:00",
            },
          ],
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="px-4 md:px-8 pt-20 pb-8 border-b border-[#A9791F]/15">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 font-display font-black text-5xl md:text-6xl">Talk to a <span className="text-gold">person.</span></h1>
          <p className="mt-4 text-[color:var(--color-smoke)]">Replies within one business day, Mon–Fri.</p>
        </div>
      </section>
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-[#18181B] border border-[#A9791F]/15 rounded-lg p-8">
            <form className="grid sm:grid-cols-2 gap-4" onSubmit={e => e.preventDefault()}>
              <Field label="Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Subject" name="subject" className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="text-[10px] tracking-[0.35em] uppercase text-gold">Message</label>
                <textarea rows={5} className="mt-2 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 focus:border-[#F0CD6E] outline-none" />
              </div>
              <button className="sm:col-span-2 bg-gold text-[#0A0A0C] font-semibold py-3 rounded hover:shadow-[0_0_24px_rgba(240,205,110,0.4)] transition-shadow">
                Send Message
              </button>
            </form>
          </div>
          <aside className="space-y-6">
            <Card icon={<Mail className="w-4 h-4" />} title="Email" body={<a href="mailto:support@ausvape.co" className="text-gold">support@ausvape.co</a>} />
            <Card icon={<MessageCircle className="w-4 h-4" />} title="WhatsApp" body={<a href="#" className="text-gold">+61 400 000 000</a>} />
            <Card icon={<MapPin className="w-4 h-4" />} title="Melbourne Counter" body={<span className="text-[color:var(--color-smoke)]">Level 3, 100 Flinders Ln<br />Melbourne VIC 3000<br />Mon–Fri 10am–5pm</span>} />
          </aside>
        </div>
        <div className="max-w-6xl mx-auto mt-10 rounded-lg overflow-hidden border border-[#A9791F]/15 aspect-[16/6]">
          <iframe
            title="Melbourne map"
            src="https://www.google.com/maps?q=Flinders+Lane+Melbourne&output=embed"
            className="w-full h-full grayscale contrast-125"
            loading="lazy"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", className = "" }: { label: string; name: string; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-[10px] tracking-[0.35em] uppercase text-gold">{label}</label>
      <input name={name} type={type} className="mt-2 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 focus:border-[#F0CD6E] outline-none" />
    </div>
  );
}
function Card({ icon, title, body }: { icon: React.ReactNode; title: string; body: React.ReactNode }) {
  return (
    <div className="border border-[#A9791F]/20 rounded-lg p-6 bg-[#18181B]">
      <div className="flex items-center gap-2 text-gold">{icon}<span className="text-[10px] tracking-[0.35em] uppercase">{title}</span></div>
      <div className="mt-3">{body}</div>
    </div>
  );
}