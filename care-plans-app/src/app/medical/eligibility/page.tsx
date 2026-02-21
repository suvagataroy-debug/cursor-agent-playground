import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { medicalSidebar } from "@/components/sidebars";

export const metadata = { title: "Treatment Eligibility — Medical Portal" };

export default function EligibilityPage() {
  return (
    <PortalLayout sidebar={medicalSidebar}>
      <Topbar
        breadcrumbs={[
          { label: "Control Planes", href: "/" },
          { label: "Medical Portal", href: "/medical/eligibility" },
          { label: "Treatment Eligibility" },
        ]}
        actions={
          <>
            <button className="btn btn-secondary btn-sm">Export Rules</button>
            <button className="btn btn-primary btn-sm">+ New Rule Set</button>
          </>
        }
      />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>Treatment Eligibility</h1>
            <p>Define mandatory patient data points (e.g., BMI, age, lab results) required to qualify for specific treatment categories. The Eligibility Engine evaluates real-time patient data against these rules.</p>
          </div>
        </div>

        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-label">Active Rule Sets</div>
            <div className="stat-value">12</div>
            <div className="stat-change up">+2 this month</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Categories Covered</div>
            <div className="stat-value">5</div>
            <div className="stat-change">Hair, Weight, Skin, ED, TRT</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Patients Evaluated (30d)</div>
            <div className="stat-value">14,832</div>
            <div className="stat-change up">+18% vs prev period</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg. Pass Rate</div>
            <div className="stat-value">72%</div>
            <div className="stat-change down">-3% vs prev period</div>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-input">
            <input type="text" placeholder="Search rules by name, category, or condition..." />
          </div>
          <select className="form-control" style={{ width: 160 }}>
            <option>All Categories</option>
            <option>Weight Loss</option>
            <option>Hair</option>
            <option>Skin</option>
            <option>ED</option>
            <option>TRT</option>
          </select>
          <select className="form-control" style={{ width: 130 }}>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>

        <div className="card">
          <div className="card-body-flush">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Rule Set Name</th>
                    <th>Category</th>
                    <th>Conditions</th>
                    <th>Market</th>
                    <th>Status</th>
                    <th>Pass Rate</th>
                    <th>Last Modified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Weight Loss — GLP-1 Entry", code: "ELIG-WL-GLP1-001", cat: "Weight Loss", catClass: "badge-primary", conditions: ["BMI ≥ 30", "Age 18-75", "No T2D"], market: "UK", rate: "68%", date: "14 Feb 2026", active: true },
                    { name: "Weight Loss — Orlistat Entry", code: "ELIG-WL-ORL-001", cat: "Weight Loss", catClass: "badge-primary", conditions: ["BMI ≥ 28", "Age 18-65"], market: "UK", rate: "81%", date: "10 Feb 2026", active: true },
                    { name: "Hair Loss — Finasteride Entry", code: "ELIG-HL-FIN-001", cat: "Hair", catClass: "badge-info", conditions: ["Male", "Age 18+", "No Liver Disease"], market: "UK, BR", rate: "88%", date: "12 Feb 2026", active: true },
                    { name: "Hair Loss — Minoxidil Topical", code: "ELIG-HL-MNX-001", cat: "Hair", catClass: "badge-info", conditions: ["Age 18+", "No Scalp Conditions"], market: "UK", rate: "92%", date: "8 Feb 2026", active: true },
                    { name: "ED — Sildenafil Entry", code: "ELIG-ED-SIL-001", cat: "ED", catClass: "badge-warning", conditions: ["Male", "Age 18+", "No Nitrates", "BP < 170/100"], market: "UK", rate: "75%", date: "5 Feb 2026", active: true },
                    { name: "TRT — Testosterone Entry", code: "ELIG-TRT-TST-001", cat: "TRT", catClass: "badge-danger", conditions: ["Male", "Age 18+", "Testosterone < 12 nmol/L", "Blood Test Required"], market: "UK", rate: "52%", date: "3 Feb 2026", active: true },
                    { name: "Weight Loss — Tirzepatide Entry", code: "ELIG-WL-TZP-001", cat: "Weight Loss", catClass: "badge-primary", conditions: ["BMI ≥ 30", "Age 18-75", "No Pancreatitis"], market: "UK", rate: "—", date: "18 Feb 2026", active: false },
                  ].map((rule, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{rule.name}</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>{rule.code}</div>
                      </td>
                      <td><span className={`badge ${rule.catClass}`}>{rule.cat}</span></td>
                      <td>{rule.conditions.map((c, j) => <span key={j} className="tag">{c}</span>)}</td>
                      <td>{rule.market}</td>
                      <td>
                        {rule.active
                          ? <span className="badge badge-success"><span className="status-dot active" />Active</span>
                          : <span className="badge badge-warning"><span className="status-dot draft" />Draft</span>
                        }
                      </td>
                      <td>{rule.rate}</td>
                      <td>{rule.date}</td>
                      <td>
                        <button className="btn btn-ghost btn-sm">Edit</button>
                        <button className="btn btn-ghost btn-sm">Clone</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="card">
            <div className="card-header">
              <h3>Rule Builder Preview — Weight Loss GLP-1 Entry</h3>
              <button className="btn btn-secondary btn-sm">Edit Rule</button>
            </div>
            <div className="card-body">
              <div className="detail-layout-equal">
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)" }}>Entry Conditions (ALL must pass)</h4>
                  <table>
                    <thead><tr><th>Data Point</th><th>Operator</th><th>Value</th><th>Source</th></tr></thead>
                    <tbody>
                      {[
                        ["BMI", "≥", "30.0", "Questionnaire"],
                        ["Age", "between", "18 — 75", "Profile"],
                        ["Type 2 Diabetes", "is not", "true", "Questionnaire"],
                        ["Pregnancy Status", "is not", "pregnant / planning", "Questionnaire"],
                        ["Location", "in", "England, Wales, Scotland", "Address"],
                      ].map(([dp, op, val, src], i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 500 }}>{dp}</td>
                          <td><span className="tag">{op}</span></td>
                          <td>{val}</td>
                          <td className="text-muted">{src}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: 0.5, color: "var(--text-secondary)" }}>Exclusion Conditions (ANY triggers rejection)</h4>
                  <table>
                    <thead><tr><th>Data Point</th><th>Operator</th><th>Value</th></tr></thead>
                    <tbody>
                      {[
                        ["Eating Disorder History", "is", "true"],
                        ["Pancreatitis History", "is", "true"],
                        ["Medullary Thyroid Cancer", "is", "true"],
                        ["Current GLP-1 Rx", "is", "true"],
                      ].map(([dp, op, val], i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 500 }}>{dp}</td>
                          <td><span className="tag">{op}</span></td>
                          <td>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
