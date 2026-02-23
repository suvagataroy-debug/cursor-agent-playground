import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { medicalSidebar } from "@/components/sidebars";

export const metadata = { title: "Consumption Rates — Medical Portal" };

const rates = [
  { sku: "SEMA-025-PEN", med: "Semaglutide", dose: "0.25mg", cat: "Weight Loss", catClass: "badge-primary", std: "4 weeks", ext: "6 weeks", unit: "1 pen" },
  { sku: "SEMA-050-PEN", med: "Semaglutide", dose: "0.5mg", cat: "Weight Loss", catClass: "badge-primary", std: "4 weeks", ext: "6 weeks", unit: "1 pen" },
  { sku: "SEMA-100-PEN", med: "Semaglutide", dose: "1.0mg", cat: "Weight Loss", catClass: "badge-primary", std: "4 weeks", ext: "6 weeks", unit: "1 pen" },
  { sku: "SEMA-170-PEN", med: "Semaglutide", dose: "1.7mg", cat: "Weight Loss", catClass: "badge-primary", std: "4 weeks", ext: "5 weeks", unit: "1 pen" },
  { sku: "SEMA-240-PEN", med: "Semaglutide", dose: "2.4mg", cat: "Weight Loss", catClass: "badge-primary", std: "4 weeks", ext: "—", unit: "1 pen" },
  { sku: "FIN-1MG-30", med: "Finasteride", dose: "1mg", cat: "Hair", catClass: "badge-info", std: "30 days", ext: "—", unit: "30 tabs" },
  { sku: "FIN-1MG-90", med: "Finasteride", dose: "1mg", cat: "Hair", catClass: "badge-info", std: "90 days", ext: "—", unit: "90 tabs" },
  { sku: "MNX-5PCT-60ML", med: "Minoxidil", dose: "5%", cat: "Hair", catClass: "badge-info", std: "30 days", ext: "45 days", unit: "1 bottle (60ml)" },
  { sku: "TST-CYP-10ML", med: "Testosterone Cypionate", dose: "200mg/ml", cat: "TRT", catClass: "badge-danger", std: "10 weeks", ext: "12 weeks", unit: "1 vial (10ml)" },
  { sku: "SIL-50MG-8", med: "Sildenafil", dose: "50mg", cat: "ED", catClass: "badge-warning", std: "30 days", ext: "60 days", unit: "8 tabs" },
];

export default function ConsumptionRatesPage() {
  return (
    <PortalLayout sidebar={medicalSidebar}>
      <Topbar
        breadcrumbs={[
          { label: "Control Planes", href: "/" },
          { label: "Medical Portal", href: "/medical/eligibility" },
          { label: "Consumption Rates" },
        ]}
        actions={<button className="btn btn-primary btn-sm">+ New Consumption Rate</button>}
      />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>Consumption Rates</h1>
            <p>Define how quickly patients consume each SKU. This drives shipping frequency independently of billing cycles. A patient safely using a pen over 6 weeks instead of 4 will have their next ship date adjusted without changing their billing plan.</p>
          </div>
        </div>

        <div style={{ background: "var(--primary-light)", border: "1px solid #c5d9f7", borderRadius: 8, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>&#9432;</span>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <strong>Delinked from Billing:</strong> Consumption rates affect the <em>Shipping Service</em> (next ship date calculation) but do NOT affect the <em>Billing Engine</em>. A patient on a monthly billing cycle may receive their medication every 4 or 6 weeks depending on their consumption rate — the billing remains unchanged.
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h3>All Consumption Rates</h3>
            <select className="form-control" style={{ width: 150, padding: "6px 10px", fontSize: 12 }}>
              <option>All Categories</option><option>Weight Loss</option><option>Hair</option><option>ED</option><option>TRT</option>
            </select>
          </div>
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>SKU</th><th>Medication</th><th>Dose</th><th>Category</th><th>Standard Rate</th><th>Extended Rate</th><th>Unit</th><th>Affects Shipping</th><th>Actions</th></tr></thead>
                <tbody>
                  {rates.map((r, i) => (
                    <tr key={i}>
                      <td className="font-mono">{r.sku}</td>
                      <td>{r.med}</td>
                      <td>{r.dose}</td>
                      <td><span className={`badge ${r.catClass}`}>{r.cat}</span></td>
                      <td><strong>{r.std}</strong></td>
                      <td>{r.ext}</td>
                      <td>{r.unit}</td>
                      <td><span className="badge badge-success">Yes</span></td>
                      <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Edit Consumption Rate — SEMA-025-PEN</h3></div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group"><label>SKU</label><input type="text" className="form-control" defaultValue="SEMA-025-PEN" disabled /></div>
              <div className="form-group"><label>Medication</label><input type="text" className="form-control" defaultValue="Semaglutide 0.25mg Pen" disabled /></div>
            </div>
            <div className="form-row-3">
              <div className="form-group">
                <label>Standard Consumption Period</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="number" className="form-control" defaultValue={4} style={{ width: 80 }} />
                  <select className="form-control" style={{ width: 120 }}><option>weeks</option><option>days</option></select>
                </div>
                <div className="help-text">Typical time to use 1 unit</div>
              </div>
              <div className="form-group">
                <label>Extended Consumption Period</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="number" className="form-control" defaultValue={6} style={{ width: 80 }} />
                  <select className="form-control" style={{ width: 120 }}><option>weeks</option><option>days</option></select>
                </div>
                <div className="help-text">Clinician-approved slower rate</div>
              </div>
              <div className="form-group">
                <label>Units per Shipment</label>
                <input type="number" className="form-control" defaultValue={1} />
                <div className="help-text">How many units shipped per cycle</div>
              </div>
            </div>
            <div className="form-group">
              <label>Shipping Impact</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <label className="form-switch"><input type="checkbox" defaultChecked /><span className="slider" /></label>
                <span style={{ fontSize: 13 }}>Recalculate next ship date based on consumption rate</span>
              </div>
              <div className="help-text mt-1">When enabled, the Shipping Service uses this rate to determine when the next shipment is due. This is independent of the billing frequency.</div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn btn-secondary">Cancel</button>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
