import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { commercialSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "Offer Builder — Commercial Portal" };

const offers = [
  { name: "Semaglutide — 6M Monthly", sub: "Pay monthly, 6 month commitment", code: "OFR-WL-SEMA-6M-MTH", tp: "CTP-WL-SEMA-STD", bp: "6M-MONTHLY", model: "Dynamic", modelClass: "badge-primary", price: "£149–299/mo", channel: "JoinVoy", subs: "8,420", active: true, hasDetail: true },
  { name: "Semaglutide — 12M All-In", sub: "Fixed price regardless of titration step", code: "OFR-WL-SEMA-12M-FIX", tp: "CTP-WL-SEMA-STD", bp: "12M-MONTHLY", model: "All-In", modelClass: "badge-info", price: "£199/mo", channel: "JoinVoy", subs: "5,130", active: true },
  { name: "Semaglutide — 3M Starter", sub: "Short commitment trial plan", code: "OFR-WL-SEMA-3M-MTH", tp: "CTP-WL-SEMA-STD", bp: "3M-MONTHLY", model: "Dynamic", modelClass: "badge-primary", price: "£159–309/mo", channel: "JoinVoy", subs: "3,200", active: true },
  { name: "Finasteride — Monthly", sub: "30 tabs, monthly recurring", code: "OFR-HL-FIN-1M-SUB", tp: "CTP-HL-FIN-1MG", bp: "1M-RECURRING", model: "Dynamic", modelClass: "badge-primary", price: "£44/mo", channel: "JoinVoy", subs: "12,400", active: true },
  { name: "Finasteride + Minoxidil Bundle — Quarterly", sub: "90 tabs + 3x minoxidil, every 3 months", code: "OFR-HL-FINMNX-3M-SUB", tp: "CTP-HL-FINMNX-CMB", bp: "3M-RECURRING", model: "Dynamic", modelClass: "badge-primary", price: "£114/quarter", channel: "JoinVoy", subs: "6,800", active: true },
  { name: "TRT Membership — Cypionate + HCG", sub: "All-inclusive TRT membership", code: "OFR-TRT-CYP-HCG-SUB", tp: "CTP-TRT-CYP-STD", bp: "1M-RECURRING", model: "All-In", modelClass: "badge-info", price: "£159/mo", channel: "JoinVoy", subs: "2,400", active: true },
  { name: "Sildenafil — Monthly PRN", sub: "8 tabs per month, as needed", code: "OFR-ED-SIL-1M-PRN", tp: "CTP-ED-SIL-PRN", bp: "1M-RECURRING", model: "Dynamic", modelClass: "badge-primary", price: "£29/mo", channel: "JoinVoy", subs: "3,830", active: true },
  { name: "Tirzepatide — 6M Monthly", sub: "New Mounjaro offering", code: "OFR-WL-TIRZ-6M-MTH", tp: "CTP-WL-TIRZ-STD", bp: "6M-MONTHLY", model: "Dynamic", modelClass: "badge-primary", price: "£199–399/mo", channel: "JoinVoy", subs: "0", active: false },
];

export default function OffersPage() {
  return (
    <PortalLayout sidebar={commercialSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Commercial Portal", href: "/commercial/offers" }, { label: "Offer Builder" }]}
        actions={<><button className="btn btn-secondary btn-sm">Export</button><Link href="/commercial/offer-detail" className="btn btn-primary btn-sm">+ New Offer</Link></>}
      />
      <div className="content">
        <div className="page-header"><div><h1>Offer Builder</h1><p>Link a validated Clinical Protocol to a specific Billing Plan to create a unique Offer ID. Each offer is &ldquo;the deal&rdquo; presented to the patient.</p></div></div>

        <div className="stat-cards">
          <div className="stat-card"><div className="stat-label">Active Offers</div><div className="stat-value">18</div></div>
          <div className="stat-card"><div className="stat-label">Avg. Conversion</div><div className="stat-value">24%</div><div className="stat-change up">+3% this month</div></div>
          <div className="stat-card"><div className="stat-label">Active Subscriptions</div><div className="stat-value">42,180</div></div>
          <div className="stat-card"><div className="stat-label">MRR</div><div className="stat-value">£2.1M</div><div className="stat-change up">+12% MoM</div></div>
        </div>

        <div className="filters-bar">
          <div className="search-input"><input type="text" placeholder="Search offers by name, code, or treatment plan..." /></div>
          <select className="form-control" style={{ width: 150 }}><option>All Categories</option><option>Weight Loss</option><option>Hair</option><option>ED</option><option>TRT</option></select>
          <select className="form-control" style={{ width: 150 }}><option>All Pricing Models</option><option>Dynamic</option><option>All-In (Fixed)</option></select>
          <select className="form-control" style={{ width: 120 }}><option>All Statuses</option><option>Live</option><option>Draft</option><option>Paused</option></select>
        </div>

        <div className="card">
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Offer Name</th><th>Code</th><th>Treatment Plan</th><th>Billing Plan</th><th>Pricing Model</th><th>Price</th><th>Channel</th><th>Status</th><th>Subs</th><th>Actions</th></tr></thead>
                <tbody>
                  {offers.map((o, i) => (
                    <tr key={i}>
                      <td>
                        {o.hasDetail
                          ? <Link href="/commercial/offer-detail" style={{ fontWeight: 600 }}>{o.name}</Link>
                          : <div style={{ fontWeight: 600 }}>{o.name}</div>
                        }
                        <div className="text-muted" style={{ fontSize: 12 }}>{o.sub}</div>
                      </td>
                      <td className="font-mono">{o.code}</td>
                      <td><Link href="/medical/titration-protocol-detail">{o.tp}</Link></td>
                      <td>{o.bp}</td>
                      <td><span className={`badge ${o.modelClass}`}>{o.model}</span></td>
                      <td>{o.price}</td>
                      <td>{o.channel}</td>
                      <td>{o.active ? <span className="badge badge-success"><span className="status-dot active" />Live</span> : <span className="badge badge-warning"><span className="status-dot draft" />Draft</span>}</td>
                      <td>{o.subs}</td>
                      <td>{o.hasDetail ? <Link href="/commercial/offer-detail" className="btn btn-ghost btn-sm">Edit</Link> : <button className="btn btn-ghost btn-sm">Edit</button>}</td>
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
