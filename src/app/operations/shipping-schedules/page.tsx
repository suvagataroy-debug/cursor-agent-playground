import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { operationsSidebar } from "@/components/sidebars";

export const metadata = { title: "Shipping Schedules — Operations Portal" };

const shippingRules = [
  { name: "GLP-1 Injectable — Cold Chain", code: "SHIP-WL-INJ-COLD", skus: ["SEMA-*-PEN"], trigger: "Consumption rate expiry", carrier: "DPD", level: "Next-Day Cold", levelClass: "badge-primary", lead: "3 days before expiry" },
  { name: "Oral Medication — Standard", code: "SHIP-ORAL-STD", skus: ["FIN-*", "SIL-*"], trigger: "Consumption rate expiry", carrier: "Royal Mail", level: "Tracked 48", levelClass: "badge-info", lead: "5 days before expiry" },
  { name: "TRT Injectable — Controlled", code: "SHIP-TRT-INJ-CTRL", skus: ["TST-CYP-*"], trigger: "Consumption rate expiry", carrier: "DPD", level: "Signed For", levelClass: "badge-danger", lead: "5 days before expiry" },
  { name: "Topical Solution — Standard", code: "SHIP-TOP-STD", skus: ["MNX-*"], trigger: "Consumption rate expiry", carrier: "Royal Mail", level: "Tracked 48", levelClass: "badge-info", lead: "5 days before expiry" },
  { name: "First Order — Priority", code: "SHIP-FIRST-PRI", skus: ["All first orders"], trigger: "Clinical approval + payment", carrier: "DPD", level: "Next-Day", levelClass: "badge-primary", lead: "Immediate" },
];

const carriers = [
  { name: "DPD", services: ["Next-Day", "Next-Day Cold", "Signed For"], markets: "UK", cold: true, signed: true, tracking: "Full" },
  { name: "Royal Mail", services: ["Tracked 48", "Tracked 24", "Special Delivery"], markets: "UK", cold: false, signed: true, tracking: "Full" },
  { name: "Correios", services: ["SEDEX", "PAC"], markets: "BR", cold: false, signed: false, tracking: "Partial" },
];

export default function ShippingSchedulesPage() {
  return (
    <PortalLayout sidebar={operationsSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Operations Portal", href: "/operations/catalog" }, { label: "Shipping Schedule Management" }]}
        actions={<button className="btn btn-primary btn-sm">+ New Shipping Rule</button>}
      />
      <div className="content">
        <div className="page-header"><div><h1>Shipping Schedule Management</h1><p>Define lead times and fulfilment windows that the Shipping Service uses to align delivery with the patient&apos;s consumption rate.</p></div></div>

        <div style={{ background: "#fef7e0", border: "1px solid #f0d9a8", borderRadius: 8, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>&#9888;</span>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}><strong>Consumption-Driven Shipping:</strong> The &ldquo;Next Ship Date&rdquo; is calculated from the <em>Medical Portal&apos;s Consumption Rate</em>, NOT the billing cycle. A patient billed monthly may receive shipments every 4 or 6 weeks.</div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h3>Shipping Schedule Rules</h3></div>
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Rule Name</th><th>Code</th><th>Applies To</th><th>Trigger</th><th>Carrier</th><th>Service Level</th><th>Lead Time</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {shippingRules.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td className="font-mono">{r.code}</td>
                      <td>{r.skus.map((s, j) => <span key={j} className="tag">{s}</span>)}</td>
                      <td>{r.trigger}</td>
                      <td>{r.carrier}</td>
                      <td><span className={`badge ${r.levelClass}`}>{r.level}</span></td>
                      <td>{r.lead}</td>
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
          <div className="card-header"><h3>Next Ship Date Calculation Logic</h3></div>
          <div className="card-body">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" as const, padding: "16px 0" }}>
              {[
                { label: "Input", name: "Last Ship Date", border: "var(--success)", bg: "var(--success-light)", color: "var(--success)" },
                { sep: "+" },
                { label: "Clinical", name: "Consumption Rate", sub: "from Medical Portal", border: "var(--primary)", bg: "var(--primary-light)", color: "var(--primary)" },
                { sep: "−" },
                { label: "Buffer", name: "Lead Time", sub: "from Shipping Rule", border: "var(--warning)", bg: "var(--warning-light)", color: "var(--warning)" },
                { sep: "=" },
                { label: "Result", name: "Next Ship Date", border: "#6c5ce7", bg: "#f0edff", color: "#6c5ce7" },
              ].map((item, i) => {
                if ("sep" in item) return <div key={i} style={{ fontSize: 22, color: "var(--text-muted)", padding: "0 10px" }}>{item.sep}</div>;
                return (
                  <div key={i} style={{ padding: "14px 20px", borderRadius: 8, textAlign: "center" as const, minWidth: 160, border: `2px solid ${item.border}`, background: item.bg, color: item.color }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase" as const, letterSpacing: 0.5, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{item.name}</div>
                    {"sub" in item && <div style={{ fontSize: 12 }}>{item.sub}</div>}
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: "center" as const, marginTop: 8 }}>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}><strong>Example:</strong> Patient received Semaglutide on 1 Feb. Consumption rate = 4 weeks. Lead time = 3 days.<br />Next Ship Date = 1 Feb + 28 days - 3 days = <strong>26 Feb</strong></p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Carrier Configuration</h3><button className="btn btn-secondary btn-sm">+ Add Carrier</button></div>
          <div className="card-body-flush">
            <table>
              <thead><tr><th>Carrier</th><th>Services</th><th>Markets</th><th>Cold Chain</th><th>Signed For</th><th>Tracking</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {carriers.map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.services.map((s, j) => <span key={j} className="tag">{s}</span>)}</td>
                    <td>{c.markets}</td>
                    <td>{c.cold ? <span className="badge badge-success">Yes</span> : <span className="badge badge-danger">No</span>}</td>
                    <td>{c.signed ? <span className="badge badge-success">Yes</span> : <span className="badge badge-danger">No</span>}</td>
                    <td><span className={`badge ${c.tracking === "Full" ? "badge-success" : "badge-info"}`}>{c.tracking}</span></td>
                    <td><span className="badge badge-success"><span className="status-dot active" />Active</span></td>
                    <td><button className="btn btn-ghost btn-sm">Config</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
