import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { commercialSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "Add-on Configuration — Commercial Portal" };

const addons = [
  { name: "Vitamin B12 (1000mcg)", sku: "SUP-B12-30", type: "Supplement", typeClass: "badge badge-warning", mode: "Optional", modeClass: "badge-info", offers: ["OFR-WL-SEMA-*", "OFR-WL-TIRZ-*"], price: "£9.99/mo", safety: "Passed", safetyClass: "badge-success", rate: "42%" },
  { name: "Multivitamin Complex", sku: "SUP-MULTI-30", type: "Supplement", typeClass: "badge badge-warning", mode: "Optional", modeClass: "badge-info", offers: ["All offers"], price: "£7.99/mo", safety: "Passed", safetyClass: "badge-success", rate: "28%" },
  { name: "Blood Test Kit — Baseline", sku: "SVC-BLOODTEST-BASE", type: "Service", typeClass: "badge badge-primary", mode: "Mandatory", modeClass: "badge-danger", offers: ["OFR-TRT-*"], price: "Included", safety: "Passed", safetyClass: "badge-success", rate: "100%" },
  { name: "6-Week Blood Test", sku: "SVC-BLOODTEST-6W", type: "Service", typeClass: "badge badge-primary", mode: "Mandatory", modeClass: "badge-danger", offers: ["OFR-TRT-*"], price: "Included", safety: "Passed", safetyClass: "badge-success", rate: "100%" },
  { name: "Clinician Video Call", sku: "SVC-VIDCALL-15", type: "Service", typeClass: "badge badge-primary", mode: "Optional", modeClass: "badge-info", offers: ["All offers"], price: "£29.00", safety: "Passed", safetyClass: "badge-success", rate: "8%" },
  { name: "Sharps Bin (1L)", sku: "ACC-SHARPS-1L", type: "Accessory", typeClass: "tag", mode: "Mandatory", modeClass: "badge-danger", offers: ["OFR-WL-SEMA-*", "OFR-TRT-*"], price: "Free", safety: "Passed", safetyClass: "badge-success", rate: "100%" },
  { name: "Derma Roller (Hair)", sku: "ACC-DERMAROLL-1", type: "Accessory", typeClass: "tag", mode: "Optional", modeClass: "badge-info", offers: ["OFR-HL-*"], price: "£14.99", safety: "Passed", safetyClass: "badge-success", rate: "22%" },
  { name: "Saw Palmetto Extract", sku: "SUP-SAWPALM-60", type: "Supplement", typeClass: "badge badge-warning", mode: "Optional", modeClass: "badge-info", offers: ["OFR-HL-*"], price: "£11.99/mo", safety: "Blocked by SAF-EXC-003", safetyClass: "badge-danger", rate: "—", blocked: true },
];

export default function AddonsPage() {
  return (
    <PortalLayout sidebar={commercialSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Commercial Portal", href: "/commercial/offers" }, { label: "Add-on Configuration" }]}
        actions={<button className="btn btn-primary btn-sm">+ New Add-on</button>}
      />
      <div className="content">
        <div className="page-header"><div><h1>Add-on Configuration</h1><p>Tag supplementary items (vitamins, accessories, services) as mandatory or optional additions to commercial offers. Add-ons are subject to Safety Boundary rules from the Medical Portal.</p></div></div>

        <div style={{ background: "var(--primary-light)", border: "1px solid #c5d9f7", borderRadius: 8, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>&#9432;</span>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}><strong>Safety-Aware:</strong> Add-ons configured here are validated against the <Link href="/medical/safety-boundaries">Medical Portal&apos;s Safety Boundaries</Link> before being shown to patients. If an exclusion rule blocks a supplement with a medication, that add-on will be automatically hidden from the offer.</div>
        </div>

        <div className="stat-cards">
          <div className="stat-card"><div className="stat-label">Total Add-ons</div><div className="stat-value">12</div></div>
          <div className="stat-card"><div className="stat-label">Mandatory</div><div className="stat-value">3</div></div>
          <div className="stat-card"><div className="stat-label">Optional</div><div className="stat-value">9</div></div>
          <div className="stat-card"><div className="stat-label">Add-on Attach Rate</div><div className="stat-value">34%</div><div className="stat-change up">+5% this month</div></div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h3>Add-on Items</h3></div>
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Add-on Name</th><th>SKU</th><th>Type</th><th>Inclusion Mode</th><th>Linked Offer IDs</th><th>Price</th><th>Safety Check</th><th>Attach Rate</th><th>Actions</th></tr></thead>
                <tbody>
                  {addons.map((a, i) => (
                    <tr key={i} style={a.blocked ? { background: "#fef7e0" } : {}}>
                      <td style={{ fontWeight: 600 }}>{a.name}</td>
                      <td className="font-mono">{a.sku}</td>
                      <td><span className={a.typeClass}>{a.type}</span></td>
                      <td><span className={`badge ${a.modeClass}`}>{a.mode}</span></td>
                      <td>{a.offers.map((o, j) => <span key={j} className="tag">{o}</span>)}</td>
                      <td>{a.price}</td>
                      <td><span className={`badge ${a.safetyClass}`}>{a.safety}</span></td>
                      <td>{a.rate}</td>
                      <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Configure Add-on</h3></div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group"><label>Add-on Name</label><input type="text" className="form-control" defaultValue="Vitamin B12 (1000mcg)" /></div>
              <div className="form-group"><label>SKU</label><select className="form-control"><option>SUP-B12-30 — Vitamin B12 1000mcg x30</option><option>SUP-MULTI-30 — Multivitamin x30</option><option>ACC-DERMAROLL-1 — Derma Roller</option></select></div>
            </div>
            <div className="form-group">
              <label>Inclusion Mode</label>
              <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 14, border: "2px solid var(--border)", borderRadius: 8, cursor: "pointer", flex: 1 }}><input type="radio" name="inclusion" style={{ marginTop: 2 }} /><div><div style={{ fontWeight: 600 }}>Mandatory</div><div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Always included, patient cannot remove</div></div></label>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 14, border: "2px solid var(--primary)", borderRadius: 8, cursor: "pointer", flex: 1, background: "var(--primary-light)" }}><input type="radio" name="inclusion" defaultChecked style={{ marginTop: 2 }} /><div><div style={{ fontWeight: 600 }}>Optional</div><div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Patient can add/remove during checkout</div></div></label>
              </div>
            </div>
            <div className="form-group">
              <label>Link to Offer IDs</label>
              <select className="form-control" multiple style={{ minHeight: 80 }}><option>OFR-WL-SEMA-6M-MTH — Semaglutide 6M Monthly</option><option>OFR-WL-SEMA-12M-FIX — Semaglutide 12M All-In</option><option>OFR-HL-FIN-1M-SUB — Finasteride Monthly</option><option>OFR-TRT-CYP-HCG-SUB — TRT Membership</option></select>
              <div className="help-text">Select which Offer IDs this add-on is available for.</div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}><button className="btn btn-secondary">Cancel</button><button className="btn btn-primary">Save Add-on</button></div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
