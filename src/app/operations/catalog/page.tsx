import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { operationsSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "Item Catalog — Operations Portal" };

const items = [
  { sku: "SEMA-025-PEN", name: "Semaglutide Pen", type: "Medication", typeClass: "badge badge-primary", cat: "Weight Loss", dose: "0.25mg", units: "1 pen", price: "£165.00", tax: "VAT Exempt", stock: "2,400", stockClass: "text-success", hasDetail: true },
  { sku: "SEMA-050-PEN", name: "Semaglutide Pen", type: "Medication", typeClass: "badge badge-primary", cat: "Weight Loss", dose: "0.5mg", units: "1 pen", price: "£195.00", tax: "VAT Exempt", stock: "1,800", stockClass: "text-success" },
  { sku: "SEMA-100-PEN", name: "Semaglutide Pen", type: "Medication", typeClass: "badge badge-primary", cat: "Weight Loss", dose: "1.0mg", units: "1 pen", price: "£245.00", tax: "VAT Exempt", stock: "1,200", stockClass: "text-success" },
  { sku: "SEMA-240-PEN", name: "Semaglutide Pen", type: "Medication", typeClass: "badge badge-primary", cat: "Weight Loss", dose: "2.4mg", units: "1 pen", price: "£320.00", tax: "VAT Exempt", stock: "85", stockClass: "text-danger" },
  { sku: "FIN-1MG-30", name: "Finasteride 1mg tablets", type: "Medication", typeClass: "badge badge-primary", cat: "Hair", dose: "1mg", units: "30 tabs", price: "£48.00", tax: "VAT Exempt", stock: "5,000", stockClass: "text-success" },
  { sku: "MNX-5PCT-60ML", name: "Minoxidil 5% Solution", type: "Medication", typeClass: "badge badge-primary", cat: "Hair", dose: "5%", units: "1 bottle (60ml)", price: "£28.00", tax: "VAT Exempt", stock: "4,100", stockClass: "text-success" },
  { sku: "TST-CYP-10ML", name: "Testosterone Cypionate", type: "Medication", typeClass: "badge badge-primary", cat: "TRT", dose: "200mg/ml", units: "1 vial (10ml)", price: "£95.00", tax: "VAT Exempt", stock: "800", stockClass: "text-success" },
  { sku: "ACC-SHARPS-1L", name: "Sharps Bin (1L)", type: "Accessory", typeClass: "tag", cat: "General", dose: "—", units: "1 bin", price: "£0.00", tax: "Zero Rated", stock: "6,000", stockClass: "text-success" },
  { sku: "ACC-NEEDLES-4", name: "Injection Needles (x4)", type: "Accessory", typeClass: "tag", cat: "General", dose: "—", units: "4 needles", price: "£0.00", tax: "Zero Rated", stock: "12,000", stockClass: "text-success" },
  { sku: "SUP-B12-30", name: "Vitamin B12 Supplement", type: "Supplement", typeClass: "badge badge-warning", cat: "General", dose: "1000mcg", units: "30 tabs", price: "£9.99", tax: "Standard (20%)", stock: "8,000", stockClass: "text-success" },
];

export default function CatalogPage() {
  return (
    <PortalLayout sidebar={operationsSidebar}>
      <Topbar
        breadcrumbs={[{ label: "Control Planes", href: "/" }, { label: "Operations Portal", href: "/operations/catalog" }, { label: "Item Catalog" }]}
        actions={<><button className="btn btn-secondary btn-sm">Import SKUs</button><button className="btn btn-primary btn-sm">+ New SKU</button></>}
      />
      <div className="content">
        <div className="page-header"><div><h1>Item Catalog Management</h1><p>Define the base variants, prices, inventory levels, and physical dimensions for medications and supplements.</p></div></div>

        <div className="stat-cards">
          <div className="stat-card"><div className="stat-label">Total SKUs</div><div className="stat-value">34</div></div>
          <div className="stat-card"><div className="stat-label">Medications</div><div className="stat-value">18</div></div>
          <div className="stat-card"><div className="stat-label">Accessories</div><div className="stat-value">10</div></div>
          <div className="stat-card"><div className="stat-label">Low Stock Alerts</div><div className="stat-value text-danger">3</div></div>
        </div>

        <div className="tabs"><button className="tab active">All Items</button><button className="tab">Medications</button><button className="tab">Accessories</button><button className="tab">Supplements</button><button className="tab">Low Stock</button></div>

        <div className="card">
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead><tr><th>SKU</th><th>Product Name</th><th>Type</th><th>Category</th><th>Dosage</th><th>Units</th><th>Base Price</th><th>Tax</th><th>Stock</th><th>Actions</th></tr></thead>
                <tbody>
                  {items.map((itm, i) => (
                    <tr key={i}>
                      <td>{itm.hasDetail ? <Link href="/operations/sku-detail" className="font-mono" style={{ fontWeight: 600 }}>{itm.sku}</Link> : <span className="font-mono" style={{ fontWeight: 600 }}>{itm.sku}</span>}</td>
                      <td>{itm.name}</td>
                      <td><span className={itm.typeClass}>{itm.type}</span></td>
                      <td>{itm.cat}</td>
                      <td>{itm.dose}</td>
                      <td>{itm.units}</td>
                      <td>{itm.price}</td>
                      <td>{itm.tax}</td>
                      <td><span className={itm.stockClass}>{itm.stock}</span></td>
                      <td>{itm.hasDetail ? <Link href="/operations/sku-detail" className="btn btn-ghost btn-sm">View</Link> : <button className="btn btn-ghost btn-sm">View</button>}<button className="btn btn-ghost btn-sm">Edit</button></td>
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
