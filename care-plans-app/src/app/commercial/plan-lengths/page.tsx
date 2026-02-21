import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { commercialSidebar } from "@/components/sidebars";

export const metadata = { title: "Plan Lengths — Commercial Portal" };

const plans = [
  { name: "Monthly Recurring", code: "1M-RECURRING", dur: "No commitment", type: "Recurring", typeClass: "badge-primary", cycle: "Every 4 weeks", renew: true, offers: 6 },
  { name: "3-Month Monthly", code: "3M-MONTHLY", dur: "3 months", type: "Recurring", typeClass: "badge-primary", cycle: "Every 4 weeks", renew: true, offers: 4 },
  { name: "6-Month Monthly", code: "6M-MONTHLY", dur: "6 months", type: "Recurring", typeClass: "badge-primary", cycle: "Every 4 weeks", renew: true, offers: 5 },
  { name: "12-Month Monthly", code: "12M-MONTHLY", dur: "12 months", type: "Recurring", typeClass: "badge-primary", cycle: "Every 4 weeks", renew: true, offers: 3 },
  { name: "3-Month Upfront", code: "3M-ONEOFF", dur: "3 months", type: "One-off", typeClass: "badge-info", cycle: "Single payment", renew: false, offers: 2 },
  { name: "6-Month Upfront", code: "6M-ONEOFF", dur: "6 months", type: "One-off", typeClass: "badge-info", cycle: "Single payment", renew: false, offers: 1 },
  { name: "Quarterly Recurring", code: "3M-RECURRING", dur: "No commitment", type: "Recurring", typeClass: "badge-primary", cycle: "Every 12 weeks", renew: true, offers: 3 },
];

export default function PlanLengthsPage() {
  return (
    <PortalLayout sidebar={commercialSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Commercial Portal", href: "/commercial/offers" }, { label: "Plan Lengths" }]}
        actions={<button className="btn btn-primary btn-sm">+ New Billing Plan</button>}
      />
      <div className="content">
        <div className="page-header"><div><h1>Plan Lengths</h1><p>Define the commercial commitment durations — 3, 6, or 12-month subscriptions — with payment frequency and recurring cycles. Plan lengths are independent of clinical protocols and consumption rates.</p></div></div>

        <div style={{ background: "var(--primary-light)", border: "1px solid #c5d9f7", borderRadius: 8, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>&#9432;</span>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}><strong>Delinked from Clinical Plans:</strong> Billing plans define how the patient pays (duration, frequency). They do NOT dictate what medication is sent or when — that&apos;s governed by the Clinical Treatment Plan and Consumption Rate.</div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h3>All Billing Plans</h3></div>
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Plan Name</th><th>Code</th><th>Duration</th><th>Payment Type</th><th>Billing Cycle</th><th>Auto-Renew</th><th>Used By Offers</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {plans.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td className="font-mono">{p.code}</td>
                      <td>{p.dur}</td>
                      <td><span className={`badge ${p.typeClass}`}>{p.type}</span></td>
                      <td>{p.cycle}</td>
                      <td><label className="form-switch"><input type="checkbox" defaultChecked={p.renew} /><span className="slider" /></label></td>
                      <td>{p.offers}</td>
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
          <div className="card-header"><h3>Create / Edit Billing Plan</h3></div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group"><label>Plan Name</label><input type="text" className="form-control" placeholder="e.g. 6-Month Monthly" /></div>
              <div className="form-group"><label>Plan Code</label><input type="text" className="form-control font-mono" placeholder="e.g. 6M-MONTHLY" /></div>
            </div>
            <div className="form-row-3">
              <div className="form-group"><label>Commitment Duration</label><div style={{ display: "flex", gap: 8 }}><input type="number" className="form-control" placeholder="6" style={{ width: 80 }} /><select className="form-control"><option>months</option><option>weeks</option><option>No commitment</option></select></div></div>
              <div className="form-group"><label>Payment Type</label><select className="form-control"><option>Recurring</option><option>One-off (upfront)</option></select></div>
              <div className="form-group"><label>Billing Cycle</label><div style={{ display: "flex", gap: 8 }}><input type="number" className="form-control" placeholder="4" style={{ width: 80 }} /><select className="form-control"><option>weeks</option><option>months (calendar)</option></select></div><div className="help-text">How often the patient is charged</div></div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn btn-secondary">Cancel</button>
              <button className="btn btn-primary">Create Billing Plan</button>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
