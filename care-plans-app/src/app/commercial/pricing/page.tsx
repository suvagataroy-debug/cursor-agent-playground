"use client";
import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { commercialSidebar } from "@/components/sidebars";

export default function PricingPage() {
  const [mode, setMode] = useState<"scenario" | "user">("scenario");
  const [userId, setUserId] = useState("");

  return (
    <PortalLayout sidebar={commercialSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Commercial Portal", href: "/commercial/offers" }, { label: "Pricing Simulator" }]}
        actions={<button className="btn btn-secondary btn-sm">Price Simulator</button>}
      />
      <div className="content">
        <div className="page-header"><div><h1>Pricing Simulator</h1><p>Test how pricing resolves by scenario (Offer, Step, Promo) or by User ID. Configure offer-level pricing, including &ldquo;All-In&rdquo; fixed fees or &ldquo;Dynamic&rdquo; prices based on the sum of underlying SKUs.</p></div></div>

        <div className="card mb-4">
          <div className="card-header"><h3>Price Calculation Logic</h3></div>
          <div className="card-body">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" as const, padding: "16px 0" }}>
              {[
                { label: "Input 1", name: "SKU Base Price", sub: "from Catalog", border: "var(--border)", bg: "var(--bg)", color: "inherit" },
                null,
                { label: "Override", name: "Offer Price", sub: "from Offer Engine", border: "var(--primary)", bg: "var(--primary-light)", color: "var(--primary)" },
                { sep: "−" },
                { label: "Discount", name: "Promotion", sub: "from Promo Engine", border: "var(--warning)", bg: "var(--warning-light)", color: "var(--warning)" },
                null,
                { label: "Result", name: "Final Price", sub: "charged to patient", border: "var(--success)", bg: "var(--success-light)", color: "var(--success)" },
              ].map((item, i) => {
                if (!item) return <div key={i} style={{ fontSize: 22, color: "var(--text-muted)", padding: "0 10px" }}>&rarr;</div>;
                if ("sep" in item) return <div key={i} style={{ fontSize: 22, color: "var(--text-muted)", padding: "0 10px" }}>{item.sep}</div>;
                return (
                  <div key={i} style={{ padding: "14px 20px", borderRadius: 8, textAlign: "center" as const, minWidth: 140, border: `2px solid ${item.border}`, background: item.bg, color: item.color }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase" as const, letterSpacing: 0.5, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{item.name}</div>
                    <div style={{ fontSize: 12 }}>{item.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><span className="badge badge-primary" style={{ marginRight: 8 }}>Step 1</span><h3>Price Simulator</h3><span className="text-muted" style={{ fontSize: 12 }}>Test how pricing resolves for a specific scenario or by User ID</span></div>
          <div className="card-body">
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Mode</label>
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="radio" name="pricingMode" checked={mode === "scenario"} onChange={() => setMode("scenario")} />
                  <span>By scenario (Offer, Step, Promo)</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="radio" name="pricingMode" checked={mode === "user"} onChange={() => setMode("user")} />
                  <span>By user (User ID)</span>
                </label>
              </div>
            </div>
            {mode === "scenario" ? (
              <>
                <div className="form-row-3">
                  <div className="form-group"><label>Select Offer</label><select className="form-control"><option>OFR-WL-SEMA-6M-MTH — Semaglutide 6M Monthly</option><option>OFR-WL-SEMA-12M-FIX — Semaglutide 12M All-In</option><option>OFR-HL-FIN-1M-SUB — Finasteride Monthly</option></select></div>
                  <div className="form-group"><label>Current Titration Step</label><select className="form-control" defaultValue="Step 3"><option>Step 1 — 0.25mg</option><option>Step 2 — 0.5mg</option><option value="Step 3">Step 3 — 1.0mg</option><option>Step 4 — 1.7mg</option><option>Step 5 — 2.4mg</option></select></div>
                  <div className="form-group"><label>Promo Code (optional)</label><input type="text" className="form-control font-mono" defaultValue="WELCOME50" /></div>
                </div>
                <button className="btn btn-primary btn-sm" style={{ marginBottom: 16 }}>Calculate Price</button>
              </>
            ) : (
              <>
                <div className="form-group" style={{ maxWidth: 320, marginBottom: 16 }}>
                  <label>User ID</label>
                  <input type="text" className="form-control font-mono" placeholder="e.g. usr_abc123" value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>
                <button className="btn btn-primary btn-sm" style={{ marginBottom: 16 }}>Get price for user</button>
              </>
            )}
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: 20 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)", marginBottom: 12 }}>Simulation Result</h4>
              {mode === "user" && userId ? (
                <table><tbody>
                  <tr><td className="text-muted" style={{ width: 200 }}>User ID</td><td style={{ fontWeight: 500 }}>{userId}</td></tr>
                  <tr><td className="text-muted">Current Offer</td><td>Semaglutide — 6M Monthly Plan (OFR-WL-SEMA-6M-MTH)</td></tr>
                  <tr><td className="text-muted">Titration Step</td><td>Step 3 — 1.0mg (SEMA-100-PEN)</td></tr>
                  <tr><td className="text-muted">Next payment</td><td style={{ fontWeight: 600 }}>£229.00</td></tr>
                  <tr style={{ background: "#e6f4ea" }}><td style={{ fontWeight: 700 }}>Effective price for user</td><td style={{ fontWeight: 700, fontSize: 18, color: "var(--success)" }}>£229.00/month</td></tr>
                </tbody></table>
              ) : mode === "user" ? (
                <p className="text-muted">Enter a User ID and click &ldquo;Get price for user&rdquo; to see the resolved price.</p>
              ) : (
                <table><tbody>
                  <tr><td className="text-muted" style={{ width: 200 }}>Offer</td><td style={{ fontWeight: 500 }}>Semaglutide — 6M Monthly Plan</td></tr>
                  <tr><td className="text-muted">Titration Step</td><td>Step 3 — 1.0mg (SEMA-100-PEN)</td></tr>
                  <tr><td className="text-muted">SKU Base Price</td><td>£245.00</td></tr>
                  <tr><td className="text-muted">Offer Override Price</td><td>£229.00 <span className="text-success" style={{ fontSize: 12 }}>(-£16.00)</span></td></tr>
                  <tr><td className="text-muted">Promotion (WELCOME50)</td><td>-50% on first payment = <span className="text-danger">-£114.50</span></td></tr>
                  <tr style={{ background: "#e6f4ea" }}><td style={{ fontWeight: 700 }}>Final Price (1st payment)</td><td style={{ fontWeight: 700, fontSize: 18, color: "var(--success)" }}>£114.50</td></tr>
                  <tr><td className="text-muted">Subsequent Payments</td><td style={{ fontWeight: 500 }}>£229.00/month (at current dose)</td></tr>
                </tbody></table>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
