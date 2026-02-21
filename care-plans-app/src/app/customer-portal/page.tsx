import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { customerPortalSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "Customer Portal — Customer overview" };

const customers = [
  { id: "jane-doe", name: "Jane Doe", email: "jane.doe@example.com", offer: "Semaglutide — 6M Monthly", offerId: "OFR-WL-SEMA-6M-MTH", protocol: "CTP-WL-SEMA-STD (Semaglutide Standard)" },
  { id: "john-smith", name: "John Smith", email: "john.smith@example.com", offer: "Finasteride Monthly", offerId: "OFR-HL-FIN-1M-SUB", protocol: "CTP-HL-FIN-1MG (Finasteride 1mg)" },
  { id: "alex-jones", name: "Alex Jones", email: "alex.jones@example.com", offer: "TRT Membership", offerId: "OFR-TRT-CYP-HCG-SUB", protocol: "CTP-TRT-CYP-STD (TRT Cypionate)" },
];

export default function CustomerPortalOverviewPage() {
  return (
    <PortalLayout sidebar={customerPortalSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Customer Portal", href: "/customer-portal" }, { label: "Customer overview" }]}
        actions={<button className="btn btn-secondary btn-sm">Search customer</button>}
      />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>Customer overview</h1>
            <p>View customers with their current offer and treatment plan. Click through to see full billing, promotions, and eligibility.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Customer name</th>
                    <th>Email</th>
                    <th>Offer</th>
                    <th>Protocol</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.name}</td>
                      <td className="text-muted">{c.email}</td>
                      <td><span style={{ fontWeight: 500 }}>{c.offer}</span><div className="text-muted font-mono" style={{ fontSize: 11 }}>{c.offerId}</div></td>
                      <td><span className="tag">{c.protocol}</span></td>
                      <td><Link href={`/customer-portal/${c.id}`} className="btn btn-ghost btn-sm">View detail</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
