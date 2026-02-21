import PortalLayout from "@/components/PortalLayout";
import Topbar from "@/components/Topbar";
import { medicalSidebar } from "@/components/sidebars";
import Link from "next/link";

export const metadata = { title: "Semaglutide Standard Titration — Medical Portal" };

export default function TitrationProtocolDetailPage() {
  return (
    <PortalLayout sidebar={medicalSidebar}>
      <Topbar
        breadcrumbs={[
          { label: "Control Planes", href: "/" },
          { label: "Treatment Plans", href: "/medical/titration-protocols" },
          { label: "Semaglutide Standard Titration" },
        ]}
        actions={<><button className="btn btn-secondary btn-sm">Duplicate Plan</button><button className="btn btn-primary btn-sm">Edit Plan</button></>}
      />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>Semaglutide Standard Titration</h1>
            <p>Clinical treatment protocol for GLP-1 weight loss pathway. Delinked from commercial billing — this defines the medical journey only.</p>
          </div>
          <span className="badge badge-success" style={{ fontSize: 13, padding: "6px 14px" }}><span className="status-dot active" />Active</span>
        </div>

        <div className="detail-layout">
          <div>
            <div className="card mb-4">
              <div className="card-header"><h3>Plan Details</h3></div>
              <div className="card-body-flush">
                <dl className="detail-grid">
                  <dt>Plan Code</dt><dd className="font-mono">CTP-WL-SEMA-STD</dd>
                  <dt>Category</dt><dd><span className="badge badge-primary">Weight Loss</span></dd>
                  <dt>Medication</dt><dd>Semaglutide (Wegovy)</dd>
                  <dt>Administration</dt><dd>Subcutaneous injection, once weekly</dd>
                  <dt>Starting Dose</dt><dd>0.25mg</dd>
                  <dt>Target Dose</dt><dd>2.4mg</dd>
                  <dt>Duration</dt><dd>Ongoing (no fixed end date)</dd>
                  <dt>Eligibility Rule</dt><dd><Link href="/medical/eligibility">ELIG-WL-GLP1-001</Link></dd>
                  <dt>Requires Lab</dt><dd>No (clinical review at 12 weeks)</dd>
                  <dt>Controlled Med</dt><dd><span className="badge badge-danger">No</span></dd>
                </dl>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h3>Titration Sequence</h3><button className="btn btn-secondary btn-sm">+ Add Step</button></div>
              <div className="card-body">
                <div className="titration-visual">
                  {[
                    { dose: "0.25", label: "0.25mg", meta: "Weeks 1–4\n1 pen / 4 wks" },
                    { dose: "0.5", label: "0.5mg", meta: "Weeks 5–8\n1 pen / 4 wks" },
                    { dose: "1.0", label: "1.0mg", meta: "Weeks 9–12\n1 pen / 4 wks" },
                    { dose: "1.7", label: "1.7mg", meta: "Weeks 13–16\n1 pen / 4 wks" },
                    { dose: "2.4", label: "2.4mg", meta: "Week 17+\nMaintenance", maintenance: true },
                  ].map((step, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center" }}>
                      {i > 0 && <div className="titration-arrow">&rarr;</div>}
                      <div className="titration-step">
                        <div className="dose-bubble" style={step.maintenance ? { background: "#e6f4ea", color: "#0d904f" } : {}}>{step.dose}</div>
                        <div className="dose-label">{step.label}</div>
                        <div className="dose-meta" style={{ whiteSpace: "pre-line" }}>{step.meta}</div>
                      </div>
                    </span>
                  ))}
                </div>
                <div className="separator" />
                <div className="table-wrapper">
                  <table>
                    <thead><tr><th>Step</th><th>SKU</th><th>Dose</th><th>Duration</th><th>Consumption Rate</th><th>Clinical Review</th><th>Auto-Advance</th></tr></thead>
                    <tbody>
                      {[
                        { step: 1, sku: "SEMA-025-PEN", dose: "0.25mg", dur: "4 weeks", rate: "1 pen per 4 weeks", review: null, auto: true },
                        { step: 2, sku: "SEMA-050-PEN", dose: "0.5mg", dur: "4 weeks", rate: "1 pen per 4 weeks", review: null, auto: true },
                        { step: 3, sku: "SEMA-100-PEN", dose: "1.0mg", dur: "4 weeks", rate: "1 pen per 4 weeks", review: "12-week review", auto: false },
                        { step: 4, sku: "SEMA-170-PEN", dose: "1.7mg", dur: "4 weeks", rate: "1 pen per 4 weeks", review: null, auto: true },
                        { step: 5, sku: "SEMA-240-PEN", dose: "2.4mg", dur: "Ongoing", rate: "1 pen per 4 weeks", review: "Quarterly review", maintenance: true },
                      ].map((s) => (
                        <tr key={s.step} style={s.maintenance ? { background: "#f8fdf9" } : {}}>
                          <td><strong>{s.step}</strong></td>
                          <td className="font-mono">{s.sku}</td>
                          <td>{s.dose}</td>
                          <td>{s.dur}</td>
                          <td>{s.rate}</td>
                          <td>
                            {s.review ? <span className={`badge ${s.review.includes("12") ? "badge-warning" : "badge-info"}`}>{s.review}</span> : "—"}
                          </td>
                          <td>
                            {s.maintenance ? <span className="text-muted">Maintenance</span> : (
                              <label className="form-switch"><input type="checkbox" defaultChecked={s.auto} /><span className="slider" /></label>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h3>Safety Boundaries</h3></div>
              <div className="card-body">
                <div className="grid-2">
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "var(--text-secondary)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Dose-Down Triggers</h4>
                    <table><tbody>
                      <tr><td style={{ fontWeight: 500 }}>Severe GI Side Effects</td><td><span className="badge badge-danger">Step back 1 dose</span></td></tr>
                      <tr><td style={{ fontWeight: 500 }}>Clinician Override</td><td><span className="badge badge-warning">Manual step adjustment</span></td></tr>
                      <tr><td style={{ fontWeight: 500 }}>Weight loss &gt; 1kg/week avg</td><td><span className="badge badge-warning">Hold current dose</span></td></tr>
                    </tbody></table>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "var(--text-secondary)", textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Pause / Stop Triggers</h4>
                    <table><tbody>
                      <tr><td style={{ fontWeight: 500 }}>Pregnancy detected</td><td><span className="badge badge-danger">Immediate stop</span></td></tr>
                      <tr><td style={{ fontWeight: 500 }}>BMI &lt; 22</td><td><span className="badge badge-danger">Clinical review required</span></td></tr>
                      <tr><td style={{ fontWeight: 500 }}>Missed 2 consecutive doses</td><td><span className="badge badge-warning">Clinical review</span></td></tr>
                    </tbody></table>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3>Clinician Messages</h3></div>
              <div className="card-body">
                <div className="form-group">
                  <label>Approval Message</label>
                  <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: 12, fontSize: 13, lineHeight: 1.7 }}>
                    Hi <span className="tag">%patient%</span>,<br />
                    Here&apos;s a link to your weight loss treatment plan. Make sure you read it to get the most out of the treatment in the safest way possible.
                    Remember, it takes 4-8 weeks at each dose for your body to adjust.<br /><br />
                    If you have any questions or anything changes in your medical condition, please message us directly using this secure messaging channel.<br />
                    All the best,<br />
                    <span className="tag">%clinician%</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Renewal Message</label>
                  <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: 12, fontSize: 13, lineHeight: 1.7 }}>
                    Hi <span className="tag">%patient%</span>,<br />
                    We have reviewed your treatment plan and are happy to continue your weight loss subscription.<br /><br />
                    Please get in touch via the messaging facility if there are any changes to your drug/medical history, or side effects you wish to speak to us about.<br />
                    It is important you keep everyone involved in your care aware of any medications you are taking.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card mb-4">
              <div className="card-header"><h3>Linked Offers</h3></div>
              <div className="card-body-flush">
                <table><tbody>
                  {[
                    { name: "6M Monthly Plan", code: "OFR-WL-SEMA-6M-MTH", live: true },
                    { name: "12M All-In Plan", code: "OFR-WL-SEMA-12M-FIX", live: true },
                    { name: "3M Starter Plan", code: "OFR-WL-SEMA-3M-MTH", live: true },
                    { name: "NHS Partnership Plan", code: "OFR-WL-SEMA-NHS", live: false },
                  ].map((o, i) => (
                    <tr key={i}><td><div style={{ fontWeight: 500 }}>{o.name}</div><div className="text-muted" style={{ fontSize: 12 }}>{o.code}</div></td><td>{o.live ? <span className="badge badge-success">Live</span> : <span className="badge badge-warning">Draft</span>}</td></tr>
                  ))}
                </tbody></table>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h3>Consumption Rates</h3></div>
              <div className="card-body">
                <div style={{ fontSize: 13 }}>
                  {[["Standard Rate", "1 pen per 4 weeks"], ["Extended Rate", "1 pen per 6 weeks"], ["Affects Shipping", "Yes — next ship date recalculated"]].map(([l, v], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid #f0f0f0" : "none" }}>
                      <span className="text-muted">{l}</span><strong>{v}</strong>
                    </div>
                  ))}
                </div>
                <p className="help-text mt-2">When a patient is on an extended consumption rate (e.g. 6 weeks instead of 4), the shipping service recalculates the next ship date accordingly without affecting the billing cycle.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3>Change Log</h3></div>
              <div className="card-body">
                <div className="step-list">
                  {[
                    { title: "Plan activated", meta: "14 Feb 2026 · Dr. Sarah Chen" },
                    { title: "Added 12-week clinical review gate at step 3", meta: "10 Feb 2026 · Dr. James Wilson" },
                    { title: "Extended consumption rate option added", meta: "3 Feb 2026 · Dr. Sarah Chen" },
                    { title: "Plan created", meta: "15 Jan 2026 · Dr. Sarah Chen" },
                  ].map((e, i) => (
                    <div className="step-item completed" key={i}>
                      <div className="step-title">{e.title}</div>
                      <div className="step-meta">{e.meta}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
