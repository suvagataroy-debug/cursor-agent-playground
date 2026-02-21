import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { commercialSidebar } from "@/components/sidebars";

export const metadata = { title: "Promotion Manager — Commercial Portal" };

const promos = [
  { name: "Welcome Offer — 50% Off", sub: "First month 50% discount for new patients", code: "WELCOME50", type: "Coupon", typeClass: "badge-primary", discount: "50% off first payment", applies: ["OFR-WL-SEMA-*", "OFR-WL-TIRZ-*"], validity: "1 Jan — 31 Mar 2026", usage: "1,420 / 5,000", pct: 28, active: true },
  { name: "Referral Credit", sub: "£20 credit for referrer and referee", code: "REFER20", type: "Referral", typeClass: "badge-warning", discount: "£20 off next payment", applies: ["OFR-*"], validity: "Ongoing", usage: "842 / unlimited", pct: 0, active: true },
  { name: "First Month Free — Hair", sub: "Automated: free first month on hair plans", code: "AUTO-HAIR-1STFREE", type: "Auto-Rule", typeClass: "badge-info", discount: "100% off first payment", applies: ["OFR-HL-*"], validity: "1 Feb — 28 Feb 2026", usage: "580 / 1,000", pct: 58, active: true },
  { name: "NHS20 Discount", sub: "20% off for NHS workers", code: "NHS20", type: "Coupon", typeClass: "badge-primary", discount: "20% off all payments", applies: ["OFR-*"], validity: "Ongoing", usage: "312 / unlimited", pct: 0, active: true },
  { name: "Black Friday 2025", sub: "30% off 12-month plans", code: "BF2025", type: "Coupon", typeClass: "badge-primary", discount: "30% off first 3 payments", applies: ["OFR-*-12M-*"], validity: "25 Nov — 2 Dec 2025", usage: "2,100 / 2,100", pct: 100, active: false },
];

export default function PromotionsPage() {
  return (
    <PortalLayout sidebar={commercialSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Commercial Portal", href: "/commercial/offers" }, { label: "Promotion Manager" }]}
        actions={<button className="btn btn-primary btn-sm">+ New Promotion</button>}
      />
      <div className="content">
        <div className="page-header"><div><h1>Promotion Manager</h1><p>Create and link coupon codes or referral credits directly to specific Offer IDs rather than individual items.</p></div></div>

        <div className="stat-cards">
          <div className="stat-card"><div className="stat-label">Active Promotions</div><div className="stat-value">8</div></div>
          <div className="stat-card"><div className="stat-label">Total Redemptions (30d)</div><div className="stat-value">3,842</div><div className="stat-change up">+22% vs prev period</div></div>
          <div className="stat-card"><div className="stat-label">Discount Given (30d)</div><div className="stat-value">£187K</div></div>
          <div className="stat-card"><div className="stat-label">Conversion Lift</div><div className="stat-value">+18%</div><div className="stat-change">on promoted offers</div></div>
        </div>

        <div className="tabs">
          <button className="tab active">All Promotions</button>
          <button className="tab">Coupon Codes</button>
          <button className="tab">Referral Credits</button>
          <button className="tab">Automated Rules</button>
          <button className="tab">Expired</button>
        </div>

        <div className="card mb-4">
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Promotion</th><th>Code</th><th>Type</th><th>Discount</th><th>Linked Offer IDs</th><th>Validity</th><th>Usage</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {promos.map((p, i) => (
                    <tr key={i}>
                      <td><div style={{ fontWeight: 600 }}>{p.name}</div><div className="text-muted" style={{ fontSize: 12 }}>{p.sub}</div></td>
                      <td className="font-mono">{p.code}</td>
                      <td><span className={`badge ${p.typeClass}`}>{p.type}</span></td>
                      <td><strong>{p.discount}</strong></td>
                      <td>{p.applies.map((a, j) => <span key={j} className="tag">{a}</span>)}</td>
                      <td><div style={{ fontSize: 12 }}>{p.validity}</div></td>
                      <td>
                        <div>{p.usage}</div>
                        {p.pct > 0 && <div style={{ background: "#e8eaed", borderRadius: 4, height: 4, marginTop: 4 }}><div style={{ background: p.active ? "var(--primary)" : "var(--text-muted)", borderRadius: 4, height: 4, width: `${p.pct}%` }} /></div>}
                      </td>
                      <td>{p.active ? <span className="badge badge-success"><span className="status-dot active" />Active</span> : <span className="badge badge-info"><span className="status-dot inactive" />Expired</span>}</td>
                      <td>{p.active ? <><button className="btn btn-ghost btn-sm">Edit</button><button className="btn btn-ghost btn-sm">Pause</button></> : <button className="btn btn-ghost btn-sm">Clone</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Create Promotion</h3></div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group"><label>Promotion Name</label><input type="text" className="form-control" placeholder="e.g. Spring Sale 2026" /></div>
              <div className="form-group"><label>Coupon Code</label><input type="text" className="form-control font-mono" placeholder="e.g. SPRING2026" /></div>
            </div>
            <div className="form-row-3">
              <div className="form-group"><label>Promotion Type</label><select className="form-control"><option>Coupon Code</option><option>Referral Credit</option><option>Automated Rule</option></select></div>
              <div className="form-group"><label>Discount Type</label><select className="form-control"><option>Percentage off</option><option>Fixed amount off</option><option>Free period</option></select></div>
              <div className="form-group"><label>Discount Value</label><div style={{ display: "flex", gap: 8 }}><input type="number" className="form-control" placeholder="50" style={{ width: 80 }} /><select className="form-control" style={{ width: 80 }}><option>%</option><option>£</option></select></div></div>
            </div>
            <div className="form-group">
              <label>Link to Offer IDs</label>
              <select className="form-control" multiple style={{ minHeight: 80 }}>
                <option>OFR-* (All Offer IDs)</option>
                <option>OFR-WL-SEMA-6M-MTH — Semaglutide 6M Monthly</option>
                <option>OFR-WL-SEMA-12M-FIX — Semaglutide 12M All-In</option>
                <option>OFR-HL-FIN-1M-SUB — Finasteride Monthly</option>
                <option>OFR-TRT-CYP-HCG-SUB — TRT Membership</option>
              </select>
              <div className="help-text">Promotions are linked directly to specific Offer IDs, not individual items.</div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}><button className="btn btn-secondary">Cancel</button><button className="btn btn-primary">Create Promotion</button></div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
