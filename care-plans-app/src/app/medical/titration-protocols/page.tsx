import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { medicalSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "Treatment Plans — Medical Portal" };

const plans = [
  { name: "Semaglutide Standard Titration", sub: "Starting dose 0.25mg, target 2.4mg", code: "CTP-WL-SEMA-STD", cat: "Weight Loss", catClass: "badge-primary", med: "Semaglutide (Wegovy)", steps: ["0.25mg", "0.5mg", "1mg", "1.7mg", "2.4mg"], dur: "Ongoing", active: true, offers: 4, hasDetail: true },
  { name: "Tirzepatide Standard Titration", sub: "Starting dose 2.5mg, target 15mg", code: "CTP-WL-TIRZ-STD", cat: "Weight Loss", catClass: "badge-primary", med: "Tirzepatide (Mounjaro)", steps: ["2.5mg", "5mg", "7.5mg", "10mg", "15mg"], dur: "Ongoing", active: false, offers: 0 },
  { name: "Finasteride 1mg Daily", sub: "No titration — fixed dose", code: "CTP-HL-FIN-1MG", cat: "Hair", catClass: "badge-info", med: "Finasteride", steps: ["1mg daily"], dur: "Ongoing", active: true, offers: 3, fixed: true },
  { name: "Finasteride + Minoxidil Combo", sub: "Oral finasteride + topical minoxidil", code: "CTP-HL-FINMNX-CMB", cat: "Hair", catClass: "badge-info", med: "Finasteride + Minoxidil", steps: ["1mg + 5%"], dur: "Ongoing", active: true, offers: 2, fixed: true },
  { name: "Sildenafil PRN", sub: "As-needed dosing, 50mg or 100mg", code: "CTP-ED-SIL-PRN", cat: "ED", catClass: "badge-warning", med: "Sildenafil", steps: ["50mg", "100mg"], dur: "Ongoing", active: true, offers: 2 },
  { name: "TRT — Testosterone Cypionate", sub: "Injectable TRT with HCG support", code: "CTP-TRT-CYP-STD", cat: "TRT", catClass: "badge-danger", med: "Testosterone Cypionate + HCG", steps: ["100mg/wk", "150mg/wk", "200mg/wk"], dur: "Ongoing", active: true, offers: 3 },
];

export default function TitrationProtocolsPage() {
  return (
    <PortalLayout sidebar={medicalSidebar}>
      <Topbar
        breadcrumbs={[
          { label: "Control Planes", href: "/" },
          { label: "Medical Portal", href: "/medical/eligibility" },
          { label: "Treatment Plans" },
        ]}
        actions={<button className="btn btn-primary btn-sm">+ New Treatment Plan</button>}
      />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>Treatment Plans</h1>
            <p>Configure automated SKU sequences and dosage escalation logic. Each protocol maps a clinical pathway independent of commercial pricing — defining the medical journey from starting dose to maintenance.</p>
          </div>
        </div>

        <div className="tabs">
          <button className="tab active">All Plans</button>
          <button className="tab">Weight Loss</button>
          <button className="tab">Hair</button>
          <button className="tab">ED</button>
          <button className="tab">TRT</button>
          <button className="tab">Skin</button>
        </div>

        <div className="card">
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Medication</th>
                    <th>Titration Steps</th>
                    <th>Max Duration</th>
                    <th>Status</th>
                    <th>Linked Offers</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((p, i) => (
                    <tr key={i}>
                      <td>
                        {p.hasDetail ? (
                          <Link href="/medical/titration-protocol-detail" style={{ fontWeight: 600 }}>{p.name}</Link>
                        ) : (
                          <div style={{ fontWeight: 600 }}>{p.name}</div>
                        )}
                        <div className="text-muted" style={{ fontSize: 12 }}>{p.sub}</div>
                      </td>
                      <td className="font-mono">{p.code}</td>
                      <td><span className={`badge ${p.catClass}`}>{p.cat}</span></td>
                      <td>{p.med}</td>
                      <td>
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          {p.steps.map((s, j) => (
                            <span key={j}>
                              {j > 0 && !p.fixed && <span style={{ color: "var(--text-muted)", margin: "0 2px" }}>&rarr;</span>}
                              <span className="tag">{s}</span>
                            </span>
                          ))}
                          {p.fixed && <span className="text-muted" style={{ fontSize: 12, marginLeft: 4 }}>fixed</span>}
                        </div>
                      </td>
                      <td>{p.dur}</td>
                      <td>
                        {p.active
                          ? <span className="badge badge-success"><span className="status-dot active" />Active</span>
                          : <span className="badge badge-warning"><span className="status-dot draft" />Draft</span>
                        }
                      </td>
                      <td>{p.offers}</td>
                      <td>
                        {p.hasDetail ? (
                          <Link href="/medical/titration-protocol-detail" className="btn btn-ghost btn-sm">View</Link>
                        ) : (
                          <button className="btn btn-ghost btn-sm">View</button>
                        )}
                        <button className="btn btn-ghost btn-sm">Edit</button>
                      </td>
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
