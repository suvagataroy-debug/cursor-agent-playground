import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { operationsSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "SKU Detail — Operations Portal" };

export default function SkuDetailPage() {
  return (
    <PortalLayout sidebar={operationsSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Item Catalog", href: "/operations/catalog" }, { label: "SEMA-025-PEN" }]}
        actions={<><button className="btn btn-secondary btn-sm">Duplicate SKU</button><button className="btn btn-primary btn-sm">Edit SKU</button></>}
      />
      <div className="content">
        <div className="page-header">
          <div><h1>Semaglutide 0.25mg Pen</h1><p className="font-mono">SEMA-025-PEN</p></div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-success" style={{ padding: "6px 14px" }}>Enabled</span>
            <span className="badge badge-danger" style={{ padding: "6px 14px" }}>Not tracked</span>
            <span className="badge badge-primary" style={{ padding: "6px 14px" }}>Shipping required</span>
          </div>
        </div>
        <div className="detail-layout">
          <div>
            <div className="card mb-4">
              <div className="card-header"><h3>SKU Details</h3></div>
              <div className="card-body-flush">
                <dl className="detail-grid">
                  <dt>SKU Code</dt><dd className="font-mono">SEMA-025-PEN</dd>
                  <dt>Product Name</dt><dd>Semaglutide 0.25mg Injection Pen</dd>
                  <dt>Product Type</dt><dd><span className="badge badge-primary">Medication</span></dd>
                  <dt>Category</dt><dd>Weight Loss</dd>
                  <dt>Medication Name</dt><dd>Semaglutide</dd>
                  <dt>Dosage per Unit</dt><dd>0.25mg</dd>
                  <dt>Number of Units</dt><dd>1 pen (4 doses)</dd>
                  <dt>Administration</dt><dd>Subcutaneous injection</dd>
                  <dt>Controlled Med</dt><dd><span className="badge badge-info">No</span></dd>
                </dl>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header"><h3>Directions &amp; Dispensing</h3></div>
              <div className="card-body">
                <div className="form-group"><label>Directions</label><div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: 12, fontSize: 13 }}>Semaglutide 0.25mg pen, total to dispense 1 pen<br />Dose: 0.25mg subcutaneous injection once weekly</div></div>
                <div className="form-group"><label>Dispensing Label Instructions</label><div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: 12, fontSize: 13 }}>Inject ONE dose (0.25mg) once weekly into abdomen, thigh, or upper arm. Rotate injection sites. Store in refrigerator (2-8&deg;C). Keep out of sunlight. Do not freeze.</div></div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3>Used In</h3></div>
              <div className="card-body">
                <div className="grid-2">
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)", marginBottom: 8 }}>Treatment Plans</h4>
                    <Link href="/medical/titration-protocol-detail" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--bg)", borderRadius: 6 }}>
                      <span className="badge badge-success" style={{ fontSize: 10 }}>Active</span><span style={{ fontWeight: 500 }}>CTP-WL-SEMA-STD</span><span className="text-muted" style={{ fontSize: 12 }}>Step 1</span>
                    </Link>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)", marginBottom: 8 }}>Offers</h4>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
                      {["OFR-WL-SEMA-6M-MTH", "OFR-WL-SEMA-12M-FIX", "OFR-WL-SEMA-3M-MTH"].map((code) => (
                        <Link key={code} href="/commercial/offer-detail" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--bg)", borderRadius: 6 }}>
                          <span className="badge badge-success" style={{ fontSize: 10 }}>Live</span><span style={{ fontWeight: 500 }}>{code}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card mb-4">
              <div className="card-header"><h3>Pricing</h3></div>
              <div className="card-body">
                <div style={{ fontSize: 13 }}>
                  {[["Base Price", "£165.00"], ["Cost (COGS)", "£62.00"], ["Gross Margin", "62%"], ["Tax Category", "VAT Exempt"], ["Channel", "JoinVoy"]].map(([l, v], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? "1px solid #f0f0f0" : "none" }}><span className="text-muted">{l}</span><strong className={l === "Gross Margin" ? "text-success" : ""}>{v}</strong></div>
                  ))}
                </div>
                <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)", marginTop: 16, marginBottom: 8 }}>Effective price by offer</h4>
                <table style={{ fontSize: 13, width: "100%" }}>
                  <thead><tr><th style={{ textAlign: "left" as const }}>Offer</th><th style={{ textAlign: "right" as const }}>Effective price</th><th style={{ textAlign: "right" as const }}>vs base</th></tr></thead>
                  <tbody>
                    {[
                      { offer: "OFR-WL-SEMA-6M-MTH", effective: "£149.00", vs: "-£16" },
                      { offer: "OFR-WL-SEMA-12M-FIX", effective: "£199.00", vs: "+£34" },
                      { offer: "OFR-WL-SEMA-3M-MTH", effective: "£159.00", vs: "-£6" },
                    ].map((r, i) => (
                      <tr key={i}><td className="font-mono" style={{ padding: "6px 0" }}>{r.offer}</td><td style={{ textAlign: "right" as const, fontWeight: 600 }}>{r.effective}</td><td style={{ textAlign: "right" as const, color: "var(--text-secondary)" }}>{r.vs}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header"><h3>Inventory</h3></div>
              <div className="card-body">
                <div style={{ fontSize: 13 }}>
                  {[["Current Stock", "2,400"], ["Low Stock Threshold", "200"], ["Avg. Weekly Usage", "180 units"], ["Weeks of Stock", "~13 weeks"]].map(([l, v], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid #f0f0f0" : "none" }}><span className="text-muted">{l}</span><strong className={i === 3 ? "text-success" : ""}>{v}</strong></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3>Consumption Rate</h3></div>
              <div className="card-body">
                <div style={{ fontSize: 13 }}>
                  {[["Standard", "4 weeks"], ["Extended", "6 weeks"]].map(([l, v], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 1 ? "1px solid #f0f0f0" : "none" }}><span className="text-muted">{l}</span><strong>{v}</strong></div>
                  ))}
                </div>
                <p className="help-text mt-2">Managed in <Link href="/medical/consumption-rates">Medical Portal</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
