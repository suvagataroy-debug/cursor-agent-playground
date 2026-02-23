import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { operationsSidebar } from "@/components/sidebars";

export const metadata = { title: "Logistics Rules Engine — Operations Portal" };

const rules = [
  { name: "IF Injectable + First Order", code: "RULE-INJ-FIRST", condition: "Order = First & Med = Injectable", condClass: "badge-warning", skus: ["SEMA-*-PEN", "TST-CYP-*"], then: ["Sharps Bin", "Needles x4", "Swabs x10"] },
  { name: "IF Injectable + Refill", code: "RULE-INJ-REFILL", condition: "Order = Refill & Med = Injectable", condClass: "badge-info", skus: ["SEMA-*-PEN"], then: ["Needles x4", "Swabs x10"] },
  { name: "IF TRT + First Order", code: "RULE-TRT-FIRST", condition: "Order = First & Category = TRT", condClass: "badge-warning", skus: ["TST-CYP-*"], then: ["Sharps Bin", "Needles x8", "Swabs x20", "Bacteriostatic Water", "Multi-use Vial"] },
  { name: "IF TRT + Refill", code: "RULE-TRT-REFILL", condition: "Order = Refill & Category = TRT", condClass: "badge-info", skus: ["TST-CYP-*"], then: ["Needles x8", "Swabs x20"] },
  { name: "IF Oral Medication (any)", code: "RULE-ORAL-STD", condition: "Med = Oral tablet/capsule", condClass: "badge-info", skus: ["FIN-*", "SIL-*"], then: ["Medication only — no accessories"] },
  { name: "IF Hair Combo Plan", code: "RULE-HAIR-CMB", condition: "Protocol = CTP-HL-FINMNX-CMB", condClass: "badge-info", skus: ["FIN-1MG-90", "MNX-5PCT-60ML"], then: ["Finasteride 90 tabs", "Minoxidil x3 bottles"] },
];

export default function LogisticsRulesPage() {
  return (
    <PortalLayout sidebar={operationsSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Operations Portal", href: "/operations/catalog" }, { label: "Logistics Rules Engine" }]}
        actions={<button className="btn btn-primary btn-sm">+ New Inclusion Rule</button>}
      />
      <div className="content">
        <div className="page-header"><div><h1>Logistics Rules Engine</h1><p>Create automated inclusion rules that determine what gets packed with each shipment. E.g., &ldquo;If Medication = Injectable, then append SKU: Free Sharps Bin&rdquo; to the manifest.</p></div></div>

        <div className="card mb-4">
          <div className="card-header"><h3>Automated Inclusion Rules</h3></div>
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Rule Name</th><th>Code</th><th>Condition (IF)</th><th>Applies To SKU</th><th>Then Append (THEN)</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {rules.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td className="font-mono">{r.code}</td>
                      <td><span className={`badge ${r.condClass}`}>{r.condition}</span></td>
                      <td>{r.skus.map((s, j) => <span key={j} className="tag">{s}</span>)}</td>
                      <td>{r.then.map((t, j) => <span key={j} className="tag">{t}</span>)}</td>
                      <td><span className="badge badge-success"><span className="status-dot active" />Active</span></td>
                      <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h3>Rule Editor — IF Injectable + First Order, THEN Append:</h3><button className="btn btn-secondary btn-sm">+ Add Item to Rule</button></div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group"><label>Rule Name</label><input type="text" className="form-control" defaultValue="IF Injectable + First Order" /></div>
              <div className="form-group"><label>Rule Code</label><input type="text" className="form-control font-mono" defaultValue="RULE-INJ-FIRST" /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Condition (IF)</label><select className="form-control"><option>Order = First AND Medication Type = Injectable</option><option>Order = Any AND Medication Type = Injectable</option><option>Order = Refill AND Medication Type = Injectable</option><option>Category = TRT AND Order = First</option><option>Custom condition...</option></select></div>
              <div className="form-group"><label>Applies to SKU Pattern</label><input type="text" className="form-control font-mono" defaultValue="SEMA-*-PEN, TST-CYP-*" /><div className="help-text">Comma-separated SKU patterns. Use * as wildcard.</div></div>
            </div>
            <div className="separator" />
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)" }}>THEN Append to Manifest</h4>
            <table>
              <thead><tr><th>Item</th><th>SKU</th><th>Quantity</th><th>Type</th><th>Cost to Patient</th><th>Notes</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  { item: "Sharps Bin (1L)", sku: "ACC-SHARPS-1L", qty: 1, note: "Required by law for injectable medications" },
                  { item: "Injection Needles", sku: "ACC-NEEDLES-4", qty: 4, note: "1 needle per injection per cycle" },
                  { item: "Alcohol Swabs", sku: "ACC-SWABS-10", qty: 10, note: "For injection site preparation" },
                ].map((a, i) => (
                  <tr key={i}><td style={{ fontWeight: 500 }}>{a.item}</td><td className="font-mono">{a.sku}</td><td>{a.qty}</td><td><span className="tag">Accessory</span></td><td><span className="badge badge-success">Free</span></td><td className="text-muted" style={{ fontSize: 12 }}>{a.note}</td><td><button className="btn btn-ghost btn-sm">Remove</button></td></tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 20 }}><button className="btn btn-secondary">Cancel</button><button className="btn btn-primary">Save Rule</button></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Shipment Manifest Preview</h3></div>
          <div className="card-body">
            <div className="form-row-3 mb-3">
              <div className="form-group"><label>Offer</label><select className="form-control"><option>OFR-WL-SEMA-6M-MTH</option><option>OFR-TRT-CYP-HCG-SUB</option></select></div>
              <div className="form-group"><label>Titration Step</label><select className="form-control" defaultValue="3"><option value="1">Step 1 — 0.25mg</option><option value="3">Step 3 — 1.0mg</option><option value="5">Step 5 — 2.4mg</option></select></div>
              <div className="form-group"><label>Order Type</label><select className="form-control" defaultValue="Refill"><option>First Order</option><option value="Refill">Refill</option></select></div>
            </div>
            <button className="btn btn-primary btn-sm" style={{ marginBottom: 16 }}>Generate Manifest</button>
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: 20 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)", marginBottom: 12 }}>Manifest — Refill Order (Step 3)</h4>
              <table>
                <thead><tr><th>#</th><th>Item</th><th>SKU</th><th>Qty</th><th>Source</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td style={{ fontWeight: 600 }}>Semaglutide 1.0mg Pen</td><td className="font-mono">SEMA-100-PEN</td><td>1</td><td><span className="badge badge-primary">Treatment Plan</span></td></tr>
                  <tr><td>2</td><td>Injection Needles (x4)</td><td className="font-mono">ACC-NEEDLES-4</td><td>1 pack</td><td><span className="tag">Rule: RULE-INJ-REFILL</span></td></tr>
                  <tr><td>3</td><td>Alcohol Swabs (x10)</td><td className="font-mono">ACC-SWABS-10</td><td>1 pack</td><td><span className="tag">Rule: RULE-INJ-REFILL</span></td></tr>
                </tbody>
              </table>
              <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-secondary)" }}><strong>Shipping:</strong> DPD Next-Day Cold &middot; <strong>Est. Weight:</strong> 95g &middot; <strong>Storage:</strong> Cold chain (2-8&deg;C)</div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
