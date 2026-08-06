import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track an order — AUSVAPE CO" },
      { name: "description", content: "Enter your AUSVAPE CO order reference to see bank transfer, packing and shipping status." },
      { property: "og:title", content: "Track an order — AUSVAPE CO" },
      { property: "og:description", content: "Enter your order reference to see live status updates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://aus-vape.lovable.app/track" }],
  }),
  component: Track,
});

function Track() {
  const navigate = useNavigate();
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");
  return (
    <SiteLayout>
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-md mx-auto">
          <Eyebrow>Order tracking</Eyebrow>
          <h1 className="mt-6 font-display font-black text-4xl">Track your <span className="text-gold">order.</span></h1>
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              const value = ref.trim().toUpperCase();
              if (!/^AV-[A-Z0-9]{8}$/.test(value)) { setError("Enter a reference like AV-4KD8XQ2M"); return; }
              setError("");
              navigate({ to: "/order/$reference", params: { reference: value } });
            }}
          >
            <label htmlFor="track-reference" className="text-xs text-[color:var(--color-smoke)]">Order reference</label>
            <input
              id="track-reference"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder="AV-XXXXXXXX"
              className="mt-1.5 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 focus:border-[#F0CD6E] outline-none"
            />
            {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
            <button className="mt-5 w-full bg-gold text-[#0A0A0C] font-semibold py-3.5 rounded">View status</button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
