import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(3, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Please add a few more details").max(1000),
});

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const { name, email, subject, message } = parsed.data;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:support@ausvape.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    e.currentTarget.reset();
  }

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
            {sent && (
              <div role="status" className="mb-6 flex items-start gap-3 rounded border border-[#A9791F]/30 bg-[#0A0A0C] p-4 text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold mt-0.5" aria-hidden="true" />
                <span>
                  Your message is ready in your email app addressed to{" "}
                  <a href="mailto:support@ausvape.co" className="text-gold">support@ausvape.co</a>. Send it and we'll reply within one business day.
                </span>
              </div>
            )}
            <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleSubmit} noValidate>
              <Field label="Name" name="name" error={errors['name']} />
              <Field label="Email" name="email" type="email" error={errors['email']} />
              <Field label="Subject" name="subject" className="sm:col-span-2" error={errors['subject']} />
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="text-[10px] tracking-[0.35em] uppercase text-gold">Message</label>
                <textarea id="contact-message" name="message" rows={5} className="mt-2 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 focus:border-[#F0CD6E] outline-none" />
                {errors['message'] && <p className="mt-1.5 text-xs text-red-400">{errors['message']}</p>}
              </div>
              <button className="sm:col-span-2 bg-gold text-[#0A0A0C] font-semibold py-3 rounded hover:shadow-[0_0_24px_rgba(240,205,110,0.4)] transition-shadow">
                Send Message
              </button>
            </form>
          </div>
          <aside className="space-y-6">
            <Card icon={<Mail className="w-4 h-4" aria-hidden="true" />} title="Email" body={<a href="mailto:support@ausvape.co" aria-label="Email AUSVAPE CO support at support@ausvape.co" className="text-gold">support@ausvape.co</a>} />
            <Card icon={<Clock className="w-4 h-4" aria-hidden="true" />} title="Support Hours" body={<span className="text-[color:var(--color-smoke)]">Mon–Fri 10am–5pm AEST<br />Replies within one business day</span>} />
            <Card icon={<MapPin className="w-4 h-4" aria-hidden="true" />} title="Melbourne Counter" body={<span className="text-[color:var(--color-smoke)]">Level 3, 100 Flinders Ln<br />Melbourne VIC 3000<br />Mon–Fri 10am–5pm</span>} />
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

function Field({ label, name, type = "text", className = "", error }: { label: string; name: string; type?: string; className?: string; error?: string }) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${name}`} className="text-[10px] tracking-[0.35em] uppercase text-gold">{label}</label>
      <input id={`contact-${name}`} name={name} type={type} aria-invalid={!!error} className="mt-2 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 focus:border-[#F0CD6E] outline-none" />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
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