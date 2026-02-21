import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { customerPortalSidebar } from "@/components/sidebars";

export const metadata = { title: "Customer detail — Customer Portal" };

export default async function CustomerPortalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customerName = id === "jane-doe" ? "Jane Doe" : id === "john-smith" ? "John Smith" : id === "alex-jones" ? "Alex Jones" : "Customer";
  const customerEmail = id === "jane-doe" ? "jane.doe@example.com" : id === "john-smith" ? "john.smith@example.com" : id === "alex-jones" ? "alex.jones@example.com" : "—";

  return (
    <PortalLayout sidebar={customerPortalSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Customer Portal", href: "/customer-portal" }, { label: customerName }]}
        actions={<><button className="btn btn-secondary btn-sm">Edit</button><button className="btn btn-primary btn-sm">View as customer</button></>}
      />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>{customerName}</h1>
            <p className="text-muted">{customerEmail}</p>
          </div>
        </div>
        <div className="detail-layout">
          <div>
            <div className="card mb-4">
              <div className="card-header"><h3>Current plans &amp; offers</h3></div>
              <div className="card-body">
                <p className="help-text" style={{ marginBottom: 12 }}>Example: 1 medical product offer + 1 non-medical add-on offer.</p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                  <div style={{ background: "var(--primary-light)", border: "1px solid #c5d9f7", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)", marginBottom: 4 }}>Medical product</div>
                    <div style={{ fontWeight: 600 }}>Semaglutide — 6M Monthly Plan</div>
                    <div className="font-mono" style={{ fontSize: 12 }}>Offer ID: OFR-WL-SEMA-6M-MTH</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>Treatment plan: <strong>CTP-WL-SEMA-STD</strong> (Semaglutide Standard Titration)</div>
                    <div style={{ fontSize: 12, marginTop: 2 }}>Week number: <strong>14</strong> (of current plan)</div>
                  </div>
                  <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)", marginBottom: 4 }}>Non-medical add-on</div>
                    <div style={{ fontWeight: 600 }}>Vitamin B12 — Monthly</div>
                    <div className="font-mono" style={{ fontSize: 12 }}>Add-on Offer ID: OFR-ADD-B12-MTH</div>
                  </div>
                </div>
                <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)", marginTop: 16, marginBottom: 8 }}>Old plans</h4>
                <ul style={{ fontSize: 13, paddingLeft: 20 }}>
                  <li>OFR-WL-SEMA-3M-MTH (Semaglutide 3M) — ended 2024-09</li>
                  <li>CTP-WL-SEMA-STD — same protocol, continued</li>
                </ul>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header"><h3>Billing</h3></div>
              <div className="card-body-flush">
                <table>
                  <thead><tr><th>Offer name</th><th>Last billing date</th><th>Last amount</th><th>Next billing date</th><th>Next amount</th></tr></thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Semaglutide — 6M Monthly</td>
                      <td>14 Jan 2025</td><td>£229.00</td><td>11 Feb 2025</td><td style={{ fontWeight: 600 }}>£229.00</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Vitamin B12 (add-on)</td>
                      <td>14 Jan 2025</td><td>£9.99</td><td>11 Feb 2025</td><td style={{ fontWeight: 600 }}>£9.99</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ padding: 12, fontSize: 13, borderTop: "1px solid var(--border)" }}><strong>Total next billing:</strong> £238.99</div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3>Promotions applied</h3></div>
              <div className="card-body">
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li><strong>WELCOME50</strong> — 50% off first month (used on first payment)</li>
                  <li><strong>REFER20</strong> — £20 off for referral (available for next cycle)</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="card mb-4">
              <div className="card-header"><h3>Eligibility</h3></div>
              <div className="card-body">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="badge badge-success" style={{ padding: "6px 12px" }}>Eligible</span>
                  <span>for current treatment</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Customer meets eligibility criteria for Semaglutide (Weight Loss). Last eligibility check: 10 Jan 2025. No safety boundaries triggered.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3>Summary</h3></div>
              <div className="card-body">
                <dl className="detail-grid">
                  <dt>Current offer ID</dt><dd className="font-mono">OFR-WL-SEMA-6M-MTH</dd>
                  <dt>Treatment plan ID</dt><dd className="font-mono">CTP-WL-SEMA-STD</dd>
                  <dt>Plan week</dt><dd>14</dd>
                  <dt>Add-on offer</dt><dd className="font-mono">OFR-ADD-B12-MTH</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
