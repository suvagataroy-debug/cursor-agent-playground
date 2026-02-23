import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { commercialSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "Offer Builder — Commercial Portal" };

export default function OfferDetailPage() {
  return (
    <PortalLayout sidebar={commercialSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Offer Builder", href: "/commercial/offers" }, { label: "Semaglutide — 6M Monthly" }]}
        actions={<><button className="btn btn-secondary btn-sm">Preview</button><button className="btn btn-secondary btn-sm">Duplicate</button><button className="btn btn-primary btn-sm">Save &amp; Publish</button></>}
      />
      <div className="content">
        <div className="page-header">
          <div><h1>Offer Builder</h1><p>Configure a commercial offer by linking a clinical treatment plan to a billing plan, setting pricing model, and defining included items.</p></div>
          <span className="badge badge-success" style={{ fontSize: 13, padding: "6px 14px" }}><span className="status-dot active" />Live</span>
        </div>
        <div className="detail-layout">
          <div>
            <div className="card mb-4">
              <div className="card-header"><h3>Offer Configuration</h3></div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group"><label>Offer Name</label><input type="text" className="form-control" defaultValue="Semaglutide — 6M Monthly Plan" /></div>
                  <div className="form-group"><label>Offer Code</label><input type="text" className="form-control font-mono" defaultValue="OFR-WL-SEMA-6M-MTH" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Category</label><select className="form-control" defaultValue="Weight Loss"><option>Weight Loss</option><option>Hair</option><option>ED</option><option>TRT</option></select></div>
                  <div className="form-group"><label>Channel</label><select className="form-control" defaultValue="JoinVoy"><option>JoinVoy</option><option>Manual.co</option><option>NHS Partnership</option><option>Whitelabel</option></select></div>
                </div>
                <div className="form-group"><label>Description</label><textarea className="form-control" rows={2} defaultValue="Pay monthly for your Semaglutide treatment. 6-month minimum commitment with dynamic pricing based on your current titration dose." /></div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h3>Clinical Treatment Plan Link</h3></div>
              <div className="card-body">
                <div style={{ background: "var(--success-light)", border: "1px solid #b7dfca", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>Semaglutide Standard Titration</div>
                      <div className="text-muted" style={{ fontSize: 12 }}>CTP-WL-SEMA-STD &middot; 5 titration steps &middot; 0.25mg &rarr; 2.4mg</div>
                    </div>
                    <button className="btn btn-secondary btn-sm">Change Plan</button>
                  </div>
                </div>
                <div className="help-text">This offer is commercially linked to the above clinical protocol. The treatment plan defines the medical pathway; this offer defines how the patient pays for it.</div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h3>Billing Plan</h3></div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group"><label>Billing Plan</label>
                    <select className="form-control" defaultValue="6M-MONTHLY">
                      <option value="1M-RECURRING">1M-RECURRING (Monthly, no commitment)</option>
                      <option value="3M-MONTHLY">3M-MONTHLY (3-month, paid monthly)</option>
                      <option value="6M-MONTHLY">6M-MONTHLY (6-month, paid monthly)</option>
                      <option value="12M-MONTHLY">12M-MONTHLY (12-month, paid monthly)</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Payment Frequency</label><select className="form-control"><option>Every 4 weeks</option><option>Monthly (calendar)</option><option>One-off</option></select></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Commitment Length</label><div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="number" className="form-control" defaultValue={6} style={{ width: 80 }} /><span>months</span></div></div>
                  <div className="form-group"><label>Auto-Renew</label><div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}><label className="form-switch"><input type="checkbox" defaultChecked /><span className="slider" /></label><span style={{ fontSize: 13 }}>Auto-renew after commitment ends</span></div></div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h3>Pricing Model</h3></div>
              <div className="card-body">
                <div className="form-group">
                  <label>Pricing Type</label>
                  <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 16, border: "2px solid var(--primary)", borderRadius: 8, cursor: "pointer", flex: 1, background: "var(--primary-light)" }}>
                      <input type="radio" name="pricing" defaultChecked style={{ marginTop: 2 }} />
                      <div><div style={{ fontWeight: 600 }}>Dynamic Pricing</div><div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Price changes based on the patient&apos;s current titration step.</div></div>
                    </label>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 16, border: "2px solid var(--border)", borderRadius: 8, cursor: "pointer", flex: 1 }}>
                      <input type="radio" name="pricing" style={{ marginTop: 2 }} />
                      <div><div style={{ fontWeight: 600 }}>All-In (Fixed)</div><div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Same price regardless of titration step.</div></div>
                    </label>
                  </div>
                </div>
                <div className="separator" />
                <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)" }}>Dynamic Price per Titration Step</h4>
                <table>
                  <thead><tr><th>Step</th><th>SKU</th><th>Dose</th><th>SKU Base Price</th><th>Offer Override</th><th>Final Price</th></tr></thead>
                  <tbody>
                    {[
                      { step: 1, sku: "SEMA-025-PEN", dose: "0.25mg", base: "£165.00", override: "149.00", final: "£149.00" },
                      { step: 2, sku: "SEMA-050-PEN", dose: "0.5mg", base: "£195.00", override: "179.00", final: "£179.00" },
                      { step: 3, sku: "SEMA-100-PEN", dose: "1.0mg", base: "£245.00", override: "229.00", final: "£229.00" },
                      { step: 4, sku: "SEMA-170-PEN", dose: "1.7mg", base: "£275.00", override: "259.00", final: "£259.00" },
                      { step: 5, sku: "SEMA-240-PEN", dose: "2.4mg", base: "£320.00", override: "299.00", final: "£299.00" },
                    ].map((s) => (
                      <tr key={s.step}><td>{s.step}</td><td className="font-mono">{s.sku}</td><td>{s.dose}</td><td className="text-muted">{s.base}</td><td><input type="text" className="form-control" defaultValue={s.override} style={{ width: 100, padding: "4px 8px" }} /></td><td><strong>{s.final}</strong></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3>Included Items &amp; Add-ons</h3><Link href="/commercial/addons" className="btn btn-secondary btn-sm">+ Add Item</Link></div>
              <div className="card-body-flush">
                <table>
                  <thead><tr><th>Item</th><th>SKU</th><th>Type</th><th>Frequency</th><th>Included in Price</th><th>Actions</th></tr></thead>
                  <tbody>
                    {[
                      { item: "Semaglutide Pen (current dose)", sku: "SEMA-*-PEN", type: "Medication", typeClass: "badge badge-primary", freq: "Every shipment", included: true },
                      { item: "Alcohol Swabs (x10)", sku: "ACC-SWABS-10", type: "Accessory", typeClass: "tag", freq: "Every shipment", included: true },
                      { item: "Sharps Bin", sku: "ACC-SHARPS-1L", type: "Accessory", typeClass: "tag", freq: "First order only", included: true },
                      { item: "Needles (x4)", sku: "ACC-NEEDLES-4", type: "Accessory", typeClass: "tag", freq: "Every shipment", included: true },
                      { item: "Vitamin B12 Supplement", sku: "SUP-B12-30", type: "Add-on", typeClass: "badge badge-warning", freq: "Every shipment", included: false, price: "+£9.99" },
                    ].map((itm, i) => (
                      <tr key={i}><td style={{ fontWeight: 500 }}>{itm.item}</td><td className="font-mono">{itm.sku}</td><td><span className={itm.typeClass}>{itm.type}</span></td><td>{itm.freq}</td><td>{itm.included ? <span className="badge badge-success">Yes</span> : <span className="badge badge-info">Optional {itm.price}</span>}</td><td><button className="btn btn-ghost btn-sm">Remove</button></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <div className="card mb-4">
              <div className="card-header"><h3>Offer Summary</h3></div>
              <div className="card-body">
                <div style={{ fontSize: 13 }}>
                  {[["Category", <span key="c" className="badge badge-primary">Weight Loss</span>], ["Treatment", <strong key="t">Semaglutide</strong>], ["Commitment", <strong key="co">6 months</strong>], ["Payment", <strong key="p">Every 4 weeks</strong>], ["Pricing", <span key="pr" className="badge badge-primary">Dynamic</span>], ["Price Range", <strong key="r">£149 – £299/mo</strong>], ["Included Items", <strong key="i">4 + 1 optional</strong>]].map(([label, val], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 6 ? "1px solid #f0f0f0" : "none" }}><span className="text-muted">{label}</span>{val}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header"><h3>Offer Lifecycle States</h3></div>
              <div className="card-body">
                <div className="step-list">
                  {[{ t: "Draft", m: "Configuration in progress", done: true }, { t: "Pending Clinical Approval", m: "Treatment plan link verified", done: true }, { t: "Live", m: "Visible to eligible patients", done: false, highlight: true }, { t: "Paused", m: "Temporarily hidden from new patients" }, { t: "Archived", m: "No longer available, existing subs continue" }].map((s, i) => (
                    <div className={`step-item ${s.done ? "completed" : ""}`} key={i}>
                      <div className="step-title" style={s.highlight ? { color: "var(--success)", fontWeight: 700 } : {}}>{s.t}</div>
                      <div className="step-meta">{s.m}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3>Active Promotions</h3></div>
              <div className="card-body-flush">
                <table><tbody>
                  <tr><td><div style={{ fontWeight: 500 }}>WELCOME50</div><div className="text-muted" style={{ fontSize: 12 }}>50% off first month</div></td><td><span className="badge badge-success">Active</span></td></tr>
                  <tr><td><div style={{ fontWeight: 500 }}>REFER20</div><div className="text-muted" style={{ fontSize: 12 }}>£20 off for referrals</div></td><td><span className="badge badge-success">Active</span></td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
