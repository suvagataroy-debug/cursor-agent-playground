import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { medicalSidebar } from "@/components/sidebars";

export const metadata = { title: "Safety Boundaries — Medical Portal" };

const exclusions = [
  { name: "GLP-1 + Insulin Exclusion", code: "SAF-EXC-001", type: "Med + Med", typeClass: "badge-danger", medA: ["SEMA-*-PEN"], medB: ["INSULIN-*"], reason: "GLP-1 agonists should not be co-prescribed with insulin without specialist supervision", severity: "Hard Block" },
  { name: "Semaglutide + Biotin Supplement", code: "SAF-EXC-002", type: "Med + Supp", typeClass: "badge-warning", medA: ["SEMA-*-PEN"], medB: ["SUP-BIOTIN-*"], reason: "Biotin may interfere with blood test results used for GLP-1 monitoring", severity: "Soft Warning" },
  { name: "Finasteride + Saw Palmetto", code: "SAF-EXC-003", type: "Med + Supp", typeClass: "badge-warning", medA: ["FIN-*"], medB: ["SUP-SAWPALM-*"], reason: "Saw Palmetto has anti-androgenic properties that may compound with finasteride effects", severity: "Hard Block" },
  { name: "Sildenafil + Nitrate Supplements", code: "SAF-EXC-004", type: "Med + Supp", typeClass: "badge-warning", medA: ["SIL-*"], medB: ["SUP-NITRIC-*", "SUP-BEETROOT-*"], reason: "Nitric oxide boosters combined with PDE5 inhibitors can cause dangerous hypotension", severity: "Hard Block" },
  { name: "Sildenafil + Tadalafil Dual", code: "SAF-EXC-005", type: "Med + Med", typeClass: "badge-danger", medA: ["SIL-*"], medB: ["TAD-*"], reason: "Two PDE5 inhibitors must not be prescribed concurrently", severity: "Hard Block" },
  { name: "TRT + DHEA Supplement", code: "SAF-EXC-006", type: "Med + Supp", typeClass: "badge-warning", medA: ["TST-CYP-*"], medB: ["SUP-DHEA-*"], reason: "DHEA is a testosterone precursor — combined use raises hormonal excess risk", severity: "Hard Block" },
  { name: "GLP-1 + High-Dose Vitamin D", code: "SAF-EXC-007", type: "Med + Supp", typeClass: "badge-warning", medA: ["SEMA-*-PEN", "TIRZ-*-PEN"], medB: ["SUP-VITD-HIGH"], reason: "High-dose vitamin D with GLP-1 may elevate calcium — standard dose OK", severity: "Soft Warning" },
  { name: "Finasteride + Testosterone", code: "SAF-EXC-008", type: "Med + Med", typeClass: "badge-danger", medA: ["FIN-*"], medB: ["TST-CYP-*"], reason: "Finasteride inhibits DHT conversion — contradicts TRT objectives without specialist oversight", severity: "Soft Warning" },
];

const doseCeilings = [
  { med: "Semaglutide", single: "2.4mg", daily: "—", weekly: "2.4mg", override: "Clinical Director only", overrideClass: "badge-danger" },
  { med: "Tirzepatide", single: "15mg", daily: "—", weekly: "15mg", override: "Clinical Director only", overrideClass: "badge-danger" },
  { med: "Finasteride", single: "1mg", daily: "1mg", weekly: "—", override: "Senior Clinician", overrideClass: "badge-warning" },
  { med: "Sildenafil", single: "100mg", daily: "100mg", weekly: "—", override: "Senior Clinician", overrideClass: "badge-warning" },
  { med: "Testosterone Cypionate", single: "200mg", daily: "—", weekly: "200mg", override: "Clinical Director only", overrideClass: "badge-danger" },
];

export default function SafetyBoundariesPage() {
  return (
    <PortalLayout sidebar={medicalSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Medical Portal", href: "/medical/eligibility" }, { label: "Safety Boundaries" }]}
        actions={<><button className="btn btn-secondary btn-sm">Export Rules</button><button className="btn btn-primary btn-sm">+ New Exclusion Rule</button></>}
      />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>Safety Boundaries</h1>
            <p>Implement exclusion rules to prevent specific medications from being combined with certain add-on supplements or other treatments. These rules act as hard guardrails that the Offer Engine and Shipping Service must respect.</p>
          </div>
        </div>

        <div style={{ background: "var(--danger-light)", border: "1px solid #f5b7b1", borderRadius: 8, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>&#9888;</span>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <strong>Clinical Safety Override:</strong> These rules are enforced system-wide. When a medication-supplement exclusion is active, the Commercial Portal cannot include the excluded supplement as an add-on, and the Operations Portal cannot add it to a fulfilment manifest. Only medical directors can create or modify these rules.
          </div>
        </div>

        <div className="stat-cards">
          <div className="stat-card"><div className="stat-label">Active Exclusion Rules</div><div className="stat-value">14</div></div>
          <div className="stat-card"><div className="stat-label">Medication Combinations Blocked</div><div className="stat-value">8</div></div>
          <div className="stat-card"><div className="stat-label">Supplement Restrictions</div><div className="stat-value">6</div></div>
          <div className="stat-card"><div className="stat-label">Blocks Triggered (30d)</div><div className="stat-value text-danger">247</div><div className="stat-change">prevented at checkout/fulfilment</div></div>
        </div>

        <div className="tabs">
          <button className="tab active">All Rules</button>
          <button className="tab">Medication Exclusions</button>
          <button className="tab">Supplement Restrictions</button>
          <button className="tab">Combination Limits</button>
          <button className="tab">Dose Ceilings</button>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h3>Medication &amp; Supplement Exclusion Rules</h3></div>
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Rule Name</th><th>Code</th><th>Type</th><th>Medication (A)</th><th>Excluded Item (B)</th><th>Reason</th><th>Severity</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {exclusions.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td className="font-mono">{r.code}</td>
                      <td><span className={`badge ${r.typeClass}`}>{r.type}</span></td>
                      <td>{r.medA.map((m, j) => <span key={j} className="tag">{m}</span>)}</td>
                      <td>{r.medB.map((m, j) => <span key={j} className="tag">{m}</span>)}</td>
                      <td className="text-muted" style={{ fontSize: 12 }}>{r.reason}</td>
                      <td><span className={`badge ${r.severity === "Hard Block" ? "badge-danger" : "badge-warning"}`}>{r.severity}</span></td>
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
          <div className="card-header"><h3>Dose Ceiling Rules</h3><button className="btn btn-secondary btn-sm">+ Add Dose Ceiling</button></div>
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Medication</th><th>Max Single Dose</th><th>Max Daily Dose</th><th>Max Weekly Dose</th><th>Requires Override</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {doseCeilings.map((d, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{d.med}</td>
                      <td><strong>{d.single}</strong></td>
                      <td>{d.daily}</td>
                      <td>{d.weekly}</td>
                      <td><span className={`badge ${d.overrideClass}`}>{d.override}</span></td>
                      <td><span className="badge badge-success"><span className="status-dot active" />Active</span></td>
                      <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Create Exclusion Rule</h3></div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group"><label>Rule Name</label><input type="text" className="form-control" placeholder="e.g. Semaglutide + Iron Supplement" /></div>
              <div className="form-group"><label>Rule Code</label><input type="text" className="form-control font-mono" placeholder="e.g. SAF-EXC-009" /></div>
            </div>
            <div className="form-row-3">
              <div className="form-group"><label>Exclusion Type</label><select className="form-control"><option>Medication + Supplement</option><option>Medication + Medication</option><option>Supplement + Supplement</option><option>Category-wide restriction</option></select></div>
              <div className="form-group"><label>Severity</label><select className="form-control"><option>Hard Block — prevents combination entirely</option><option>Soft Warning — shows clinician warning, allows override</option></select><div className="help-text">Hard blocks cannot be overridden. Soft warnings require clinician sign-off.</div></div>
              <div className="form-group"><label>Override Authority</label><select className="form-control"><option>No override (Hard Block only)</option><option>Any Clinician</option><option>Senior Clinician</option><option>Clinical Director only</option></select></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Medication (Item A) — SKU Patterns</label><input type="text" className="form-control font-mono" placeholder="e.g. SEMA-*-PEN, TIRZ-*-PEN" /><div className="help-text">Comma-separated SKU patterns. Use * as wildcard.</div></div>
              <div className="form-group"><label>Excluded Item (Item B) — SKU Patterns</label><input type="text" className="form-control font-mono" placeholder="e.g. SUP-IRON-*, SUP-FERROUS-*" /><div className="help-text">SKU patterns that must NOT be combined with Item A.</div></div>
            </div>
            <div className="form-group"><label>Clinical Rationale</label><textarea className="form-control" rows={3} placeholder="Explain the medical reason for this exclusion." /></div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn btn-secondary">Cancel</button>
              <button className="btn btn-danger">Create Exclusion Rule</button>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
