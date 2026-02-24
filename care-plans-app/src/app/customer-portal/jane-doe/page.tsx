import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { customerPortalSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "Jane Doe — Customer Portal" };

const currentOffers = [
  { name: "Semaglutide — 6M Monthly", offerId: "OFR-WL-SEMA-6M-MTH", type: "Medical", treatmentPlan: "CTP-WL-SEMA-STD" },
  { name: "Vitamin B12 — Monthly", offerId: "OFR-ADD-B12-MTH", type: "Add-on" },
];

const offerHistory = [
  { name: "Semaglutide 3M", offerId: "OFR-WL-SEMA-3M-MTH", ended: "2024-09" },
  { name: "Starter plan", offerId: "OFR-WL-STARTER", ended: "2024-06" },
];

const lastBilling = { date: "14 Jan 2025", amount: "£238.99" };
const nextBillings = [
  { date: "11 Feb 2025", amount: "£238.99" },
  { date: "11 Mar 2025", amount: "£238.99" },
  { date: "8 Apr 2025", amount: "£238.99" },
];

export default function JaneDoePage() {
  return (
    <PortalLayout sidebar={customerPortalSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Customer Portal", href: "/customer-portal" }, { label: "Jane Doe" }]}
        actions={<><button className="btn btn-secondary btn-sm">Edit</button><button className="btn btn-primary btn-sm">View as customer</button></>}
      />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>Jane Doe</h1>
            <p className="text-muted">jane.doe@example.com</p>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h3>Current offers</h3></div>
          <div className="card-body-flush">
            <table>
              <thead><tr><th>Offer name</th><th>Offer ID</th><th>Type</th><th>Treatment plan</th></tr></thead>
              <tbody>
                {currentOffers.map((o, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{o.name}</td>
                    <td className="font-mono">{o.offerId}</td>
                    <td><span className="tag">{o.type}</span></td>
                    <td className="font-mono">{o.treatmentPlan ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h3>History of offers</h3></div>
          <div className="card-body-flush">
            <table>
              <thead><tr><th>Offer name</th><th>Offer ID</th><th>Ended</th></tr></thead>
              <tbody>
                {offerHistory.map((o, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{o.name}</td>
                    <td className="font-mono">{o.offerId}</td>
                    <td>{o.ended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header"><h3>Billing</h3></div>
          <div className="card-body">
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-secondary)", marginBottom: 8 }}>Last billing</h4>
              <div style={{ fontSize: 15 }}><strong>{lastBilling.date}</strong> — <strong>{lastBilling.amount}</strong></div>
            </div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-secondary)", marginBottom: 8 }}>Next billing dates and amounts</h4>
            <table>
              <thead><tr><th>Date</th><th>Amount</th></tr></thead>
              <tbody>
                {nextBillings.map((b, i) => (
                  <tr key={i}><td>{b.date}</td><td style={{ fontWeight: 600 }}>{b.amount}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-muted">
          <Link href="/customer-portal">← Back to Customer overview</Link>
        </p>
      </div>
    </PortalLayout>
  );
}
