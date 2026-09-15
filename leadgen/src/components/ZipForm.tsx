"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { track } from "./Tracker";

export function ZipForm({ vertical, size = "lg", ctaLabel = "Get free quotes" }: { vertical: string; size?: "lg" | "md"; ctaLabel?: string }) {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [err, setErr] = useState<string | null>(null);
  return (
    <form
      className={`flex w-full max-w-md flex-col gap-2 sm:flex-row ${size === "lg" ? "" : "max-w-sm"}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\d{5}$/.test(zip)) { setErr("Enter your 5-digit ZIP code"); return; }
        track("zip_submit", { zip });
        router.push(`/quote/${vertical}?zip=${zip}`);
      }}
    >
      <label className="sr-only" htmlFor={`zip-${size}`}>ZIP code</label>
      <input
        id={`zip-${size}`}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={5}
        autoComplete="postal-code"
        placeholder="ZIP code"
        className={`input ${size === "lg" ? "text-lg" : ""}`}
        value={zip}
        onChange={(e) => { setZip(e.target.value.replace(/\D/g, "")); setErr(null); }}
        aria-invalid={!!err}
      />
      <button type="submit" className={`btn-primary whitespace-nowrap ${size === "lg" ? "text-lg" : ""}`}>{ctaLabel}</button>
      {err && <p className="text-sm text-bad sm:absolute sm:mt-14">{err}</p>}
    </form>
  );
}
