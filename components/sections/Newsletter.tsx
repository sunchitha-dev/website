"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    gsap.to(formRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
        gsap.fromTo(
          successRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );
      },
    });
  };

  return (
    <section className="relative py-32 md:py-48">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <span className="text-[11px] tracking-[0.4em] uppercase text-amber-gold/60 block mb-6">
          Stay Connected
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-cream mb-6">
          Join the Inner Circle
        </h2>
        <p className="text-cream/40 mb-12 max-w-lg mx-auto">
          Be first to know about limited releases, exclusive roasts, and the
          stories behind every origin.
        </p>

        {!submitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              suppressHydrationWarning
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-3.5 bg-noir-800 border border-noir-700 text-cream placeholder:text-cream/30 text-sm tracking-wider focus:outline-none focus:border-amber-gold/40 transition-colors duration-300"
            />
            <MagneticButton className="px-8 py-3.5 bg-amber-gold text-noir-900 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-light transition-colors duration-300 whitespace-nowrap">
              Subscribe
            </MagneticButton>
          </form>
        ) : (
          <div ref={successRef} className="text-center">
            <p className="font-display text-2xl text-amber-gold mb-2">
              Welcome to the Circle
            </p>
            <p className="text-cream/40 text-sm">
              You&apos;ll hear from us before the next roast drops.
            </p>
          </div>
        )}

        <p className="text-[10px] text-cream/20 mt-6 tracking-wider">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  );
}
